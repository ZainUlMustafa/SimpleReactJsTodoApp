import React, { Component } from 'react'

class MergeShapes extends Component {

    constructor(props) {
        super(props)

        this.state = {
            customShapesMap: this.props.customShapesMap,
            values: "",
        }
    }

    handleDataChange = (e) => {
        this.setState({
            values: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.handleMergeShape(this.state.values)
        // console.log(this.state.values)
    }

    render() {
        const colorList = ["orange", "teal", "red", "green"]
        const shapeNameList = ["Rectangle", "Circle", "Square", "Group"]

        const shapeList = this.props.customShapesMap.length ? (
            this.props.customShapesMap.map(eachShape => {
                const shapeInd = (
                    <svg width={20} height={20}>
                        <circle cx={5} cy={5} r={10} fill={colorList[eachShape.shapeInd]} />
                    </svg>
                )

                return (
                    <p key={eachShape.id}>
                        {shapeInd} {shapeNameList[eachShape.shapeInd]}: {eachShape.id}
                    </p>
                );
            })
        ) : (
                <></>
            )

        return (
            <div className="container">
                <b>Shape type: id</b>
                <hr></hr>
                {shapeList}
                <hr></hr>
                <form>
                    <div className="form-group">
                        <label htmlFor="contentInput">Add id(s) as comma-separated values</label>
                        <input type="text" onChange={this.handleDataChange} className="form-control form-control-sm" id="contentInput" aria-describedby="contentHelp" value={this.state.values} />
                    </div>
                    <hr></hr>
                    <div className="btn-toolbar " role="toolbar">
                        <button className="btn btn-primary btn-sm m-1" onClick={this.handleSubmit}>Merge selected shapes</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default MergeShapes;