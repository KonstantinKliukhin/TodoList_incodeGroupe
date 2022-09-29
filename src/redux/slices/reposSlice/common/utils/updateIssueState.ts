import { IssueType } from "../../../../../common/types/issue";
import { UpdateIssueStateType } from "../types/updateIssueState";

const updateIssueState: UpdateIssueStateType = (issueType, issue) => {
  switch (issueType) {
    case IssueType.OPEN:
      issue.state = IssueType.OPEN;

      issue.closedAt = undefined;
      issue.updatedAt = String(new Date());

      break;
    case IssueType.INPROGRESS:
      issue.state = IssueType.INPROGRESS;

      issue.closedAt = undefined;
      issue.updatedAt = String(new Date());

      break;
    case IssueType.CLOSED:
      issue.state = IssueType.CLOSED;

      issue.closedAt = String(new Date());
      issue.updatedAt = String(new Date());

      break;
    default: {
      const exhaustiveCheck: never = issueType;
      throw new Error(exhaustiveCheck);
    }
  }
}

export default updateIssueState;