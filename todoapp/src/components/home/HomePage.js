import React from "react";
import $ from "jquery";
import Todos from "./Todos";
import AddTodo from "./AddTodo";

class HomePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            todos: [
                { id: 1, content: "Design svg", status: 0 },
                { id: 2, content: "Integrate stuff", status: 1 },
            ]
        }
    }

    handleUpdateTodo = (id, content, status) => {
        let todo = { id: id, content: content, status: status };

        const todos = this.state.todos.filter(todo => {
            return todo.id !== id
        });

        let newTodos = [...todos, todo];
        this.setState({
            todos: newTodos,
        })
        console.log(todo);
    }

    handleAddTodo = (todo) => {
        todo.id = Math.random();
        let todos = [...this.state.todos, todo];
        this.setState({
            todos: todos,
        });

        $("#addTodoModal").modal("hide");
    }

    handleDeletion = (id) => {
        const todos = this.state.todos.filter(todo => {
            return todo.id !== id
        });
        this.setState({
            todos: todos
        })

        console.log("delete => " + id);
    }

    render() {
        console.log("home render")
        return (
            <div>
                <div className="container-fluid p-3">
                    <div className="text-center">
                        <button type="button" className="btn btn-outline-dark" data-toggle="modal" data-target="#addTodoModal">+ Add a todo</button>
                    </div>
                    <Todos todos={this.state.todos} handleUpdateTodo={this.handleUpdateTodo} handleDeletion={this.handleDeletion} />
                </div>

                <div className="modal fade" id="addTodoModal" tabIndex="-1" role="dialog" aria-labelledby="addTodoModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addTodoModalLabel">Add new todo</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <AddTodo handleAddTodo={this.handleAddTodo} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default HomePage;