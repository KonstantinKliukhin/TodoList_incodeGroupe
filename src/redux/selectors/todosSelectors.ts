import { IIssue, IssueType } from "../../common/types/issue";
import { RootState } from "../store";

export function allTodosSelector(state: RootState): IIssue[] {
  return state.todos.todos;
}

export function openedTodosSelector(state: RootState): IIssue[] {
  return state.todos.todos.filter((todo) => {
    return todo.state === IssueType.OPEN && (todo.assignee || todo.assignees);
  });
}

export function closedTodosSelector(state: RootState): IIssue[] {
  return state.todos.todos.filter((todo) => {
    return todo.state === IssueType.CLOSED;
  });
}
