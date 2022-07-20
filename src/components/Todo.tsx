import { FloppyDisk, Pencil, Trash } from "phosphor-react";
import { ChangeEvent, useEffect, useId, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

import { TodoType } from "../App";

import styles from "./Todo.module.scss";

interface TodoProps {
  todoItem: TodoType;
  onDeletedTodo: (todoId: string) => void;
  onTodoCompleted: (todoId: string, isCompleted: boolean) => void;
  onTodoEdited: (todoId: string, newTodoText: string) => void;
}

export function Todo(props: TodoProps) {
  const checkboxId = useId();
  const [isTodoCompleted, setIsTodoCompleted] = useState(false);
  const [isTodoBeingEdited, setIsTodoBeingEdited] = useState(false);
  const [editingText, setEditingText] = useState(props.todoItem.title);

  function handleTodoCompletion() {
    if (isTodoCompleted) {
      setIsTodoCompleted((state) => !state);
    } else {
      setIsTodoCompleted((state) => !state);
    }
  }

  useEffect(() => {
    props.onTodoCompleted(props.todoItem.id, isTodoCompleted);
  }, [isTodoCompleted]);

  function handleTodoTextChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setEditingText(event.target.value);
  }

  function handleTodoEditState() {
    if (isTodoBeingEdited) {
      setIsTodoBeingEdited((prevState) => !prevState);
    } else {
      setIsTodoBeingEdited((prevState) => !prevState);
    }
  }

  useEffect(() => {
    props.onTodoEdited(props.todoItem.id, editingText);
  }, [isTodoBeingEdited]);

  return (
    <div className={styles["c-task"]}>
      <div className={styles["c-checkbox"]}>
        <input 
          className={styles["c-checkbox__input"]}
          type="checkbox"
          name="taskCheckbox"
          id={checkboxId}
          onChange={handleTodoCompletion}
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

      {isTodoBeingEdited ? (
        <TextareaAutosize 
          className={styles["c-task__edit-area"]}
          value={editingText}
          onChange={handleTodoTextChange}
        />
      ) : (
        <h2 className={styles["c-task__title"]}>
          {editingText}
        </h2>
      )} 

      <div className={styles["c-task__actions"]}>
        {isTodoBeingEdited ? (
          <button 
            className={styles["c-task__actions__save-btn"]}
            title="Salvar alterações"
            onClick={handleTodoEditState}
          >
            <FloppyDisk 
              className={styles["c-task__actions__save-btn__icon"]}
            />
          </button>
        ) : (
          <button 
            className={styles["c-task__actions__edit-btn"]}
            title="Editar tarefa"
            onClick={handleTodoEditState}
          >
            <Pencil 
              className={styles["c-task__actions__edit-btn__icon"]}
            />
          </button>
        )}

        <button
          className={styles["c-task__actions__delete-btn"]}
          title="Deletar tarefa"
          disabled={false}
          onClick={() => props.onDeletedTodo(props.todoItem.id)}
        >
          <Trash 
            className={styles["c-task__actions__delete-btn__icon"]}
            // size={24}
          />
        </button>
      </div>
    </div>
  );
}
