import { IIssue } from "../../../../../common/types/issue";

export type FindNewIssueIndexType = (
  issues: IIssue[],
  id: number,
  displacement: number
) => number