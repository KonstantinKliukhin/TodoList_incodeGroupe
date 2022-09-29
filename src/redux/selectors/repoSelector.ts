import { findElementById } from "../../utils";
import { RootState } from "../store";
import { IRepo } from "./../../common/types/repository";

export default function repoSelector(state: RootState): IRepo | null {
  if (!state.repos.currentRepoId) return null;
  const currentRepo = findElementById<IRepo>(
    state.repos.repos,
    state.repos.currentRepoId
  );

  if (!currentRepo) return null;

  return currentRepo;
}
