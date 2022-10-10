interface FakeMouseEventInit {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
  altKey?: boolean;
  button?: 0 | 1 | 2 | 3 | 4;
  buttons?: number;
  clientX?: number;
  clientY?: number;
  ctrlKey?: boolean;
  metaKey?: boolean;
  movementX?: number;
  movementY?: number;
  offsetX?: number;
  offsetY?: number;
  pageX?: number;
  pageY?: number;
  screenX?: number;
  screenY?: number;
  shiftKey?: boolean;
  x?: number;
  y?: number;
}

class FakeMouseEvent extends MouseEvent {
  offsetX: number;
  offsetY: number;
  pageX: number;
  pageY: number;
  x: number;
  y: number;

  constructor(type: string, values: FakeMouseEventInit) {
    const { pageX, pageY, offsetX, offsetY, x, y, ...mouseValues } = values;
    super(type, mouseValues);
    this.pageX = pageX || 0;
    this.pageY = pageY || 0;
    this.offsetX = offsetX || 0;
    this.offsetY = offsetY || 0;
    this.x = x || 0;
    this.y = y || 0;
  }
}

export function getMouseEvent(
  type: string,
  values: FakeMouseEventInit = {}
): FakeMouseEvent {
  values = {
    bubbles: true,
    cancelable: true,
    ...values,
  };
  return new FakeMouseEvent(type, values);
}
