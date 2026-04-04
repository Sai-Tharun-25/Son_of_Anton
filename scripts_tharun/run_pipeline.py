from __future__ import annotations

from pathlib import Path
import subprocess
import sys


RAW_DIR = Path("data")
PARSED_DIR = Path("data/parsed")
SECTIONS_DIR = Path("data/sections")
EXTRACTED_DIR = Path("data/extracted")
NORMALIZED_DIR = Path("data/normalized")


def run(cmd):
    print(">", " ".join(str(x) for x in cmd))
    subprocess.run(cmd, check=True)


def main():
    pdfs = sorted(RAW_DIR.glob("*.pdf"))
    if not pdfs:
        print("No PDFs found in data/raw")
        sys.exit(1)

    for pdf in pdfs:
        stem = pdf.stem.replace(" ", "_").replace("/", "_")

        raw_json = PARSED_DIR / f"{stem}.json"
        sections_json = SECTIONS_DIR / f"{stem}.json"
        extracted_json = EXTRACTED_DIR / f"{stem}.json"
        normalized_json = NORMALIZED_DIR / f"{stem}.json"

        run(["python", "-m", "scripts_tharun.extract_text", str(pdf), str(raw_json)])
        run(["python", "-m", "scripts_tharun.split_sections", str(raw_json), str(sections_json)])
        run(["python", "-m", "scripts_tharun.extract_structured", str(sections_json), str(extracted_json)])
        run(["python", "-m", "scripts_tharun.normalize_records", str(extracted_json), str(normalized_json)])

    print(f"Finished processing {len(pdfs)} documents")

if __name__ == "__main__":
    main()