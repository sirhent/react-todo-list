import { Plus } from "phosphor-react";
import styles from "./Button.module.scss";

type iconNames = "Plus";

interface ButtonProps {
  iconName?: iconNames;
  btnColor?: "default";
  btnText: string;
  btnTitle: string;
  btnType: "button" | "reset" | "submit";
  isDisabled?: boolean;
}

export function Button(props: ButtonProps) {
  function returnButtonClasses() {
    if (!props.btnColor) {
      return `${styles["c-btn"]}`;
    }
  }

  function renderIcon() {
    if (!props.iconName) return;

    switch (props.iconName) {
      case "Plus":
        return (
          <Plus 
            className={styles["c-btn__icon"]} 
            weight="bold" 
          />
        );

      default:
        break;
    }
  }

  return (
    <button
      className={returnButtonClasses()}
      type={props.btnType ? props.btnType : "button"}
      title={props.btnTitle}
      disabled={props.isDisabled ? true : false}
    >
      {props.btnText}
      {renderIcon()}
    </button>
  );
}
