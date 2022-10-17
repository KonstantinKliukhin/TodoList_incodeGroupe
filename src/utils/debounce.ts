export default function debounce<
  CallbackArgs extends unknown[],
  Callback extends (...args: CallbackArgs) => void,
>(callback: Callback, wait: number): (...args: CallbackArgs) => void {
  let isActiveTimeout = false

  let timeout: ReturnType<typeof setTimeout>

  return (...args: CallbackArgs) => {
    if (isActiveTimeout) {
      clearTimeout(timeout)
    } else {
      isActiveTimeout = true
    }

    timeout = setTimeout(() => {
      callback(...args)
    }, wait)
  }
}
