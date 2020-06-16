import React, { Component } from 'react'
import { Link } from "react-router-dom";

class AllShapesList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            customShapesMap: this.props.customShapesMap,
        }
    }

    handleSubmit = (e, shapeId) => {
        e.preventDefault()
        this.props.handleDeleteShape(shapeId);
    }

    render() {
        const colorList = ["orange", "teal", "red", "black"]
        const shapeNameList = ["Rectangle", "Circle", "Square", "Group"]

        const shapeList = this.props.customShapesMap.length ? (
            this.props.customShapesMap.map(eachShape => {
                const shapeInd = (
                    <svg width={20} height={20}>
                        <circle cx={5} cy={5} r={10} fill={colorList[eachShape.shapeInd]} />
                    </svg>
                )

                return (
                    <div className="d-flex justify-content-between">
                        <div className="border-0 w-95">
                            <Link to={'/sketchit/' + eachShape.id}>
                                <p key={eachShape.id}>
                                    {shapeInd} {shapeNameList[eachShape.shapeInd]}: {eachShape.id}
                                </p>
                            </Link>
                        </div>
                        <button className="btn btn-sm" onClick={(e) => {this.handleSubmit(e, eachShape.id)}}>
                            <i className="material-icons material-icons-outlined">close</i>
                        </button>
                    </div>
                );
            })
        ) : (
                <p>No shapes added!</p>
            )

        return (
            <div className="container">
                <b>Shape type: id</b>
                <hr></hr>
                {shapeList}
                <hr></hr>
            </div>
        )
    }
}

export default AllShapesList;