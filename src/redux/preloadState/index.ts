import getReposState from "./getReposState";

export default function getPreloadState() {
  const preloadState = {
    repos: getReposState(),
  };

  return preloadState;
}
