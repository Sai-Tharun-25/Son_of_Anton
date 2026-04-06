// apps/web/src/types/policy.ts

export type SourceType = "pdf" | "html" | "portal";

export type DocumentArchetype =
  | "single-drug"
  | "multi-drug"
  | "drug-list"
  | "structured-policy";

export type ParseStatus = "parsed" | "processing" | "error";

export type EvidenceSpan = {
  fieldName: string;
  snippet: string;
  pageNumber?: number;
  section?: string;
};

export type ExtractedPolicyFields = {
  coverageStatus?: string;
  priorAuthRequired?: string;
  stepTherapyRequired?: string;
  siteOfCare?: string;
  coveredIndications?: string[];
};

export type PolicyListItem = {
  policyId: string;
  payer: string;
  policyTitle: string;
  effectiveDate?: string;
  sourceType: SourceType;
  documentArchetype: DocumentArchetype;
  drugs: string[];
  parseStatus: ParseStatus;
};

export type PolicyDetail = {
  policyId: string;
  payer: string;
  policyTitle: string;
  effectiveDate?: string;
  sourceType: SourceType;
  documentArchetype: DocumentArchetype;
  parseStatus: ParseStatus;
  drugs: string[];
  summary: string;
  extractedFields: ExtractedPolicyFields;
  evidence: EvidenceSpan[];
};