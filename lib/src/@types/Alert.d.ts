export declare namespace N_Alert {
  type Parameter = {
    children?: JSX.Element;
    position?: Position;
    gap?: number;
    transition?: boolean;
  };

  type DefaultProps = Required<Pick<Parameter, "children" | "position" | "gap" | "transition">>;
  type Props = Parameter & DefaultProps;

  type Status = "info" | "Warning" | "Success" | "Error";
  type Alert = {
    text: string | JSX.Element | null;
    status?: string;
    id: number;
  };

  type Context = {
    alert: Alert[];
    set: (payload: { text: string | JSX.Element; status?: N_Alert.Status }) => void;
    remove: (payload: number) => void;
    clear: () => void;
  };

  type Position =
    | "left bottom"
    | "left center"
    | "left top"
    | "top left"
    | "top center"
    | "top right"
    | "right top"
    | "right center"
    | "right bottom"
    | "bottom left"
    | "bottom center"
    | "bottom right";

  // Provider Component
  namespace Provider {
    type Props = { children: React.ReactNode };
    type Payload = { text: string | JSX.Element; status?: N_Alert.Status };
  }

  // Text Component
  namespace Text {
    type Props = { item: Alert };
  }

  // Portal Component
  namespace Portal {
    type Props = {
      anchor: HTMLDivElement | null;
      position: N_Alert.Position;
      gap: number;
      transition: boolean;
    };
  }
}
