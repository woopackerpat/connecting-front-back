import axios from "axios";

export const getAllTodo = () => {
  return axios.get("/todos").then((res) => res.data.todos);
};

export const createNewTodo = (title) => {
  return axios.post("/todos", { title, completed: false }).then((res) => {
    return res.data.todo;
  });
};
