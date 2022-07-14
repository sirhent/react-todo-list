import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { ClipboardText } from "phosphor-react";
import { Button } from "./components/Button";
import { LineDivider } from "./components/LineDivider";
import { Todo } from "./components/Todo";

import "./global.css";
import styles from "./App.module.css";

import todoLogo from "./assets/images/brand/Todo-Logo.svg";

export type TodoType = {
  id: string,
  title: string,
  completed: boolean
}

function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [todosCount, setTodosCount] = useState(0);
  const [newTodoText, setNewTodoText] = useState("");

  function handleCreateNewTodo(event: FormEvent) {
    event.preventDefault();

    setTodos([...todos, { id: uuidv4(), title: newTodoText, completed: false}]);
    setTodosCount((state) => state + 1);
    setNewTodoText("");
  }

  function handleNewTodoTextChange(event: ChangeEvent<HTMLInputElement>): void {
    event.target.setCustomValidity("");
    setNewTodoText(event.target.value);
  }

  function handleNewTodoTextInvalid(event: InvalidEvent<HTMLInputElement>): void {
    event.target.setCustomValidity("Insira um título para a tarefa.");
  }

  function handleDeleteTodo(todoToBeDeletedById: string): void {
    const todoListWithoutDeletedTodo = todos.filter((todo) => {
      if (todo.id === todoToBeDeletedById) {
        return false;
      } else {
        return true;
      }
    });

    setTodos(todoListWithoutDeletedTodo);
    setTodosCount((state) => state - 1);
  }

  function handleTodoCompletion(todoId: string, isCompleted: boolean): void {
    const todoListWithUpdatedTodo = todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          id: todo.id,
          title: todo.title,
          completed: isCompleted
        }
      } else {
        return todo;
      }
    });

    setTodos(todoListWithUpdatedTodo);
  }

  function updateCompletedTodosCount(): string {
    let completedCount = todos.reduce((prevValue: number, curValue) => {
      return prevValue + Number(curValue.completed);
    }, 0);

    return String(completedCount);
  }

  const isTodoListEmpty = todos.length === 0;

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
        <form 
            className={styles["c-task-form"]}
            onSubmit={handleCreateNewTodo}
          >
          <div className={styles["c-task-form__group"]}>
            <input
              className={styles["c-task-form__group__input"]}
              type="text"
              id="taskName"
              name="taskName"
              placeholder="Adicione uma nova tarefa"
              value={newTodoText}
              onChange={handleNewTodoTextChange}
              onInvalid={handleNewTodoTextInvalid}
              required
            />
            <label 
              className={styles["c-task-form__group__label"]}
              htmlFor="taskName"
            >
              Adicione uma nova tarefa
            </label>
          </div>
          <Button 
            iconName="Plus"
            btnText="CRIAR"
            btnTitle="Criar nova tarefa"
            btnType="submit"
          />
        </form>

        <section className={styles["o-task-list-content"]}>
          <div className={styles["c-tasks-info"]}>
            <h1 className={styles["c-tasks-info__tasks-created"]}>
              Tarefas criadas
              <span className={styles["c-tasks-count"]}>
                {todosCount}
              </span>
            </h1>

            <strong className={styles["c-tasks-info__tasks-concluded"]}>
              Concluídas
              <span className={styles["c-tasks-count"]}>
                {updateCompletedTodosCount()} / {todosCount}
              </span>
            </strong>
          </div>

          <LineDivider />

          {isTodoListEmpty ? (
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
          ) : (
            <div className={styles["o-tasks-container"]}>
              {todos.map(todo => {
                return (
                  <Todo 
                    key={todo.id}
                    todoItem={todo} 
                    onDeleteTodo={handleDeleteTodo}
                    onTodoCompleted={handleTodoCompletion}
                  />
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
