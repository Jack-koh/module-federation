import { Rules } from "lib/module/lib/validator";

export declare namespace N_Input {
  type Parameter = {
    st?: React.CSSProperties;
    type?: string;
    min?: string;
    max?: string;
    id?: string;
    className?: string;
    innerRef?: React.RefObject<HTMLInputElement> | null;
    // 발리데이터
    rules?: Rules[];
    validType?: "realtime" | "blur";
    error?: string | string[];
    value?: string;
    // ...rest #################
    disabled?: boolean;
    placeholder?: string | undefined;
    readonly?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: () => void;
    onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    keyEnter?: (value: string) => void;
    onClick?: () => void;
  };

  type DefaultProps = Required<
    Pick<Parameter, "onBlur" | "keyEnter" | "type" | "className" | "disabled" | "error">
  >;
  type Props = Parameter & DefaultProps;

  type Error = string | string[];
}
