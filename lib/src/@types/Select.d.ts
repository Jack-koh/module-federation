import React from "react";

export declare namespace N_Select {
  type onChange = (item: Data[]) => void;
  type Parameter = {
    multiple?: boolean;
    className?: string;
    onChange?: onChange;
    disabled?: boolean;
    transition?: boolean;
    children: React.ReactNode[];
  };

  type Data = {
    label: string;
    value: unknown;
    selected?: boolean;
    disabled?: boolean;
  };

  type DefaultProps = Required<
    Pick<Parameter, "className" | "onChange" | "disabled" | "transition" | "multiple">
  >;
  type Props = Parameter & DefaultProps;

  namespace Summary {
    type Parameter = {
      placeholder?: string;
    };
    type DefaultProps = Required<Pick<Parameter, "placeholder">>;
    type Props = Parameter & DefaultProps;
  }

  namespace Options {
    type Parameter = {
      options?: Data[];
      position?: "bottom" | "top";
      selected: N_Select.Data | null;
      children?: JSX.Element[];
    };

    type DefaultProps = Required<Pick<Parameter, "position">>;
    type Props = Parameter & DefaultProps;
  }

  namespace Item {
    type Parameter = {
      index: number;
      label?: string;
      value?: any;
      options?: Data[];
      setOptions?: React.Dispatch<Data[]>;
      selected?: boolean;
      children?: React.ReactNode;
      className?: string;
    };

    type DefaultProps = Required<
      Pick<Parameter, "label" | "value" | "selected" | "options" | "setOptions" | "className">
    >;
    type Props = Parameter & DefaultProps;
  }
}
