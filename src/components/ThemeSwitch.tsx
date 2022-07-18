import { SunDim } from "phosphor-react";
import { useEffect, useState } from "react";
import styles from "./ThemeSwitch.module.scss";

interface ThemeSwitchProps {
  onThemeToggled: (isSwitched: boolean) => void;
}

export function ThemeSwitch(props: ThemeSwitchProps) {
  const [toggleState, setToggleState] = useState(false);

  function handleToggleSwitch() {
    if (toggleState) {
      setToggleState((prevState) => !prevState);
    } else {
      setToggleState((prevState) => !prevState);
    }
  }

  useEffect(() => {
    props.onThemeToggled(toggleState);
  }, [toggleState]);

  return (
    <div className={styles["c-theme-switch-container"]}>
      <SunDim className={styles["c-theme-switch-icon"]}/>
      <div className={styles["c-theme-switch"]}>
        <input 
          className={styles["c-theme-switch__input"]}
          type="checkbox"
          name="themeSwitch"
          id="themeSwitch"
          onChange={handleToggleSwitch}
        />
        <label 
          className={styles["c-theme-switch__label"]}
          htmlFor="themeSwitch"></label>
      </div>
    </div>
  );
}
