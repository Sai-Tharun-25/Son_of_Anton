import type { CompareRecord } from "@/types/compare";

export const mockCompareRecords: CompareRecord[] = [
  {
    payer: "BCBS NC",
    drug: "Bevacizumab",
    coverageStatus: {
      display: "Conditional / formulary-managed",
      value: "conditional",
      evidence: [
        {
          fieldName: "coverageStatus",
          snippet:
            "Policy distinguishes preferred and non-preferred injectable oncology products.",
          pageNumber: 1,
          section: "Program Summary",
        },
      ],
    },
    priorAuthRequired: {
      display: "Yes",
      value: true,
      evidence: [
        {
          fieldName: "priorAuthRequired",
          snippet:
            "Coverage is managed under the corporate medical policy program with utilization controls.",
          pageNumber: 1,
          section: "Program Summary",
        },
      ],
    },
    stepTherapyRequired: {
      display: "Not clearly stated",
      value: null,
      evidence: [
        {
          fieldName: "stepTherapyRequired",
          snippet:
            "Program structure suggests formulary preference management rather than explicit step therapy in the summary.",
          pageNumber: 1,
          section: "Program Summary",
        },
      ],
    },
    coveredIndications: {
      display: "Oncology indications per policy",
      value: "oncology indications",
      evidence: [
        {
          fieldName: "coveredIndications",
          snippet:
            "The oncology program applies to injectable oncology products listed in the policy.",
          pageNumber: 1,
          section: "Program Summary",
        },
      ],
    },
    siteOfCare: {
      display: "Not captured yet",
      value: null,
      evidence: [],
    },
    preferredStatus: {
      display: "Preferred/non-preferred program",
      value: "program-managed",
      evidence: [
        {
          fieldName: "preferredStatus",
          snippet:
            "Preferred and non-preferred products are identified in the oncology program.",
          pageNumber: 1,
          section: "Program Summary",
        },
      ],
    },
    criteriaSummary: {
      display: "Corporate oncology program with formulary controls",
      value: "Corporate oncology program with formulary controls",
      evidence: [
        {
          fieldName: "criteriaSummary",
          snippet:
            "Coverage is governed through the preferred injectable oncology program structure.",
          pageNumber: 1,
          section: "Program Summary",
        },
      ],
    },
  },
  {
    payer: "Florida Blue",
    drug: "Bevacizumab",
    coverageStatus: {
      display: "Conditional",
      value: "conditional",
      evidence: [
        {
          fieldName: "coverageStatus",
          snippet:
            "Coverage depends on meeting the medical necessity criteria in the guideline.",
          pageNumber: 2,
          section: "Coverage Criteria",
        },
      ],
    },
    priorAuthRequired: {
      display: "Yes",
      value: true,
      evidence: [
        {
          fieldName: "priorAuthRequired",
          snippet:
            "The policy is applied through medical coverage review and criteria-based determination.",
          pageNumber: 1,
          section: "Position Statement",
        },
      ],
    },
    stepTherapyRequired: {
      display: "Possible, indication-specific",
      value: "possible",
      evidence: [
        {
          fieldName: "stepTherapyRequired",
          snippet:
            "Certain covered uses may depend on indication-specific prerequisites in the guideline.",
          pageNumber: 2,
          section: "Coverage Criteria",
        },
      ],
    },
    coveredIndications: {
      display: "Criteria-based oncology uses",
      value: "criteria-based oncology uses",
      evidence: [
        {
          fieldName: "coveredIndications",
          snippet:
            "Position statement and indication-specific criteria define covered uses.",
          pageNumber: 1,
          section: "Position Statement",
        },
      ],
    },
    siteOfCare: {
      display: "Not captured yet",
      value: null,
      evidence: [],
    },
    preferredStatus: {
      display: "Not stated",
      value: null,
      evidence: [],
    },
    criteriaSummary: {
      display: "Indication-specific medical necessity criteria",
      value: "Indication-specific medical necessity criteria",
      evidence: [
        {
          fieldName: "criteriaSummary",
          snippet:
            "The guideline uses a position statement and criteria sections to determine coverage.",
          pageNumber: 1,
          section: "Position Statement",
        },
      ],
    },
  },
];