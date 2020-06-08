import React from "react";
import TodoEdit from "./TodoEdit";

const Todos = ({ todos, handleUpdateTodo, handleDeletion }) => {

    const todoList = todos.length ? (
        todos.map(todo => {

            const todoEdit = (
                <div>
                    <hr></hr>
                    <TodoEdit todo={todo} handleUpdateTodo={handleUpdateTodo} />
                </div>
            )

            const pillStatus = todo.status === 0 ?
                (<span className="badge badge-pill badge-warning ml-3">due soon</span>) :
                todo.status === 1 ?
                    (<span className="badge badge-pill badge-info ml-3">completed</span>) :
                    (<span className="badge badge-pill badge-danger ml-3">overdue</span>);

            return (
                <div className="card m-3" key={todo.id}>
                    <div className="d-flex justify-content-between">
                        <span className="list-group-item border-0 w-75">
                            {todo.content}
                            {pillStatus}
                            {todoEdit}
                        </span>
                        <button className="btn" onClick={() => { handleDeletion(todo.id) }}>
                            <i className="material-icons material-icons-outlined">delete</i>
                        </button>
                    </div>
                </div>
            );
        })
    ) : (
            <div className="card p-3">
                <div className="valign-center">
                    <span>Congrats, you don't have anything to do</span>
                    <i className="material-icons material-icons-outlined ml-2">done_all</i>
                </div>
            </div>
        );

    console.log(todoList);

    return (
        <div className="container pr-sm-4 pl-sm-4 pr-md-3 pl-md-3">
            {todoList}
        </div>
    );
}

export default Todos;