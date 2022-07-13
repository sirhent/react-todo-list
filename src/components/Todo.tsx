import { Trash } from "phosphor-react";
import { useId } from "react";
import styles from "./Todo.module.css";

export function Todo() {
  const checkboxId = useId();

  return (
    <div className={styles["c-task"]}>
      <div className={styles["c-checkbox"]}>
        <input 
          className={styles["c-checkbox__input"]}
          type="checkbox"
          name="taskCheckbox"
          id={checkboxId}
        />
        <label 
          className={styles["c-checkbox__label"]}
          htmlFor={checkboxId}
        >
          <svg
            className={styles["c-checkbox__icon"]}
            viewBox="0 0 100 100"
          >
            <path 
              className={styles["c-checkbox__icon__checkbox-faded"]}
              d="M81.5,88.5h-64c-3.9,0-7-3.1-7-7v-64c0-3.9,3.1-7,7-7h64c3.9,0,7,3.1,7,7v64C88.5,85.4,85.4,88.5,81.5,88.5z"
            />
            <path 
              className={styles["c-checkbox__icon__checkbox"]}
              d="M81.5,88.5h-64c-3.9,0-7-3.1-7-7v-64c0-3.9,3.1-7,7-7h64c3.9,0,7,3.1,7,7v64C88.5,85.4,85.4,88.5,81.5,88.5z"
            />
            <polyline 
              className={styles["c-checkbox__icon__checkmark"]}
              points="29,47.3 50,68.3 71,31.7"
              strokeWidth={9}
            />
          </svg>
        </label>
      </div>

      <h2 className={styles["c-task__title"]}>
        Task title
      </h2>

      <div className={styles["c-task__actions"]}>
        <button
          className={styles["c-task__actions__delete-btn"]}
          title="Deletar tarefa"
          disabled={false}
        >
          <Trash 
            className={styles["c-task__actions__delete-btn__icon"]}
            size={24}
          />
        </button>
      </div>
    </div>
  );
}
