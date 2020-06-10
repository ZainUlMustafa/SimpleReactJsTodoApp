import React, { Component } from 'react'

class UpdateShape extends Component {

    constructor(props) {
        super(props)

        this.state = {
            shapeId: this.props.selectedShapeMap.id,
            shapeDimension: this.props.selectedShapeMap.shapeDimension,
            shapeInd: this.props.selectedShapeMap.shapeInd,
            shapeIndColor: "orange",
        }
    }

    static getDerivedStateFromProps(newProps, currentState) {
        console.log("Get update derived state", currentState)

        const shapeId = newProps.selectedShapeMap.id;
        const shapeDimension = newProps.selectedShapeMap.shapeDimension;
        const shapeInd = newProps.selectedShapeMap.shapeInd;
        const shapeIndColor = shapeInd === 0 ? "orange" : shapeInd === 1 ? "teal" : "red";
        
        if (shapeId !== currentState.shapeId) {
            return {
                shapeId: shapeId,
                shapeDimension: shapeDimension,
                shapeInd: shapeInd,
                shapeIndColor: shapeIndColor
            };
        } else {
            return null;
        }
    }

    handleDimensionChange = (e) => {
        this.setState({
            shapeDimension: e.target.value
        });

        // console.log(e.target.value);
    }

    handleShapeSelection = (id) => {
        let color = id === 0 ? "orange" : id === 1 ? "teal" : "red";
        this.setState({
            shapeInd: id,
            shapeIndColor: color,
        });
        console.log(this.state.shapeInd);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var sda = this.state.shapeDimension.split(',');
        this.props.handleUpdateShape(this.props.selectedShapeMap.id, sda, this.state.shapeInd);
    }


    render() {
        console.log("Rendering update")
        const shapeInd = (
            <svg width={10} height={10}>
                <circle cx={5} cy={5} r={5} fill={this.state.shapeIndColor} />
            </svg>
        )

        return (
            <div className="container">
                <form>
                    <div className="form-group">
                        <label htmlFor="contentInput">Edit shape dimension {this.props.selectedShapeMap.id}</label>
                        <input type="text" onChange={this.handleDimensionChange} className="form-control form-control-sm" id="contentInput" aria-describedby="contentHelp" value={this.state.shapeDimension} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dueTimeInput">
                            Selected shape {shapeInd}
                        </label>
                        <div id="dueTimeInput">
                            <span role="button" className="badge badge-pill badge-warning m-1" onClick={() => { this.handleShapeSelection(0) }}>Rectangle</span>
                            <span role="button" className="badge badge-pill badge-info m-1" onClick={() => { this.handleShapeSelection(1) }}>Circle</span>
                            <span role="button" className="badge badge-pill badge-danger m-1" onClick={() => { this.handleShapeSelection(2) }}>Square</span>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="btn-toolbar " role="toolbar">
                        <button className="btn btn-primary btn-sm m-1" onClick={this.handleSubmit}>Update this shape</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default UpdateShape;
