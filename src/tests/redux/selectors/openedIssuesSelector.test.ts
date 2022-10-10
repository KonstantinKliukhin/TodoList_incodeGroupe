import { openedIssuesSelector } from "../../../redux/selectors/issuesSelectors";
import { setupStore } from "../../../redux/store";
import {
  REDUX_ONE_REPO_FILLED_ISSUES,
  OPENED_ISSUE,
} from "../../data/reduxState";

describe("TEST OPENEDISSUESELECTOR", () => {
  test("WORK WITH EMPTY STATE", () => {
    const store = setupStore();

    const state = store.getState();
    expect(openedIssuesSelector(state)).toEqual([]);
  });

  test("WORKS WITH FILLED STATE", () => {
    const store = setupStore(REDUX_ONE_REPO_FILLED_ISSUES);

    const state = store.getState();
    expect(openedIssuesSelector(state)).toEqual([OPENED_ISSUE]);
  });
});
