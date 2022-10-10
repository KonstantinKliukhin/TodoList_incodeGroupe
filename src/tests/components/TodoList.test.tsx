import TodosList from "../../components/todosList/TodosList";
import {
  currentIssueSet,
  fetchRepo,
} from "../../redux/slices/reposSlice/reposSlice";
import { setupStore } from "../../redux/store";
import { IssueState } from "../../types/issue";
import {
  CLOSED_ISSUE,
  REDUX_ONE_REPO_ONE_CLOSED_ISSUE,
  REDUX_ONE_REPO_ONE_CLOSED_ISSUE_ONE_OPENISSUE,
} from "../data/reduxState";
import {
  mockFetchingRepo,
  correctFetchOptions,
  inCorrectOptionsToFetch,
} from "../helpers/mockFetchingRepo";
import renderWithProviders from "../helpers/renderWithProviders";
import { act, fireEvent } from "@testing-library/react";

mockFetchingRepo();

describe("TEST TODOLIST", () => {
  test("TEST CARD APPEARES AFTER THE DATA IS FETCHED", async () => {
    const store = setupStore();

    const { queryByTestId, getAllByTestId } = renderWithProviders(
      <TodosList type={IssueState.OPEN} />,
      { store }
    );

    expect(queryByTestId("todo-card")).not.toBeInTheDocument();

    await act(async () => {
      await store.dispatch(fetchRepo(correctFetchOptions));
    });

    const todoCard = getAllByTestId("todo-card-open");

    expect(todoCard.length).toBe(29);
  });

  test("TEST LOADING APPEARES AFTER THE DATA IS REQUESTED", async () => {
    const store = setupStore();

    const { queryByTestId, getByTestId } = renderWithProviders(
      <TodosList type={IssueState.OPEN} />,
      { store }
    );

    expect(queryByTestId("loading-spinner")).not.toBeInTheDocument();

    act(() => {
      store.dispatch(fetchRepo(correctFetchOptions));
    });

    const loadingSpinner = getByTestId("loading-spinner");

    expect(loadingSpinner).toBeInTheDocument();
  });

  test("TEST ERROR APPEARES AFTER THE ERROR IS RECEIVED", async () => {
    const store = setupStore();

    const { queryByTestId, findByTestId } = renderWithProviders(
      <TodosList type={IssueState.OPEN} />,
      { store }
    );

    expect(queryByTestId("error")).not.toBeInTheDocument();

    await act(async () => {
      await store.dispatch(fetchRepo(inCorrectOptionsToFetch));
    });

    const error = await findByTestId("error");

    expect(error).toBeInTheDocument();
  });

  test("NEW CARD APPEARES AFTER DRAG-N-DROP NEW CARD", () => {
    const store = setupStore(REDUX_ONE_REPO_ONE_CLOSED_ISSUE);

    const { queryByTestId, getByTestId } = renderWithProviders(
      <TodosList type={IssueState.OPEN} />,
      { store }
    );

    expect(queryByTestId("todo-card-open")).toBeNull();

    act(() => {
      store.dispatch(currentIssueSet(CLOSED_ISSUE));
    });

    act(() => {
      fireEvent.drop(getByTestId("todo-card-list"));
    });

    expect(getByTestId("todo-card-open")).toBeInTheDocument();
  });

  test("NEW CARD DOESN'T APPEARES ON LIST WITH AT LEAST ONE CARD AFTER DRAG-N-DROP NEW CARD", () => {
    const store = setupStore(REDUX_ONE_REPO_ONE_CLOSED_ISSUE_ONE_OPENISSUE);

    const { getByTestId, getAllByTestId } = renderWithProviders(
      <TodosList type={IssueState.OPEN} />,
      { store }
    );

    expect(getAllByTestId("todo-card-open").length).toBe(1);

    act(() => {
      store.dispatch(currentIssueSet(CLOSED_ISSUE));
    });

    act(() => {
      fireEvent.drop(getByTestId("todo-card-list"));
    });

    expect(getAllByTestId("todo-card-open").length).toBe(1);
  });
});
