import { IssueState } from "../../../../../types/issue";
import { PushIssueType } from "../types/pushIssue";

const pushIssue: PushIssueType = (issueState, currentRepo, currentIssue) => {
  switch (issueState) {
    case IssueState.OPEN:
      currentRepo.openIssues.push(currentIssue);
      break;
    case IssueState.INPROGRESS:
      currentRepo.inProgressIssues.push(currentIssue);
      break;
    case IssueState.CLOSED:
      currentRepo.closedIssues.push(currentIssue);
      break;
    default: {
      const exhaustiveCheck: never = issueState;
      throw new Error(exhaustiveCheck);
    }
  }
};

export default pushIssue;
