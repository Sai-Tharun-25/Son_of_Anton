import type { CompareRecord } from "@/types/compare";

export const selectedDrug = "Bevacizumab";

export const compareRows: Array<{
  key: keyof CompareRecord;
  label: string;
}> = [
  { key: "coverageStatus", label: "Coverage status" },
  { key: "priorAuthRequired", label: "Prior authorization" },
  { key: "stepTherapyRequired", label: "Step therapy" },
  { key: "coveredIndications", label: "Covered indications" },
  { key: "siteOfCare", label: "Site of care" },
  { key: "preferredStatus", label: "Preferred status" },
  { key: "criteriaSummary", label: "Criteria summary" },
];