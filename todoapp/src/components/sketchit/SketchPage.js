import React, { Component } from 'react'
import Floor from "./assets/wl1.svg";
import AddShape from './AddShape';
import $ from "jquery";
import Shapes from './Shapes';
import UpdateShape from './UpdateShape';

class SketchPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            customShapesMap: [
                {
                    id: 0,
                    shape: <circle cx='120' cy='500' r='20' className='customShape' onClick={() => { this.handleShapeOnClick(0) }} key={0}/>
                },
                {
                    id: 1,
                    shape: <circle cx='600' cy='200' r='50' className='customShape' onClick={() => { this.handleShapeOnClick(1) }} key={1}/>
                },
                {
                    id: 2,
                    shape: <rect x='0' y='0' width='100' height='200' className='customShape' onClick={() => { this.handleShapeOnClick(2) }} key={2}/>
                },
            ],

            selectedShapeMap: {id: null, shape: null},

            imgWidth: null,
            imgHeight: null,
            svgWidth: null,
            svgHeight: null,

            zoomFactor: 1,
        }
    }

    /// README: UPDATE SHAPE ON CLICK
    handleShapeOnClick = (selectedId) => {
        const filterShapesMap = this.state.customShapesMap.filter(customShapeMap => {
            return customShapeMap.id === selectedId
        });

        console.log(filterShapesMap[0])
        this.setState({
            selectedShapeMap: filterShapesMap[0]
        })

        $("#updateShapeModal").modal("show");
    }

    handleUpdateShape = (id, sda, ind) => {
        /// generate shape
        const svgSquareShape = <rect x={sda[0]} y={sda[1]} width={sda[2]} height={sda[2]} className="customShape" onClick={() => { this.handleShapeOnClick(id) }} key={id} />;
        const svgCircleShape = <circle cx={sda[0]} cy={sda[1]} r={sda[2]} className="customShape" onClick={() => { this.handleShapeOnClick(id) }} key={id} />;
        const svgRectShape = <rect x={sda[0]} y={sda[1]} width={sda[2]} height={sda[3]} className="customShape" onClick={() => { this.handleShapeOnClick(id) }} key={id} />;

        /// create new map
        const svgShape = ind === 0 ? svgRectShape : ind === 1 ? svgCircleShape : svgSquareShape
        const customShapeMap = {id: id, shape: svgShape}

        /// deleting old map
        const customShapesMap = this.state.customShapesMap.filter(customShapeMap => {
            return customShapeMap.id !== id
        });

        /// add map in list of maps
        let newCustomShapesMap = [...customShapesMap, customShapeMap];
        this.setState({
            customShapesMap: newCustomShapesMap,
        });

        $("#updateShapeModal").modal("hide");
    }

    /// README: ADD NEW SHAPE
    handleAddShape = (sda, ind) => {
        /// generate shape id
        const id = Math.random();
        
        /// generate shape
        const svgSquareShape = <rect x={sda[0]} y={sda[1]} width={sda[2]} height={sda[2]} className="customShape" onClick={() => { this.handleShapeOnClick(id) }} key={id} />;
        const svgCircleShape = <circle cx={sda[0]} cy={sda[1]} r={sda[2]} className="customShape" onClick={() => { this.handleShapeOnClick(id) }} key={id} />;
        const svgRectShape = <rect x={sda[0]} y={sda[1]} width={sda[2]} height={sda[3]} className="customShape" onClick={() => { this.handleShapeOnClick(id) }} key={id} />;

        /// create new map
        const svgShape = ind === 0 ? svgRectShape : ind === 1 ? svgCircleShape : svgSquareShape
        const customShapeMap = {id: id, shape: svgShape}

        /// add map in list of maps
        let customShapesMap = [...this.state.customShapesMap, customShapeMap];
        this.setState({
            customShapesMap: customShapesMap,
        });

        $("#addShapeModal").modal("hide");
    }

    onImgLoad = ({ target: img }) => {
        this.setState({
            imgWidth: img.width,
            imgHeight: img.height,
            svgWidth: img.width,
            svgHeight: img.height,
        })

        console.log(img.width)
    }

    render() {
        return (
            <div className="my-2 mx-5">
                <div className="text-center">
                    <button type="button" className="btn btn-outline-dark" data-toggle="modal" data-target="#addShapeModal">+ Add a shape</button>
                </div>

                {/* CANVAS */}
                <div className="sketch-container text-center">
                    <div className="sketch-box">
                        <img className="sketch-img" src={Floor} alt="React Logo" onLoad={this.onImgLoad} width={this.state.imgWidth} height={this.state.imgHeight} />
                    </div>
                    <div className="sketch-box sketch-stack-top">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={this.state.svgWidth}
                            height={this.state.svgHeight}
                        >
                            <Shapes customShapesMap={this.state.customShapesMap} handleUpdateShapes={this.handleUpdateShapes}/>
                        </svg>
                    </div>
                </div>

                {/* ADD MODAL */}
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
                                <AddShape handleAddShape={this.handleAddShape} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* UPDATE MODAL */}
                <div className="modal fade" id="updateShapeModal" tabIndex="-1" role="dialog" aria-labelledby="updateShapeModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="updateShapeModalLabel">Update this shape</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <UpdateShape handleUpdateShape={this.handleUpdateShape} selectedShapeMap={this.state.selectedShapeMap}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SketchPage;