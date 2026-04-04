from __future__ import annotations

import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase


# Local default: SQLite
# For Postgres later, set:
# DATABASE_URL=postgresql+psycopg://user:password@host:5432/dbname
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./app.db")


class Base(DeclarativeBase):
    pass


connect_args = {}
if DATABASE_URL.startswith("sqlite"):
    connect_args = {"check_same_thread": False}

engine = create_engine(DATABASE_URL, echo=False, future=True, connect_args=connect_args)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)