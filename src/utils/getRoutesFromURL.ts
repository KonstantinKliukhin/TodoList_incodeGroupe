import isValidURL from './isValidURL'

export default function getRoutesFromURL(url: string): string[] | null {
  if (!isValidURL(url)) {
    return null
  }

  const routes = new URL(url).pathname.split('/').slice(1)

  return routes
}
