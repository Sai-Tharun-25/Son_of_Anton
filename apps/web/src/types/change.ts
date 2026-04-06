export type ChangeType = "added" | "removed" | "updated";

export type PolicyChange = {
  id: string;
  payer: string;
  drug: string;
  fieldName: string;
  oldValue?: string;
  newValue?: string;
  summary: string;
  effectiveDate?: string;
  changeType: ChangeType;
};