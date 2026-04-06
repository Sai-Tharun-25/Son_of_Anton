import type { PolicyChange } from "@/types/change";

export const mockChanges: PolicyChange[] = [
  {
    id: "chg-001",
    payer: "Florida Blue",
    drug: "Bevacizumab",
    fieldName: "criteriaSummary",
    oldValue: "General medical necessity review",
    newValue: "Indication-specific medical necessity criteria",
    summary:
      "The policy now uses more explicit indication-specific criteria for bevacizumab coverage.",
    effectiveDate: "2025-02-01",
    changeType: "updated",
  },
  {
    id: "chg-002",
    payer: "BCBS NC",
    drug: "Bevacizumab",
    fieldName: "preferredStatus",
    oldValue: "Not differentiated",
    newValue: "Preferred/non-preferred program",
    summary:
      "The policy now distinguishes preferred and non-preferred injectable oncology products.",
    effectiveDate: "2025-01-01",
    changeType: "updated",
  },
  {
    id: "chg-003",
    payer: "Cigna",
    drug: "Rituximab",
    fieldName: "priorAuthRequired",
    oldValue: "Review implied",
    newValue: "Yes",
    summary:
      "The policy explicitly reflects utilization management and prior authorization review for covered use cases.",
    effectiveDate: "2025-01-15",
    changeType: "updated",
  },
  {
    id: "chg-004",
    payer: "UHC",
    drug: "Botulinum toxin",
    fieldName: "coverageStatus",
    oldValue: "General policy language",
    newValue: "Conditional",
    summary:
      "Coverage language is structured around defined coverage rationale and medically necessary use conditions.",
    effectiveDate: "2025-01-01",
    changeType: "updated",
  },
];