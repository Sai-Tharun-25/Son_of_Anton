import type { PolicyDetail, PolicyListItem } from "@/types/policy";

export const mockPolicies: PolicyListItem[] = [
  {
    policyId: "bcbsnc-avastin",
    payer: "BCBS NC",
    policyTitle: "Preferred Injectable Oncology Program",
    effectiveDate: "2025-01-01",
    sourceType: "pdf",
    documentArchetype: "multi-drug",
    drugs: ["Bevacizumab", "Rituximab", "Trastuzumab"],
    parseStatus: "parsed",
  },
  {
    policyId: "cigna-rituximab",
    payer: "Cigna",
    policyTitle: "Rituximab Intravenous Products for Non-Oncology Indications",
    effectiveDate: "2025-01-15",
    sourceType: "pdf",
    documentArchetype: "single-drug",
    drugs: ["Rituximab"],
    parseStatus: "parsed",
  },
  {
    policyId: "floridablue-bevacizumab",
    payer: "Florida Blue",
    policyTitle: "Bevacizumab Medical Coverage Guideline",
    effectiveDate: "2025-02-01",
    sourceType: "pdf",
    documentArchetype: "single-drug",
    drugs: ["Bevacizumab"],
    parseStatus: "parsed",
  },
  {
    policyId: "priority-health-2026-mdl",
    payer: "Priority Health",
    policyTitle: "2026 Medical Drug List",
    effectiveDate: "2026-01-01",
    sourceType: "pdf",
    documentArchetype: "drug-list",
    drugs: ["Multiple"],
    parseStatus: "processing",
  },
  {
    policyId: "uhc-botulinum-toxins",
    payer: "UHC",
    policyTitle: "Botulinum Toxins A and B - Commercial Medical Benefit Drug Policy",
    effectiveDate: "2025-01-01",
    sourceType: "pdf",
    documentArchetype: "structured-policy",
    drugs: ["Botulinum toxin"],
    parseStatus: "parsed",
  },
];

export const mockPolicyDetails: Record<string, PolicyDetail> = {
  "bcbsnc-avastin": {
    policyId: "bcbsnc-avastin",
    payer: "BCBS NC",
    policyTitle: "Preferred Injectable Oncology Program",
    effectiveDate: "2025-01-01",
    sourceType: "pdf",
    documentArchetype: "multi-drug",
    parseStatus: "parsed",
    drugs: ["Bevacizumab", "Rituximab", "Trastuzumab"],
    summary:
      "Corporate oncology policy listing preferred and non-preferred injectable oncology products.",
    extractedFields: {
      coverageStatus: "Conditional / formulary-managed",
      priorAuthRequired: "Yes",
      stepTherapyRequired: "Not explicitly stated in summary",
      siteOfCare: "Not captured yet",
      coveredIndications: ["Oncology indications per policy"],
    },
    evidence: [
      {
        fieldName: "coverageStatus",
        snippet:
          "Policy includes preferred and non-preferred injectable oncology products.",
        pageNumber: 1,
        section: "Program Summary",
      },
      {
        fieldName: "priorAuthRequired",
        snippet:
          "Coverage is managed under the corporate medical policy program with utilization controls.",
        pageNumber: 1,
        section: "Program Summary",
      },
    ],
  },
  "cigna-rituximab": {
    policyId: "cigna-rituximab",
    payer: "Cigna",
    policyTitle: "Rituximab Intravenous Products for Non-Oncology Indications",
    effectiveDate: "2025-01-15",
    sourceType: "pdf",
    documentArchetype: "single-drug",
    parseStatus: "parsed",
    drugs: ["Rituximab"],
    summary:
      "Single-drug policy focused on rituximab IV products for non-oncology use cases.",
    extractedFields: {
      coverageStatus: "Conditional",
      priorAuthRequired: "Yes",
      stepTherapyRequired: "Depends on indication",
      siteOfCare: "Not captured yet",
      coveredIndications: [
        "Non-oncology indications",
        "Diagnosis-specific criteria",
      ],
    },
    evidence: [
      {
        fieldName: "coveredIndications",
        snippet:
          "This policy applies to rituximab intravenous products for non-oncology indications.",
        pageNumber: 1,
        section: "Coverage Policy",
      },
      {
        fieldName: "priorAuthRequired",
        snippet:
          "Coverage criteria are subject to clinical review and plan requirements.",
        pageNumber: 1,
        section: "Coverage Policy",
      },
    ],
  },
  "floridablue-bevacizumab": {
    policyId: "floridablue-bevacizumab",
    payer: "Florida Blue",
    policyTitle: "Bevacizumab Medical Coverage Guideline",
    effectiveDate: "2025-02-01",
    sourceType: "pdf",
    documentArchetype: "single-drug",
    parseStatus: "parsed",
    drugs: ["Bevacizumab"],
    summary:
      "Criteria-driven bevacizumab policy with indication-specific position statements.",
    extractedFields: {
      coverageStatus: "Conditional",
      priorAuthRequired: "Yes",
      stepTherapyRequired: "Possible, indication-specific",
      siteOfCare: "Not captured yet",
      coveredIndications: ["Oncology-related indications", "Criteria-based uses"],
    },
    evidence: [
      {
        fieldName: "coveredIndications",
        snippet:
          "Position statement and indication-specific criteria define covered uses.",
        pageNumber: 1,
        section: "Position Statement",
      },
      {
        fieldName: "coverageStatus",
        snippet:
          "Coverage depends on meeting the medical necessity criteria in the guideline.",
        pageNumber: 2,
        section: "Coverage Criteria",
      },
    ],
  },
  "priority-health-2026-mdl": {
    policyId: "priority-health-2026-mdl",
    payer: "Priority Health",
    policyTitle: "2026 Medical Drug List",
    effectiveDate: "2026-01-01",
    sourceType: "pdf",
    documentArchetype: "drug-list",
    parseStatus: "processing",
    drugs: ["Multiple"],
    summary:
      "Large medical drug list with coverage and restriction codes across many products.",
    extractedFields: {
      coverageStatus: "Processing",
      priorAuthRequired: "Processing",
      stepTherapyRequired: "Processing",
      siteOfCare: "Processing",
      coveredIndications: [],
    },
    evidence: [],
  },
  "uhc-botulinum-toxins": {
    policyId: "uhc-botulinum-toxins",
    payer: "UHC",
    policyTitle: "Botulinum Toxins A and B - Commercial Medical Benefit Drug Policy",
    effectiveDate: "2025-01-01",
    sourceType: "pdf",
    documentArchetype: "structured-policy",
    parseStatus: "parsed",
    drugs: ["Botulinum toxin"],
    summary:
      "Structured medical benefit policy with coverage rationale, codes, and policy history.",
    extractedFields: {
      coverageStatus: "Conditional",
      priorAuthRequired: "Yes",
      stepTherapyRequired: "Indication-dependent",
      siteOfCare: "Not captured yet",
      coveredIndications: ["Botulinum toxin medical benefit indications"],
    },
    evidence: [
      {
        fieldName: "coverageStatus",
        snippet:
          "Coverage rationale outlines when botulinum toxins are medically necessary.",
        pageNumber: 1,
        section: "Coverage Rationale",
      },
      {
        fieldName: "priorAuthRequired",
        snippet:
          "Commercial medical benefit policy applies utilization management requirements.",
        pageNumber: 1,
        section: "Coverage Rationale",
      },
    ],
  },
};