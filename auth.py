# auth.py
# 인증 관련 API 라우터
# - 이메일 중복 확인 (GET /check-email)
# - 회원가입 (POST /register)
# - 로그인 (POST /login)
# - 로그아웃 (POST /logout)
# - 현재 사용자 정보 (GET /me)
#
# 세션 기반 로그인 유지 (request.session 사용)
# 비밀번호 해시/확인은 bcrypt 라이브러리 사용

from fastapi import APIRouter, Depends, Request, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import User
from datetime import datetime
import bcrypt

router = APIRouter()

# -----------------------------
# 이메일 중복 확인 API
# GET /check-email?email=...
# 프론트에서 실시간 중복확인 용도로 사용
# -----------------------------
@router.get("/check-email")
def check_email(email: str, db: Session = Depends(get_db)):
    """
    이메일이 이미 DB에 존재하면 available=False 반환,
    그렇지 않으면 available=True 반환.
    """
    existing = db.query(User).filter(User.email == email).first()
    if existing:
        return {"available": False, "message": "이미 사용 중인 이메일입니다."}
    return {"available": True, "message": "사용 가능한 이메일입니다."}


# -----------------------------
# 회원가입
# POST /register
# Request form/body: email, password
# - 이메일 중복 확인 (서버 측 최종 검증)
# - 비밀번호는 bcrypt로 해시 저장
# -----------------------------
@router.post("/register")
def register(email: str, password: str, db: Session = Depends(get_db)):
    # 서버 측 최종 중복 검사 (보안상 필수)
    existing = db.query(User).filter(User.email == email).first()
    if existing:
        raise HTTPException(status_code=400, detail="이미 존재하는 이메일입니다.")

    # 비밀번호 유효성(예: 길이 검사) - 백엔드 권장 검사
    if len(password) < 8:
        raise HTTPException(status_code=400, detail="비밀번호는 최소 8자 이상이어야 합니다.")

    # bcrypt 해싱
    hashed_pw = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    hashed_pw_str = hashed_pw.decode("utf-8")

    # 사용자 생성
    user = User(
        email=email,
        password=hashed_pw_str
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return {"success": True, "message": "회원가입 완료", "user_id": str(user.user_id)}


# -----------------------------
# 로그인
# POST /login
# Request form/body: email, password
# - 비밀번호 검증 후 session에 user_id 저장
# - last_login 업데이트
# -----------------------------
@router.post("/login")
def login(request: Request, email: str, password: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=401, detail="이메일 또는 비밀번호가 올바르지 않습니다.")

    # 비밀번호 검증 (bcrypt)
    if not bcrypt.checkpw(password.encode("utf-8"), user.password.encode("utf-8")):
        raise HTTPException(status_code=401, detail="이메일 또는 비밀번호가 올바르지 않습니다.")

    # 로그인 성공: 세션에 사용자 정보 저장
    request.session["user_id"] = str(user.user_id)
    request.session["email"] = user.email

    # last_login 업데이트 (UTC)
    user.last_login = datetime.utcnow()
    db.commit()

    return {"success": True, "message": "로그인 성공"}


# -----------------------------
# 로그아웃
# POST /logout
# - 세션 삭제 (POST 권장)
# -----------------------------
@router.post("/logout")
def logout(request: Request):
    # 세션 초기화
    request.session.clear()
    return {"success": True, "message": "로그아웃 완료"}


# -----------------------------
# 현재 로그인 사용자 정보 조회
# GET /me
# -----------------------------
@router.get("/me")
def me(request: Request, db: Session = Depends(get_db)):
    user_id = request.session.get("user_id")
    if not user_id:
        raise HTTPException(status_code=401, detail="로그인 필요")

    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        # 세션에 남아있지만 DB에 없는 경우 세션 정리
        request.session.clear()
        raise HTTPException(status_code=401, detail="유효하지 않은 사용자")

    # 안전을 위해 비밀번호는 반환하지 않음
    return {
        "user_id": str(user.user_id),
        "email": user.email,
        "role": user.role,
        "is_active": user.is_active,
        "last_login": user.last_login,
        "created_at": user.created_at
    }
