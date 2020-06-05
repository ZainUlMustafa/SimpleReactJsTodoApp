import React, { Component } from 'react'
import Floor from "./assets/floor.svg";
import AddShape from './AddShape';
import $ from "jquery";

class SketchPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            customSvgs: [
                <circle cx="20" cy="20" r="20" className="customShape" onClick={() => {this.handleShapeOnClick(0)}} key={0}/>,
                <circle cx="100" cy="20" r="20" className="customShape" onClick={() => {this.handleShapeOnClick(1)}}  key={1}/>,
                <rect x="30" y="50" width="100" height="100" className="customShape" onClick={() => {this.handleShapeOnClick(2)}}  key={2}/>,
            ]
        }
    }

    handleAddShape = (sda, ind) => {
        const id = Math.random();
        const svgSquareShape = <rect x={sda[0]} y={sda[1]} width={sda[2]} height={sda[2]} className="customShape" onClick={() => {this.handleShapeOnClick(id)}} key={id}/>;
        const svgCircleShape = <circle cx={sda[0]} cy={sda[1]} r={sda[2]} className="customShape" onClick={() => {this.handleShapeOnClick(id)}} key={id}/>;
        const svgRectShape = <rect x={sda[0]} y={sda[1]} width={sda[2]} height={sda[3]} className="customShape" onClick={() => {this.handleShapeOnClick(id)}} key={id}/>;

        const svgShape = ind === 0 ? svgRectShape : ind === 1 ? svgCircleShape : svgSquareShape
        let customSvgs = [...this.state.customSvgs, svgShape];
        this.setState({
            customSvgs: customSvgs,
        });

        $("#addShapeModal").modal("hide");
    }

    handleShapeOnClick = (id) => {
        console.log("shape id => " + id);
    }

    render() {
        const { customSvgs } = this.state;

        return (
            <div className="my-2 mx-5">
                <div className="text-center">
                        <button type="button" className="btn btn-outline-dark" data-toggle="modal" data-target="#addShapeModal">+ Add a shape</button>
                </div>

                {/* CANVAS */}
                <div className="sketch-container text-center">
                    <div className="sketch-box">
                        <img className="sketch-img" src={Floor} width="1000" height="1000" alt="React Logo" />
                    </div>
                    <div className="sketch-box sketch-stack-top">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000">
                            {customSvgs}
                        </svg>
                    </div>
                </div>

                {/* MODAL */}
                <div className="modal fade" id="addShapeModal" tabIndex="-1" role="dialog" aria-labelledby="addShapeModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addShapeModalLabel">Add new shape</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <AddShape handleAddShape={this.handleAddShape}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SketchPage;