from __future__ import annotations

import re
import sys
from pathlib import Path
from typing import List, Tuple

import msgspec

from models_tharun.schema import RawDocument, ParsedDocument, Section


HEADING_PATTERNS = [
    r"^COVERAGE RATIONALE$",
    r"^Coverage Rationale$",
    r"^POSITION STATEMENT:$",
    r"^POSITION STATEMENT$",
    r"^FDA Approved Use:$",
    r"^OVERVIEW$",
    r"^Applicable Codes$",
    r"^Policy History/Revision Information$",
    r"^General Requirements.*$",
    r"^Diagnosis-Specific Requirements$",
    r"^Indications and Specific Criteria$",
]

HEADING_RE = re.compile("|".join(f"(?:{p})" for p in HEADING_PATTERNS), re.MULTILINE)


def detect_metadata(full_text: str, filename: str) -> Tuple[str | None, str | None, str | None]:
    payer = None
    policy_title = None
    effective_date = None

    lower_name = filename.lower()
    if "cigna" in lower_name:
        payer = "Cigna"
    elif "florida blue" in lower_name:
        payer = "Florida Blue"
    elif "uhc" in lower_name or "unitedhealthcare" in full_text.lower():
        payer = "UnitedHealthcare"
    elif "bcbs" in lower_name or "blue cross nc" in full_text.lower():
        payer = "BCBS NC"
    elif "priority health" in lower_name or "priority health" in full_text.lower():
        payer = "Priority Health"

    # very lightweight title/date extraction
    title_patterns = [
        r"Policy Title[^\n]*[:.…]+\s*(.+)",
        r"Corporate Medical Policy:\s*(.+)",
        r"Subject:\s*(.+)",
        r"UnitedHealthcare.*?\n(.+)",
    ]
    for pat in title_patterns:
        m = re.search(pat, full_text, flags=re.IGNORECASE)
        if m:
            policy_title = m.group(1).strip()
            break

    date_patterns = [
        r"Effective Date[^\n]*[:.]+\s*([0-9/]{6,10}|[A-Za-z]+\s+\d{1,2},\s+\d{4})",
        r"Revised:\s*([0-9/]{6,10})",
        r"January\s+\d{4}",
        r"Last\s+Updated\s+([A-Za-z]+\s+\d{1,2},\s+\d{4})",
    ]
    for pat in date_patterns:
        m = re.search(pat, full_text, flags=re.IGNORECASE)
        if m:
            effective_date = m.group(1).strip() if m.groups() else m.group(0).strip()
            break

    return payer, policy_title, effective_date


def split_into_sections(raw: RawDocument) -> ParsedDocument:
    page_texts = [p.text for p in raw.pages]
    full_text = "\n\n".join(page_texts)

    payer, policy_title, effective_date = detect_metadata(full_text, raw.source_file)

    # Build a list of (page_number, line) tuples to preserve page mapping
    lines = []
    for page in raw.pages:
        for line in page.text.splitlines():
            lines.append((page.page, line.rstrip()))

    sections: List[Section] = []
    current_title = "Document Start"
    current_page_start = 1
    current_buffer: List[str] = []

    for page_num, line in lines:
        stripped = line.strip()

        if HEADING_RE.match(stripped):
            if current_buffer:
                sections.append(
                    Section(
                        section_title=current_title,
                        page_start=current_page_start,
                        page_end=page_num,
                        text="\n".join(current_buffer).strip(),
                    )
                )
            current_title = stripped
            current_page_start = page_num
            current_buffer = []
        else:
            current_buffer.append(line)

    if current_buffer:
        sections.append(
            Section(
                section_title=current_title,
                page_start=current_page_start,
                page_end=raw.pages[-1].page if raw.pages else 1,
                text="\n".join(current_buffer).strip(),
            )
        )

    return ParsedDocument(
        source_file=raw.source_file,
        payer=payer,
        policy_title=policy_title,
        effective_date=effective_date,
        sections=sections,
    )


def main() -> None:
    if len(sys.argv) != 3:
        print("Usage: python scripts/split_sections.py <raw.json> <sections.json>")
        sys.exit(1)

    raw_path = Path(sys.argv[1])
    out_path = Path(sys.argv[2])
    out_path.parent.mkdir(parents=True, exist_ok=True)

    raw_doc = msgspec.json.decode(raw_path.read_bytes(), type=RawDocument)
    parsed = split_into_sections(raw_doc)
    out_path.write_bytes(msgspec.json.encode(parsed))
    print(f"Wrote {out_path}")


if __name__ == "__main__":
    main()