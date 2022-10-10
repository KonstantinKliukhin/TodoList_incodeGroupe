import { ReactNode, ReactElement } from "react";

export type AnyReactElement =
  | ReactNode
  | ReactNode[]
  | ReactElement
  | ReactElement[];
