import { IIssue, IssueType } from '../../../../common/types/issue';
import { ApiRequest } from '../../../common/types/request';

export interface getIssuesOptions {
  owner: string;
  repo: string;
	state: IssueType;
}

export type getIssueReturnType = IIssue[];

export type getIssueType = ApiRequest<getIssuesOptions, getIssueReturnType>;
