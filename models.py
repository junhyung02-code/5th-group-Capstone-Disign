# models.py
# SQLAlchemy 모델 정의 (users 테이블)
# - user_id: UUID PK
# - email: 아이디로 사용 (unique)
# - password: bcrypt 해시 저장
# - role, is_active, last_login, created_at

import uuid
from sqlalchemy import Column, String, Boolean, DateTime, func
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from database import Base

class User(Base):
    __tablename__ = "users"

    # UUID primary key (PostgreSQL의 uuid 컬럼 사용)
    user_id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    # 이메일이 곧 아이디 (unique)
    email = Column(String(255), unique=True, nullable=False, index=True)

    # bcrypt로 해시된 비밀번호 저장
    password = Column(String(255), nullable=False)

    # role (예: user, admin)
    role = Column(String(20), nullable=False, default="user")

    # 활성화 여부
    is_active = Column(Boolean, nullable=False, default=True)

    # 마지막 로그인 시간 (UTC)
    last_login = Column(DateTime, nullable=True)

    # 생성 시간 (DB 서버 시간 사용)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
