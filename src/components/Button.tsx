import { Plus } from "phosphor-react";
import styles from "./Button.module.css";

type iconNames = "Plus";

interface ButtonProps {
  iconName?: iconNames;
  btnColor: "blue";
  btnElement: "anchor" | "button";
  btnText: string;
  btnTitle: string;
  btnHref?: string;
  btnType?: "button" | "reset" | "submit";
  isDisabled?: boolean;
}

export function Button(props) {
  return (
    <button
      className={styles["c-btn"]}
      type="submit"
      title="Criar tarefa"
      disabled={false}
    >
      CRIAR
      <Plus 
        className={styles["c-btn__icon"]}
        weight="bold"
      />
    </button>
  );
}
