import { gql } from "@apollo/client";

const typeDefs = gql`
  type Todo {
    id: ID!
    text: String!
    isCompleted: Boolean
  }
  type Mutation {
    addTodo(text: String!): Todo
    toggleTodo(id: ID!): Todo
    removeTodo(id: ID!): Todo
  }
  type Query {
    todos: [Todo]
  }
`;

export default typeDefs;
