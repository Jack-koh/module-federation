/* eslint-disable no-shadow */
export type Rules = { [key: string]: number } | string;

type Message = (value: string, compValue: number, option?: number) => string;
interface Extends {
  [key: string]: {
    regExp: (value: string, compValue?: number) => boolean;
    message: string | Message;
  };
}

// 룰 설정 ####################################
let extend: Extends = {
  min: {
    regExp: (value: string, compValue?: number): boolean => {
      if (Number.isNaN(+value)) return true;
      return compValue !== undefined ? +value < +compValue : false;
    },
    message: (value: string, compValue: number, max?: number) => {
      if (Number.isNaN(+value)) return "숫자만 입력 가능합니다.";
      return max
        ? `${compValue} ~ ${max} 사이의 숫자만 입력 가능합니다.`
        : `${compValue} 이상의 값만 입력할 수 있습니다.`;
    },
  },
  max: {
    regExp: (value: string, compValue?: number): boolean => {
      if (Number.isNaN(+value)) return true;
      return compValue !== undefined ? +value > +compValue : false;
    },
    message: (value: string, compValue: number, min?: number) => {
      if (Number.isNaN(+value)) return "숫자만 입력 가능합니다.";
      return min
        ? `${min} ~ ${compValue} 사이의 숫자만 입력 가능합니다.`
        : `${compValue} 이하의 값만 입력할 수 있습니다.`;
    },
  },
  minLength: {
    regExp: (value: string, compValue?: number): boolean =>
      compValue !== undefined ? value.length < +compValue : false,
    message: (value: string, compValue: number, max?: number) =>
      max ? `${compValue} ~ ${max} 자 이내로 입력할 수 있습니다.` : `${compValue} 자 이상으로 입력할 수 있습니다.`,
  },
  maxLength: {
    regExp: (value: string, compValue?: number): boolean =>
      compValue !== undefined ? value.length > +compValue : false,
    message: (value: string, compValue: number, min?: number) =>
      min ? `${min} ~ ${compValue} 자 이내로 입력할 수 있습니다.` : `${compValue} 자 이내로 입력할 수 있습니다.`,
  },
};

export const validator = {
  excute: (rules: Rules[], value: string): { errorMessage: string; rule: string } => {
    let errorMessage = "";
    let returnRule: string | string[] = "";

    // eslint-disable-next-line no-shadow
    rules.some((rule: string | { [key: string]: number | ((value: string) => string) }): boolean => {
      if (typeof rule === "undefined") return false;
      if (typeof rule === "object") {
        const objArr = Object.entries(rule);
        objArr.forEach(([key, compValue]) => {
          if (typeof compValue === "function") {
            errorMessage = compValue(value);
            returnRule = key;
            return true;
          }

          if (typeof compValue !== "function" && extend[key].regExp(value, compValue)) {
            const message = extend[key].message as Message;
            if (key === "min") {
              const max = objArr.find(([key]) => key === "max");
              const maxValue = max && typeof max[1] === "number" ? max[1] : undefined;
              errorMessage = value ? message(value, compValue, maxValue) : "";
            } else if (key === "max") {
              const min = objArr.find(([key]) => key === "min");
              const minValue = min && typeof min[1] === "number" ? min[1] : undefined;
              errorMessage = value ? message(value, compValue, minValue) : "";
            } else if (key === "minLength") {
              const maxLength = objArr.find(([key]) => key === "maxLength");
              const maxLengthValue = maxLength && typeof maxLength[1] === "number" ? maxLength[1] : undefined;
              errorMessage = value ? message(value, compValue, maxLengthValue) : "";
            } else if (key === "maxLength") {
              const minLength = objArr.find(([key]) => key === "minLength");
              const minLengthValue = minLength && typeof minLength[1] === "number" ? minLength[1] : undefined;
              errorMessage = value ? message(value, compValue, minLengthValue) : "";
            } else {
              errorMessage = message(value, compValue);
              returnRule = `${key}${compValue}`;
              return true;
            }
          }
          return false;
        });
        if (errorMessage) return true;
      }

      if (typeof rule !== "object" && extend[rule].regExp(value)) {
        errorMessage = extend[rule].message as string;
        returnRule = rule;
        return true;
      }
      return false;
    });

    return { errorMessage, rule: returnRule };
  },
  extensions: (propExtend: Extends) => {
    extend = { ...extend, ...propExtend };
  },
};
