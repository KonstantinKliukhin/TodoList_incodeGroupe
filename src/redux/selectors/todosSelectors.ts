import { IIssue, IssueType } from "../../common/types/issue";
import { RootState } from "../store";

export function allIssuesSelector(state: RootState): IIssue[] {
  return state.currentRepo.issues;
}

export function openedIssuesSelector(state: RootState): IIssue[] {
  return state.currentRepo.issues.filter((todo) => {
    return todo.state === IssueType.OPEN && (todo.assignee || todo.assignees);
  });
}

export function closedIssuesSelector(state: RootState): IIssue[] {
  return state.currentRepo.issues.filter((todo) => {
    return todo.state === IssueType.CLOSED;
  });
}
