import { gql } from "@apollo/client";

let nextTodoId = 0;

const query = gql`
  query GetTodos {
    todos @client {
      id
      text
      isCompleted
    }
  }
`;

export default {
  Mutation: {
    addTodo: (obj, { text }, { cache }) => {
      const previousState = cache.readQuery({ query });

      const newTodo = {
        __typename: "TodoItem",
        id: nextTodoId++,
        text,
        isCompleted: false
      };

      const data = {
        todos: previousState.todos.concat([newTodo])
      };

      cache.writeData({ data });
      return newTodo;
    },
    removeTodo: (obj, { id }, { cache }) => {
      const currentTodos = cache.readQuery({ query });

      const removedTodoArr = currentTodos.todos.filter(todo => {
        return todo.id !== id;
      });

      const data = {
        todos: removedTodoArr
      };

      cache.writeData({ data });

      return null;
    },
    toggleTodo: (obj, { id: todoId }, { cache }) => {
      const id = `TodoItem:${todoId}`;

      const fragment = gql`
        fragment completeTodo on TodoItem {
          isCompleted
        }
      `;

      const todo = cache.readFragment({ fragment, id });

      const data = { ...todo, isCompleted: !todo.isCompleted };

      cache.writeData({ id, data });

      return null;
    }
  }
};
