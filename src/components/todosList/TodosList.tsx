import { FC } from "react";
import { Stack } from "react-bootstrap";
import TodoCard from "../todoCard/TodoCard";

import { RootState } from "../../redux/store";
import { IIssue } from "./../../common/types/issue";
import { useAppSelector } from "../../redux/hooks";
import { setContent } from "../../utils";

interface ITodosListProps {
  title: string;
  todosSelector: (state: RootState) => IIssue[];
}

const TodosList: FC<ITodosListProps> = ({ title, todosSelector }) => {
  const todos = useAppSelector<IIssue[]>(todosSelector);
  const loading = useAppSelector((state) => state.todos.loading);

  const renderTodoCard = () => {
    return todos.map((todo) => {
      return <TodoCard key={todo.id} todo={todo} />;
    });
  };

  return (
    <div>
      <h3 className="h3 text-center">{title}</h3>
      <Stack
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
