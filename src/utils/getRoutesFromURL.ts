import isValidURL from "./isValidURL";

export default function getRoutesFromURL(url: string) {
  if (!isValidURL(url)) {
    return null;
  }

  const routes = new URL(url).pathname.split("/").slice(1);

  return routes;
}
