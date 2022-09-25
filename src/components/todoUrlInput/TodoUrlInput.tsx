import { FC, useState, ChangeEventHandler, FormEventHandler } from "react";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { GithubApiURL } from "../../common/types/githubApiURL";
import { useAppDispatch } from "../../redux/hooks";
import { fetchAllTodos } from "../../redux/slices/todoSlice";
import { getRoutesFromURL } from "./../../utils";

const TodoURLInput: FC = () => {
  const [currentURL, setCurrentURL] = useState<string>("");
  const [URLInputError, setURLInputError] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const onChangeURL: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCurrentURL(e.target.value);
  };

  const onURLFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const fullURL = GithubApiURL.BASEURL + currentURL;

    const routes = getRoutesFromURL(fullURL);

    if (routes?.length === 2) {
      setURLInputError(false);

      dispatch(
        fetchAllTodos({
          owner: routes[0],
          repo: routes[1],
        })
      );
    } else {
      setURLInputError(true);
    }
  };

  return (
    <Form onSubmit={onURLFormSubmit} className="d-flex gap-3 mt-3">
      <InputGroup hasValidation>
        <InputGroup.Text className="px-2" id="prevTodoURLInput">
          https://github.com/
        </InputGroup.Text>
        <Form.Control
          id="todoURLInput"
          value={currentURL}
          onChange={onChangeURL}
          placeholder="user/repo"
          isInvalid={URLInputError}
        />
        <FormControl.Feedback
          className="position-absolute top-100"
          type="invalid"
        >
          Invalid URL, example: "facebook/react"
        </FormControl.Feedback>
      </InputGroup>
      <Button size="sm" className="px-4" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default TodoURLInput;
