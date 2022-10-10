import RepoLinks from "../../components/repoLinks/repoLinks";
import {
  mockFetchingRepo,
  correctFetchOptions,
  inCorrectOptionsToFetch,
} from "../helpers/mockFetchingRepo";
import renderWithProviders from "../helpers/renderWithProviders";
import { fetchRepo } from "./../../redux/slices/reposSlice/reposSlice";
import { setupStore } from "./../../redux/store";
import { act } from "@testing-library/react";

mockFetchingRepo();

describe("TEST REPOLINKS", () => {
  test("TEST LINKS APPEARES AFTER THE DATA IS FETCHED", async () => {
    const store = setupStore();

    const { queryByTestId, findByTestId } = renderWithProviders(<RepoLinks />, {
      store,
    });

    expect(queryByTestId("repo-links")).not.toBeInTheDocument();

    await act(async () => {
      await store.dispatch(fetchRepo(correctFetchOptions));
    });

    const repoLinks = await findByTestId("repo-links");

    expect(repoLinks).toBeInTheDocument();
  });

  test("TEST LINKS DOESN'T APPEARES AFTER AN ERROR IS RECEIVED", async () => {
    const store = setupStore();

    const { queryByTestId } = renderWithProviders(<RepoLinks />, { store });

    expect(queryByTestId("repo-links")).not.toBeInTheDocument();

    await act(async () => {
      await store.dispatch(fetchRepo(inCorrectOptionsToFetch));
    });

    const repoLinks = queryByTestId("repo-links");

    expect(repoLinks).not.toBeInTheDocument();
  });
});
