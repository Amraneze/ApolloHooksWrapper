import React from "react";
import { gql } from "@apollo/client";
import styled from "styled-components";
import { MutationWrapper } from "../";

const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) @client {
      id
    }
  }
`;

export default function TodoForm(props) {
  const [input, setInput] = React.useState();
  const [addTodo, updateAddTodo] = React.useState(() => {});

  return (
    <TodoFormContainer>
      <h1>Todos</h1>
      <MutationWrapper mutation={ADD_TODO} onUpdate={updateAddTodo} />
      <StyledForm
        onSubmit={e => {
          e.preventDefault();
          addTodo({ variables: { text: input } });
          input.value = "";
        }}
      >
        <input onChange={e => setInput(e.target.value)} />
        <button>Add</button>
      </StyledForm>
    </TodoFormContainer>
  );
}

const TodoFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & h1 {
    font-size: 5rem;
  }
  & input {
    border: 1px solid rebeccapurple;
    font-size: 1.3rem;
    border-radius: 4px;
    padding: 1rem;
  }
  & button {
    padding: 1.3rem;
    background: rebeccapurple;
    color: white;
    border-radius: 4px;

    &:hover {
      cursor: pointer;
    }
  }
`;

const StyledForm = styled.form`
  display: flex;
`;
