from __future__ import annotations

from datetime import date
from typing import Optional

from sqlalchemy import Boolean, Date, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from backend_tharun.db import Base


class Policy(Base):
    __tablename__ = "policies"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    payer: Mapped[str] = mapped_column(String(255), index=True)
    policy_title: Mapped[str] = mapped_column(String(500), index=True)
    policy_id: Mapped[Optional[str]] = mapped_column(String(100), nullable=True, index=True)
    effective_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True, index=True)
    source_file: Mapped[str] = mapped_column(String(500), unique=True, index=True)
    source_type: Mapped[str] = mapped_column(String(50), default="pdf")
    doc_archetype: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)

    coverage_records: Mapped[list["CoverageRecord"]] = relationship(
        back_populates="policy",
        cascade="all, delete-orphan"
    )


class CoverageRecord(Base):
    __tablename__ = "coverage_records"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    policy_id: Mapped[int] = mapped_column(ForeignKey("policies.id", ondelete="CASCADE"), index=True)

    drug_name_raw: Mapped[str] = mapped_column(String(255), index=True)
    drug_name_canonical: Mapped[str] = mapped_column(String(255), index=True)

    indication_raw: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    indication_canonical: Mapped[Optional[str]] = mapped_column(String(255), nullable=True, index=True)

    coverage_status: Mapped[Optional[str]] = mapped_column(String(100), nullable=True, index=True)
    prior_auth_required: Mapped[Optional[bool]] = mapped_column(Boolean, nullable=True, index=True)
    step_therapy_required: Mapped[Optional[bool]] = mapped_column(Boolean, nullable=True, index=True)
    step_therapy_details: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    clinical_criteria: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    site_of_care_restriction: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    preferred_status: Mapped[Optional[str]] = mapped_column(String(100), nullable=True, index=True)

    policy: Mapped["Policy"] = relationship(back_populates="coverage_records")
    evidence_spans: Mapped[list["EvidenceSpan"]] = relationship(
        back_populates="coverage_record",
        cascade="all, delete-orphan"
    )


class EvidenceSpan(Base):
    __tablename__ = "evidence_spans"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    coverage_record_id: Mapped[int] = mapped_column(
        ForeignKey("coverage_records.id", ondelete="CASCADE"),
        index=True
    )

    field_name: Mapped[str] = mapped_column(String(100), index=True)
    snippet: Mapped[str] = mapped_column(Text)
    page_number: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    section_title: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)

    coverage_record: Mapped["CoverageRecord"] = relationship(back_populates="evidence_spans")