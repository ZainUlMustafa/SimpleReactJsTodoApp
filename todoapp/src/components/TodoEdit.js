import React from "react";

class TodoEdit extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            toggle: true,
            /// previous state
            prevContent: props.todo.content,
            prevStatusIndColor: props.todo.status === 0 ? "orange" : props.todo.status === 1 ? "teal" : "red",
            prevStatus: props.todo.status,
            /// state to change
            content: props.todo.content,
            statusIndColor: props.todo.status === 0 ? "orange" : props.todo.status === 1 ? "teal" : "red",
            status: props.todo.status,
        }
    }

    handleToggle = () => {
        this.setState({
            toggle: !this.state.toggle,
        });
    }

    handleCancel = () => {
        this.setState({
            toggle: !this.state.toggle,
            content: this.state.prevContent,
            statusIndColor: this.state.prevStatusIndColor,
            status: this.state.prevStatus,
        });
    }

    handleContentChange = (e) => {
        this.setState({
            content: e.target.value
        });

        console.log(e.target.value);
    }

    handleDueTimeSelection = (id) => {
        let color = id === 0 ? "orange" : id === 1 ? "teal" : "red";
        this.setState({
            status: id,
            statusIndColor: color,
        });
        console.log(id);
    }

    handleUpdate = (e) => {
        e.preventDefault();
        this.props.handleUpdateTodo(this.props.todo.id, this.state.content, this.state.status);
        this.setState({
            toggle: !this.state.toggle
        });
    }

    render() {

        const statusInd = (
            <svg width={10} height={10}>
                <circle cx={5} cy={5} r={5} fill={this.state.statusIndColor} />
            </svg>
        )

        const stuff = this.state.toggle ?
            (
                <button className="btn btn-light btn-sm" onClick={this.handleToggle}>
                    <div className="valign-center">
                        <span>View and edit</span>
                        <i className="material-icons material-icons-outlined ml-2">edit</i>
                    </div>
                </button>
            ) : (
                <div className="container">
                    <form>
                        <div className="form-group">
                            <label htmlFor="contentInput">Content</label>
                            <input type="text" onChange={this.handleContentChange} className="form-control form-control-sm" id="contentInput" aria-describedby="contentHelp" value={this.state.content} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dueTimeInput">
                                Due time {statusInd}
                            </label>
                            <div id="dueTimeInput">
                                <span role="button" className="badge badge-pill badge-warning m-1" onClick={() => { this.handleDueTimeSelection(0) }}>due soon</span>
                                <span role="button" className="badge badge-pill badge-info m-1" onClick={() => { this.handleDueTimeSelection(1) }}>completed</span>
                                <span role="button" className="badge badge-pill badge-danger m-1" onClick={() => { this.handleDueTimeSelection(2) }}>overdue</span>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="btn-toolbar " role="toolbar">
                            <button className="btn btn-secondary btn-sm m-1" onClick={this.handleCancel}>Close</button>
                            <button className="btn btn-primary btn-sm m-1" onClick={this.handleUpdate}>Update</button>
                        </div>
                    </form>
                </div>
            );

        return (
            <div>
                {stuff}
            </div>
        )
    }
}

export default TodoEdit;

