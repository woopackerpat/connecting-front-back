import { createContext, useState, useEffect } from "react";
import { getAllTodo, createNewTodo } from "../api/todo";
import axios from "../components/config/axios";

const TodoContext = createContext();

function TodoContextProvider(props) {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const todos = getAllTodo();
    todos
      .then((result) => {
        setTodoList(result);
      })
      .catch((err) => {
        console.log(err);
      });
    // setTodoList(todos)
  }, []);

  const createTodo = (title) => {
    const todo = createNewTodo(title);
    todo
      .then((newTodo) => {
        const newTodoList = [newTodo, ...todoList];
        setTodoList(newTodoList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeTodo = (id) => {
    axios
      .delete(`/todos/${id}`)
      .then(() => {
        const idx = todoList.findIndex((el) => el.id === id);
        if (idx !== -1) {
          const clonedTodoList = [...todoList];
          clonedTodoList.splice(idx, 1);
          setTodoList(clonedTodoList);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateTodo = (newValue, id) => {
    axios
      .put("/todos/" + id, newValue)
      .then(() => {
        const idx = todoList.findIndex((el) => el.id === id);
        if (idx !== -1) {
          const clonedTodoList = [...todoList];
          clonedTodoList[idx] = { ...clonedTodoList[idx], ...newValue };
          setTodoList(clonedTodoList);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <TodoContext.Provider
      value={{ todoList, createTodo, removeTodo, updateTodo }}
    >
      {props.children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoContextProvider };
