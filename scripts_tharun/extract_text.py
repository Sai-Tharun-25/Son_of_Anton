from __future__ import annotations

import sys
from pathlib import Path
import fitz  # PyMuPDF
import msgspec

from models_tharun.schema import RawDocument, PageText


def extract_pdf_text(pdf_path: Path) -> RawDocument:
    doc = fitz.open(pdf_path)
    pages = []

    for i, page in enumerate(doc):
        # sort=True helps reorder extracted text into a more natural reading order
        text = page.get_text("text", sort=True)
        pages.append(PageText(page=i + 1, text=text))

    return RawDocument(source_file=pdf_path.name, pages=pages)


def main() -> None:
    if len(sys.argv) != 3:
        print("Usage: python scripts/extract_text.py <input.pdf> <output.json>")
        sys.exit(1)

    input_pdf = Path(sys.argv[1])
    output_json = Path(sys.argv[2])
    output_json.parent.mkdir(parents=True, exist_ok=True)

    raw_doc = extract_pdf_text(input_pdf)
    output_json.write_bytes(msgspec.json.encode(raw_doc))
    print(f"Wrote {output_json}")


if __name__ == "__main__":
    main()