import { GithubApiURL } from "../../common/types/githubApiURL";
import { useAppDispatch } from "../../redux/hooks";
import { fetchRepo } from "../../redux/slices/reposSlice";
import { getRoutesFromURL } from "./../../utils";
import { FC, useState, ChangeEventHandler, FormEventHandler } from "react";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";

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

      const options = {
        owner: routes[0],
        repoName: routes[1],
      };

      dispatch(fetchRepo(options));
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
          Invalid path, example: "facebook/react"
        </FormControl.Feedback>
      </InputGroup>
      <Button size="sm" className="px-4" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default TodoURLInput;
