import React from "react";
import { gql } from "@apollo/client";
import styled from "styled-components";

import { Todo, QueryWrapper } from "../";

const GET_TODO_LIST = gql`
  query GetTodoList {
    todos @client {
      id
      text
      isCompleted
    }
  }
`;

export default function TodoList(props) {
  return (
    <TodoListContainer>
      <QueryWrapper query={GET_TODO_LIST}>
        {({ data: { todos } }) => {
          return todos.map(todo => {
            const { id } = todo;
            return <Todo key={id} {...todo} />;
          });
        }}
      </QueryWrapper>
    </TodoListContainer>
  );
}

const TodoListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  height: auto;
`;

export { GET_TODO_LIST };
