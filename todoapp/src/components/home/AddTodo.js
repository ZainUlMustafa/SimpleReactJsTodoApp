import React from "react";

class AddTodo extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            content: "",
            status: 0,
            statusIndColor: "orange"
        }
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

    handleSubmit = (e) => {
        e.preventDefault();
        const todo = {content: this.state.content, status: this.state.status};
        this.props.handleAddTodo(todo);
    }

    render() {
        const statusInd = (
            <svg width={10} height={10}>
                <circle cx={5} cy={5} r={5} fill={this.state.statusIndColor} />
            </svg>
        )

        return (
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
                        <button className="btn btn-primary btn-sm m-1" onClick={this.handleSubmit}>Add this todo</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddTodo;