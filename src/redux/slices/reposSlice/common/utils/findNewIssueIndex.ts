
import { IIssue } from '../../../../../common/types/issue';
import { findIndexById } from '../../../../../utils';
import { FindNewIssueIndexType } from '../types/findNewIssueIndex';

const findNewIssueIndex: FindNewIssueIndexType = (issues, id, displacement) => {
  let newIssueIndex = findIndexById<IIssue>(issues, id) + displacement;

  if (newIssueIndex < 0) {
    newIssueIndex = 0;
  }

  return newIssueIndex;
};

export default findNewIssueIndex;
