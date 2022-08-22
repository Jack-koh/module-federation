export declare namespace N_Button {
  type Type = "button" | "submit";

  type Parameter = {
    type?: Type;
    loading?: boolean;
    id?: string;
    className?: string;
    disabled?: boolean;
    children?: React.ReactNode;
    onClick?: (e: React.UIEvent) => void;
    st?: React.CSSProperties;
  };

  type DefaultProps = Required<
    Pick<Parameter, "type" | "className" | "loading" | "disabled" | "children" | "onClick">
  >;
  type Props = Parameter & DefaultProps;
}
