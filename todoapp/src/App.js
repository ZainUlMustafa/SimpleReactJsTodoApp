import React from 'react';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import $ from "jquery";

/* 
ACKNOWLEDGEMENT: Followed The Net Ninja tutorial to do this 

The Net Ninja features:
1. Creating todo form
2. Adding new todo
3. Listing todos
4. Deletion

My added features:
1. Due time selection
2. Update operation added
3. Modern looking design

*/

class App extends React.Component {
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
    let todo = {id: id, content: content, status: status};

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
    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "rgba(125, 46, 104, 0.01)" }}>
          <a className="navbar-brand" href="/">
            <span className="d-inline-block align-top icon icon-warehouse"></span>
            {"  "}Waretodo
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon small" />
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">

            </ul>
            <span className="navbar-text">
              <button type="button" className="btn btn-light" data-toggle="modal" data-target="#addTodoModal">+ Add a todo</button>
            </span>

          </div>
        </nav>
        <div className="container-fluid p-3">
          <h3 className="text-center p-3">All todos</h3>
          <Todos todos={this.state.todos} handleUpdateTodo={this.handleUpdateTodo} handleDeletion={this.handleDeletion}/>
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
                <AddTodo handleAddTodo={this.handleAddTodo}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
