from __future__ import annotations

from typing import List, Optional
import msgspec

class PageText(msgspec.Struct):
    page: int
    text: str


class RawDocument(msgspec.Struct):
    source_file: str
    pages: List[PageText]


class Section(msgspec.Struct):
    section_title: str
    page_start: int
    page_end: int
    text: str


class ParsedDocument(msgspec.Struct):
    source_file: str
    payer: Optional[str] = None
    policy_title: Optional[str] = None
    effective_date: Optional[str] = None
    sections: List[Section] = []


class EvidenceSpan(msgspec.Struct):
    field_name: str
    snippet: str
    page_number: Optional[int] = None
    section: Optional[str] = None


class CoverageRecord(msgspec.Struct):
    payer: str
    policy_title: str
    policy_id: Optional[str] = None
    effective_date: Optional[str] = None

    drug_name_raw: str = ""
    drug_name_canonical: str = ""

    indication_raw: Optional[str] = None
    indication_canonical: Optional[str] = None

    coverage_status: Optional[str] = None
    prior_auth_required: Optional[bool] = None
    step_therapy_required: Optional[bool] = None
    step_therapy_details: Optional[str] = None
    clinical_criteria: Optional[str] = None
    site_of_care_restriction: Optional[str] = None
    preferred_status: Optional[str] = None

    evidence: List[EvidenceSpan] = []


class ExtractedPolicy(msgspec.Struct):
    source_file: str
    payer: str
    policy_title: str
    effective_date: Optional[str] = None
    records: List[CoverageRecord] = []