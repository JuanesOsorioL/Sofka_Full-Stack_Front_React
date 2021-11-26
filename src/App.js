import React, { useReducer, createContext } from "react";

import { Form } from "./Components/Form";
import { List } from "./Components/Lista";

const HOST_API = "http://localhost:8080/api";

const initialState = {
  list: [],
  item: {},
};

const Store = createContext(initialState);

function reducer(state, action) {
  switch (action.type) {
    case "update-item":
      const listUpdateEdit = state.list.map((item) => {
        if (item.id === action.item.id) {
          return action.item;
        }
        return item;
      });
      return { ...state, list: listUpdateEdit, item: {} };
    case "delete-item":
      const listUpdate = state.list.filter((item) => {
        return item.id !== action.id;
      });
      return { ...state, list: listUpdate };
    case "update-list":
      return { ...state, list: action.list };
    case "edit-item":
      return { ...state, item: action.item };
    case "add-item":
      const newList = state.list;
      newList.push(action.item);
      return { ...state, list: newList };
    default:
      return state;
  }
}

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};

function App() {
  return (
    <StoreProvider>
      <Form HOST_API={HOST_API} Store={Store} />
      <List HOST_API={HOST_API} Store={Store} />
    </StoreProvider>
  );
}
export default App;
