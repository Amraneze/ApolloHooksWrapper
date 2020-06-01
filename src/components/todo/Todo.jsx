import React from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";

const REMOVE_TODO = gql`
  mutation RemoveTodo($id: ID!) {
    removeTodo(id: $id) @client
  }
`;

const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: ID!) {
    toggleTodo(id: $id) @client
  }
`;

export default function Todo(props) {
  const { id, text, isCompleted } = props;

  const [toggleTodo] = useMutation(TOGGLE_TODO, {
    variables: {
      id
    }
  });

  const [removeTodo] = useMutation(REMOVE_TODO, {
    variables: {
      id
    }
  });
  return (
    <TodoContainer key={id}>
      <p
        style={{
          textDecoration: isCompleted ? "line-through" : "none"
        }}
      >
        {text}
      </p>
      <div>
        <TodoButton onClick={() => toggleTodo()}>Complete</TodoButton>
        <TodoButton danger onClick={() => removeTodo()}>
          Delete
        </TodoButton>
      </div>
    </TodoContainer>
  );
}

const TodoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: auto;
  margin-top: 2rem;
  font-size: 1.3rem;
  border-radius: 4px;
  padding: 5px;
  & p {
    margin-right: 1rem;
  }
`;

const TodoButton = styled.button`
  background: ${props => (props.danger ? "#f90404" : "#5cc623")};
  padding: 1.2rem 1rem;
  border-radius: 4px;
  color: white;
`;
