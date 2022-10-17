export default function validateTodoInputData(pathes: string[]): boolean {
  const isTwoPathes = pathes?.length === 2

  if (!isTwoPathes) {
    return false
  }

  const isTwoPathesNotEmpty = Boolean(
    pathes[0].replace(/\s/g, '').length && pathes[1].replace(/\s/g, '').length,
  )

  if (!isTwoPathesNotEmpty) {
    return false
  }

  return true
}
