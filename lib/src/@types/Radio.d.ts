export declare namespace N_Radio {
  type Parameter<T> = {
    text?: string;
    className?: string;
    disabled?: boolean;
    onClick: any;
    value: T;
  };

  type DefaultProps = Required<Pick<Parameter<"">, "className">> & { checked: boolean };
  type Props<T> = Parameter<T> & DefaultProps;

  namespace Group {
    type Parameter<T> = {
      children: JSX.Element[];
      value: T;
      onChange?(param: T): void;
      className?: string;
      disabled?: boolean;
      styles?: any;
    };

    type DefaultProps<T> = Required<Pick<Parameter<T>, "className" | "disabled">>;
    type Props<T> = Parameter<T> & DefaultProps<T>;
  }
}
