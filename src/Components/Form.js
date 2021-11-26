import React, { useContext, useRef, useState } from "react";

export const Form = ({ HOST_API, Store }) => {
  const formRef = useRef(null);
  const {
    dispatch,
    state: { item },
  } = useContext(Store);
  const [state, setState] = useState(item);

  const onAdd = (event) => {
    event.preventDefault();

    const request = {
      name: state.name,
      id: null,
      isCompleted: false,
    };

    fetch(HOST_API + "/todo", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((todo) => {
        dispatch({ type: "add-item", item: todo });
        setState({ name: "" });
        formRef.current.reset();
      });
  };

  const onEdit = (event) => {
    event.preventDefault();
    const request = {
      name: state.name,
      id: item.id,
      isCompleted: item.isCompleted,
    };

    fetch(HOST_API + "/todo", {
      method: "PUT",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((todo) => {
        dispatch({ type: "update-item", item: todo });
        setState({ name: "" });
        formRef.current.reset();
      });
  };

  return (
    <form ref={formRef}>
      <div className="mb-3">
        <h1 className="form-label">INGRESAR TAREAS</h1>
        <input
          className="form-control"
          type="text"
          name="name"
          defaultValue={item.name}
          onChange={(event) => {
            setState({ ...state, name: event.target.value });
          }}
        ></input>
        {item.id && (
          <button onClick={onEdit} className="btn btn-warning">
            Actualizar
          </button>
        )}
        {!item.id && (
          <button type="button" onClick={onAdd} className="btn btn-success">
            Agregar
          </button>
        )}
      </div>
    </form>
  );
};
