export declare namespace N_CheckBox {
  type Parameter = {
    label?: React.ReactNode;
    id?: string;
    className?: string;
    disabled?: boolean;
    st?: React.CSSProperties;
    checked?: number;
    onChange?: (check: number) => void;
  };

  type DefaultProps = Required<Pick<Parameter, "className" | "disabled">>;
  type Props = Parameter & DefaultProps;
}
