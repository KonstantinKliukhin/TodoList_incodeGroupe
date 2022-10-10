import { IssueState } from "../../../../../types/issue";
import { UpdateIssueType } from "../types/updateIssueState";

const updateIssue: UpdateIssueType = (issueState, issue) => {
  switch (issueState) {
    case IssueState.OPEN:
      issue.state = IssueState.OPEN;

      issue.closedAt = undefined;
      issue.updatedAt = String(new Date());

      break;
    case IssueState.INPROGRESS:
      issue.state = IssueState.INPROGRESS;

      issue.closedAt = undefined;
      issue.updatedAt = String(new Date());

      break;
    case IssueState.CLOSED:
      issue.state = IssueState.CLOSED;

      issue.closedAt = String(new Date());
      issue.updatedAt = String(new Date());

      break;
    default: {
      const exhaustiveCheck: never = issueState;
      throw new Error(exhaustiveCheck);
    }
  }
};

export default updateIssue;
