import { IIssue } from "../../../common/types/issue";
import { IGithubIssue } from "../common/types/entyties/githubIssue";
import normalizeUser from "./normalizeUser";

export default function normalizeIssue(issue: IGithubIssue): IIssue {
  return {
    id: issue.id,
    title: issue.title,
    createdAt: issue.created_at,
    closedAt: issue.closed_at,
    commentsNumber: issue.comments,
    user: normalizeUser(issue.user),
    state: issue.state,
    assignee: issue.assignee ? normalizeUser(issue.assignee) : undefined,
    assignees: issue.assignees?.map((assignee) => normalizeUser(assignee)),
  };
}
