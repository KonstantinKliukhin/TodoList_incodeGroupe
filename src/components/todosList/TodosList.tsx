import { Loading } from "../../common/types/loadingState";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { issueToRepoAdded } from "../../redux/slices/reposSlice";
import { setContent } from "../../utils";
import TodoCard from "../todoCard/TodoCard";
import { IIssue, IssueType } from "./../../common/types/issue";
import getTitleAndSelectorByIssue from "./getTitleAndSelectorByIssue";
import { FC, DragEvent } from "react";
import { Stack } from "react-bootstrap";

interface ITodosListProps {
  type: IssueType;
}

const TodosList: FC<ITodosListProps> = ({ type }) => {
  const { todoSelector, title } = getTitleAndSelectorByIssue(type);

  const dispatch = useAppDispatch();

  const todos = useAppSelector<IIssue[]>(todoSelector);

  const loading = useAppSelector<Loading>(
    (state) => state.repos.currentRepoLoadingStatus
  );

  const dropHandler = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();

    if (todos.length) return;

    dispatch(issueToRepoAdded(type));
  };

  const renderTodoCard = () => {
    return todos.map((todo) => {
      return <TodoCard key={todo.id} todo={todo} todos={todos} />;
    });
  };

  return (
    <div>
      <h3 className="h3 text-center">{title}</h3>
      <Stack
        onDragOver={(e: DragEvent<HTMLElement>) => {
          e.preventDefault();
        }}
        onDrop={(e) => dropHandler(e)}
        style={{ height: "500px" }}
        className="p-3 overflow-auto scroll-bar-hidden border border-3 border-primary bg-secondary rounded"
        gap={2}
      >
        {setContent(loading, renderTodoCard)}
      </Stack>
    </div>
  );
};

export default TodosList;
