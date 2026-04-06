import type { EvidenceSpan } from "@/types/policy";

export type CompareCell = {
  display: string;
  value?: string | boolean | null;
  evidence?: EvidenceSpan[];
};

export type CompareRecord = {
  payer: string;
  drug: string;
  coverageStatus: CompareCell;
  priorAuthRequired: CompareCell;
  stepTherapyRequired: CompareCell;
  coveredIndications: CompareCell;
  siteOfCare: CompareCell;
  preferredStatus: CompareCell;
  criteriaSummary: CompareCell;
};