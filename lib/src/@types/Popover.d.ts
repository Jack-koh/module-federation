import { Position } from "lib/@types";
export declare namespace N_Popover {
  type Parameter = {
    children?: JSX.Element;
    content: Content;
    position?: Position;
    className?: string;
    gap?: number;
    disabled?: boolean;
    clickInside?: boolean;
    clickOutside?: boolean;
    toggle?: boolean;
    onChange?: () => void;
    transition?: boolean;
  };

  type DefaultProps = Required<
    Pick<
      Parameter,
      | "transition"
      | "disabled"
      | "children"
      | "className"
      | "gap"
      | "position"
      | "content"
      | "clickOutside"
      | "clickInside"
    >
  >;

  type Props = Parameter & DefaultProps;

  type Content = (props: {
    closeHandler: () => void;
    open: boolean;
    anchor: Element;
  }) => JSX.Element;
}
