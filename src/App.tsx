import { ChangeEvent, FormEvent, InvalidEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Button } from "./components/Button";
import { LineDivider } from "./components/LineDivider";
import { Todo } from "./components/Todo";
import { EmptyMessage } from "./components/EmptyMessage";
import { ThemeSwitch } from "./components/ThemeSwitch";

import "./global.scss";
import styles from "./App.module.scss";

import todoLogo from "./assets/images/brand/Todo-Logo.svg";

export type TodoType = {
  id: string,
  title: string,
  completed: boolean
}

type ThemeMode = "dark" | "light";

function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [todosCount, setTodosCount] = useState(0);
  const [newTodoText, setNewTodoText] = useState("");
  const [themeMode, setThemeMode] = useState<ThemeMode>("dark");

  // Load todos from local storage
  useEffect(() => {
    const todosAsJson = localStorage.getItem("todoList");
    const loadedTodos: TodoType[] = JSON.parse(todosAsJson as string);

    if (loadedTodos?.length) {
      const tempTodosCount = loadedTodos.length;

      setTodos(loadedTodos);
      setTodosCount(tempTodosCount);
      // setTodosCount((prevState) => { 
      //   return prevState + tempTodosCount;
      // });
      console.log("hello");
    }
  }, []);

  // Save todos on local storage
  useEffect(() => {
    const todosAsJson = JSON.stringify(todos);
    localStorage.setItem("todoList", todosAsJson);
  }, [todos]);

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

  function handleTodoEdit(todoId: string, newTodoText: string) {
    const todoListWithUpdatedTodo = todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          id: todo.id,
          title: newTodoText,
          completed: todo.completed
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

  function handleThemeToggle(isSwitched: boolean): void {
    if (isSwitched) {
      setThemeMode("light");
    } else {
      setThemeMode("dark");
    }
  }

  const isTodoListEmpty = todos.length === 0;

  const lightThemeClasses = `${styles["c-app-background"]} t-light-theme`;
  const darkThemeClasses = styles["c-app-background"];

  return (
    <div className={themeMode === "dark" ? darkThemeClasses : lightThemeClasses}>
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

          <ThemeSwitch
            onThemeToggled={handleThemeToggle}
          />
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
              <EmptyMessage />
            ) : (
              <div className={styles["o-tasks-container"]}>
                {todos.map(todo => {
                  return (
                    <Todo
                      key={todo.id}
                      todoItem={todo}
                      onDeletedTodo={handleDeleteTodo}
                      onTodoCompleted={handleTodoCompletion}
                      onTodoEdited={handleTodoEdit}
                    />
                  );
                })}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
