export default function findIndexById<Elem extends { id: number | string }>(
  arr: Elem[],
  id: string | number
): number {
  return arr.findIndex((elem) => {
    return elem.id === id;
  });
}
