import { IRepo } from "../../types/repository";
import { findElementById } from "../../utils";
import { RootState } from "../store";

export default function repoSelector(state: RootState): IRepo | null {
  if (!state.repos.currentRepoId) return null;
  const currentRepo = findElementById<IRepo>(
    state.repos.repos,
    state.repos.currentRepoId
  );

  if (!currentRepo) return null;

  return currentRepo;
}
