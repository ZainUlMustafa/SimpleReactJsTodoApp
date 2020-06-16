import React, { Component } from 'react'

class UnmergeShapes extends Component {

    constructor(props) {
        super(props)

        this.state = {
            customShapesMap: this.props.customShapesMap,
            simpleCustomShapesMap: this.props.simpleCustomShapesMap,
        }
    }

    handleSubmit = (e, customShape) => {
        e.preventDefault()
        const simpleShape = this.props.simpleCustomShapesMap.filter(simpleShapeMap => {
            return simpleShapeMap.id === customShape.id
        })[0];

        this.props.handleUnmergeShape(customShape, simpleShape)
    }


    render() {
        const colorList = ["orange", "teal", "red", "black"]
        const shapeNameList = ["Rectangle", "Circle", "Square", "Group"]

        const shapeList = this.props.customShapesMap.length ? (
            this.props.customShapesMap.map(eachShape => {
                if (eachShape.shapeInd === 3) {
                    const shapeInd = (
                        <svg width={20} height={20}>
                            <circle cx={5} cy={5} r={10} fill={colorList[eachShape.shapeInd]} />
                        </svg>
                    )

                    return (
                        <button className="btn btn-light btn-sm" key={eachShape.id} onClick={(e) => {this.handleSubmit(e, eachShape)}}>
                            {shapeInd} {shapeNameList[eachShape.shapeInd]}: {eachShape.id}
                        </button>
                    );
                } else {
                    return <div key={eachShape.id}></div>
                }
            })
        ) : (
                <></>
            )

        return (
            <div className="container">
                <b>Merged shape: id</b>
                <hr></hr>
                {shapeList}
            </div>
        )
    }
}

export default UnmergeShapes;