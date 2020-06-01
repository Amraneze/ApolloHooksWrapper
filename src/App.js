import React from "react";
import { TodoForm, TodoList } from "./components";

export default function App() {
  return (
    <div className="App">
      <TodoForm />
      <TodoList />
    </div>
  );
}
