import repoSelector from "../../../redux/selectors/repoSelector";
import { setupStore } from "../../../redux/store";
import { REDUX_ONE_REPO_FILLED_ISSUES } from "../../data/reduxState";

describe("TEST CURRENTREPOSELECTOR", () => {
  test("WORK WITH EMPTY STATE", () => {
    const store = setupStore();

    const state = store.getState();
    expect(repoSelector(state)).toBeNull();
  });

  test("WORKS WITH FILLED STATE", () => {
    const expectedRepo = REDUX_ONE_REPO_FILLED_ISSUES.repos.repos[0];

    const store = setupStore(REDUX_ONE_REPO_FILLED_ISSUES);

    const state = store.getState();
    expect(repoSelector(state)).toEqual(expectedRepo);
  });
});
