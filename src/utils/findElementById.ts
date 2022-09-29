export default function findElementById<Elem extends { id: number | string }>(
  arr: Elem[],
  id: string | number
): Elem | undefined {
  return arr.find((elem) => {
    return elem.id === id;
  });
}
