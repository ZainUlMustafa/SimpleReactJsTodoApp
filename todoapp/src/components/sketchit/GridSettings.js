import React, { Component } from 'react'

class GridSettings extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            grideSize: this.props.grideSize
        }
    }

    handleDataChange = (e) => {
        this.setState({
            grideSize: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.handleGridSizeChange(this.state.grideSize)
    }
    

    render() {
        return (
            <div>
                <form>
                    <div className="form-group">
                        <label htmlFor="contentInput">Grid square size</label>
                        <input type="text" onChange={this.handleDataChange} className="form-control form-control-sm" id="contentInput" aria-describedby="contentHelp" value={this.state.gridSize} />
                    </div>
                    <hr></hr>
                    <div className="btn-toolbar " role="toolbar">
                        <button className="btn btn-primary btn-sm m-1" onClick={this.handleSubmit}>Adjust</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default GridSettings;