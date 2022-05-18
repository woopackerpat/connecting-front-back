import axios from "axios";

export const getAllTodo = () => {
  return axios.get("/todos").then((res) => res.data.todos);
};
