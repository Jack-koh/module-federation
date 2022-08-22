export declare namespace N_Accordion {
  type Parameter = {
    disabled?: boolean;
    children?: React.ReactNode;
    id?: string;
    className?: string;
    transition?: boolean;
    toggleOnRow?: boolean;
    expanded?: boolean;
    onChange?: (expanded: boolean) => void;
  };

  type DefaultProps = Required<
    Pick<Parameter, "disabled" | "children" | "className" | "transition" | "toggleOnRow">
  >;

  type Props = Parameter & DefaultProps;

  namespace Summary {
    type Parameter = {
      children?: React.ReactNode;
      expandIcon?: JSX.Element;
      id?: string;
      className?: string;
    };

    type DefaultProps = Required<Pick<Parameter, "children" | "expandIcon" | "className">>;
    type Props = Parameter & DefaultProps;
  }

  namespace Collapse {
    type Parameter = {
      children?: React.ReactNode;
      id?: string;
      className?: string;
    };

    type DefaultProps = Required<Pick<Parameter, "children" | "className">>;
    type Props = Parameter & DefaultProps;
  }
}
