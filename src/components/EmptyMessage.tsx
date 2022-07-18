import { ClipboardText } from "phosphor-react";

import styles from "./EmptyMessage.module.scss";

export function EmptyMessage() {
  return (
    <div className={styles["c-empty-tasklist"]}>
      <ClipboardText
        className={styles["c-empty-tasklist__icon"]}
        weight="thin"
        size={64}
      />
      <div className={styles["c-empty-tasklist__content"]}>
        <h2 className={styles["c-empty-tasklist__content__title"]}>
          Você ainda não tem tarefas cadastradas.
        </h2>
        <p className={styles["c-empty-tasklist__content__paragraph"]}>
          Crie tarefas e organize seus itens a fazer.
        </p>
      </div>
    </div>
  );
}
