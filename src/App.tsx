import { ClipboardText, Plus, Trash } from "phosphor-react";
import { Button } from "./components/Button";
import { LineDivider } from "./components/LineDivider";
import { Todo } from "./components/Todo";

import "./global.css";
import styles from "./App.module.css";

import todoLogo from "./assets/images/brand/Todo-Logo.svg";

function App() {
  return (
    <div className={styles["o-board-container"]}>
      <header className={styles["c-board-header"]}>
        <div className={styles["c-board-header__logo-box"]}>
          <img
            className={styles["c-board-header__logo-box__logo"]}
            src={todoLogo}
            alt="Todo list logo"
            title="Todo list logo"
          />
        </div>
      </header>

      <main className={styles["c-board-layout"]}>
        <form className={styles["c-task-form"]}>
          <div className={styles["c-task-form__group"]}>
            <input
              className={styles["c-task-form__group__input"]}
              type="text"
              id="taskName"
              name="taskName"
              placeholder="Adicione uma nova tarefa"
            />
            <label 
              className={styles["c-task-form__group__label"]}
              htmlFor="taskName"
            >
              Adicione uma nova tarefa
            </label>
          </div>
          <Button />
        </form>

        <section className={styles["o-task-list-content"]}>
          <div className={styles["c-tasks-info"]}>
            <h1 className={styles["c-tasks-info__tasks-created"]}>
              Tarefas criadas
              <span className={styles["c-tasks-count"]}>0</span>
            </h1>

            <strong className={styles["c-tasks-info__tasks-concluded"]}>
              Concluídas
              <span className={styles["c-tasks-count"]}>
                0
              </span>
            </strong>
          </div>

          <LineDivider />

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

          <div className={styles["o-tasks-container"]}>
            <Todo />
            <Todo />
            <Todo />
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
