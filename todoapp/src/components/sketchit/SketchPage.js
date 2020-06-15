import React, { Component } from 'react'
import Floor from "./assets/wl1.svg";
import AddShape from './AddShape';
import $ from "jquery";
import Shapes from './Shapes';
import UpdateShape from './UpdateShape';
import MergeShapes from './MergeShapes';
import CroppedShapeModal from './CroppedShapeModal';

class SketchPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            customShapesMap: [
                {
                    id: "0",
                    shape: <circle cx='120' cy='500' r='20' className='customShape' onClick={() => { this.handleShapeOnClick("0") }} key={0} />,
                    shapeInd: 1,
                    shapeDimension: [120, 500, 20]         ///cx,cy,r
                },
                {
                    id: "1",
                    shape: <circle cx='600' cy='200' r='50' className='customShape' onClick={() => { this.handleShapeOnClick("1") }} key={1} />,
                    shapeInd: 1,
                    shapeDimension: [600, 200, 50]
                },
                {
                    id: "2",
                    shape: <rect x='0' y='0' width='100' height='200' className='customShape' onClick={() => { this.handleShapeOnClick("2") }} key={2} />,
                    shapeInd: 0,
                    shapeDimension: [0, 0, 100, 200]         ///x,y,w,h
                },
                {
                    // to move a group, add an offset (each x,y) on both the shapes
                    id: "3",
                    shape: <g className='customShape' onClick={() => { this.handleShapeOnClick("3") }} key={3}>
                        <path d="M200 80 L125 240 L275 240 Z" />
                        <rect x='350' y='350' width='100' height='200' />
                    </g>,
                    shapeInd: 3,
                    shapeDimension: []
                },
            ],

            simpleCustomShapesMap: [
                {
                    id: "0",
                    shape: <circle cx='120' cy='500' r='20' />,
                },
                {
                    id: "1",
                    shape: <circle cx='600' cy='200' r='50' />,
                },
                {
                    id: "2",
                    shape: <rect x='0' y='0' width='100' height='200' />
                },
                {
                    id: "3",
                    shape: <g>
                        <path d="M200 80 L125 240 L275 240 Z" />
                        <rect x='350' y='350' width='100' height='200' />
                    </g>,
                },
            ],


            selectedShapeMap: { id: null, shape: null, shapeInd: 0, shapeDimension: "" },

            imgWidth: null,
            imgHeight: null,
            svgWidth: null,
            svgHeight: null,

            zoomFactor: 1,
            gridToggle: true,
        }
    }

    /// README: UPDATE SHAPE ON CLICK
    handleShapeOnClick = (selectedId) => {
        const filterShapesMap = this.state.customShapesMap.filter(customShapeMap => {
            return customShapeMap.id === selectedId
        });

        // console.log(filterShapesMap[0])
        this.setState({
            selectedShapeMap: filterShapesMap[0],
        })

        console.log(this.state.selectedShapeMap)

        $("#updateShapeModal").modal("show");
    }

    handleUpdateShape = (id, sda, ind) => {
        /// generate shape
        const svgSquareShape = <rect x={sda[0]} y={sda[1]} width={sda[2]} height={sda[2]} className="customShape" onClick={() => { this.handleShapeOnClick(id) }} key={id} />;
        const svgCircleShape = <circle cx={sda[0]} cy={sda[1]} r={sda[2]} className="customShape" onClick={() => { this.handleShapeOnClick(id) }} key={id} />;
        const svgRectShape = <rect x={sda[0]} y={sda[1]} width={sda[2]} height={sda[3]} className="customShape" onClick={() => { this.handleShapeOnClick(id) }} key={id} />;

        /// create new map
        const svgShape = ind === 0 ? svgRectShape : ind === 1 ? svgCircleShape : svgSquareShape
        const customShapeMap = { id: id, shape: svgShape, shapeInd: ind, shapeDimension: sda }

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
        const id = Math.ceil(Math.random() * 100000).toString();

        /// generate shape
        const svgSquareShape = <rect x={sda[0]} y={sda[1]} width={sda[2]} height={sda[2]} className="customShape" onClick={() => { this.handleShapeOnClick(id) }} key={id} />;
        const svgCircleShape = <circle cx={sda[0]} cy={sda[1]} r={sda[2]} className="customShape" onClick={() => { this.handleShapeOnClick(id) }} key={id} />;
        const svgRectShape = <rect x={sda[0]} y={sda[1]} width={sda[2]} height={sda[3]} className="customShape" onClick={() => { this.handleShapeOnClick(id) }} key={id} />;

        /// create new map
        const svgShape = ind === 0 ? svgRectShape : ind === 1 ? svgCircleShape : svgSquareShape
        const customShapeMap = { id: id, shape: svgShape, shapeInd: ind, shapeDimension: sda }

        /// add map in list of maps
        let customShapesMap = [...this.state.customShapesMap, customShapeMap];
        this.setState({
            customShapesMap: customShapesMap,
        });

        $("#addShapeModal").modal("hide");
    }

    /// README: GROUP SHAPES
    handleMergeShape = (idList) => {
        /// get id list
        let listOfMergeShapeIds = idList.split(",")
        const listOfAllShapeIds = this.state.customShapesMap.map(eachShape => {
            return eachShape.id;
        })
        console.log(listOfMergeShapeIds, listOfAllShapeIds)

        /// check if ids to be merged exists or not in main list of shapes
        let idExists = this.elementsExists(listOfMergeShapeIds, listOfAllShapeIds)
        if (idExists) {
            /// merge (concat) all ids together with delimiter (",") for later on separation
            let idConcat = listOfMergeShapeIds;
            idConcat = Math.ceil(Math.random() * 100000).toString();

            /// get respective shapes
            const filterShapesMap = this.state.simpleCustomShapesMap.filter(function (eachShape) {
                return listOfMergeShapeIds.includes(eachShape.id);
            })
            console.log(filterShapesMap)

            /// add shapes under group tag
            const shapeList = filterShapesMap.map(eachShape => {
                return eachShape.shape;
            })
            console.log(shapeList)
            const mergeGroup = <g className='customShape' onClick={() => { this.handleShapeOnClick(idConcat) }} key={idConcat}>{shapeList}</g>
            const simpleMergeGroup = <g>{shapeList}</g>
            console.log(mergeGroup);

            /// delete individual shapes from main list
            let customShapesMap = this.state.customShapesMap.filter(function (eachShape) {
                return !listOfMergeShapeIds.includes(eachShape.id);
            })
            let simpleCustomShapesMap = this.state.simpleCustomShapesMap.filter(function (eachShape) {
                return !listOfMergeShapeIds.includes(eachShape.id);
            })

            /// create new merge map
            const mergeInd = 3
            const customMergeMap = { id: idConcat, shape: mergeGroup, shapeInd: mergeInd, shapeDimension: "" }
            const simpleMergeMap = { id: idConcat, shape: simpleMergeGroup }

            /// add merge map in list of maps
            const newCustomShapesMap = [...customShapesMap, customMergeMap];
            const newSimpleCustomShapesMap = [...simpleCustomShapesMap, simpleMergeMap];
            this.setState({
                customShapesMap: newCustomShapesMap,
                simpleCustomShapesMap: newSimpleCustomShapesMap,
            });

        }
    }

    elementsExists = (arr1, arr2) => {
        return arr1.some(item => arr2.includes(item))
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

    toggleGrid = () => {
        this.setState({
            gridToggle: !this.state.gridToggle
        })
    }

    render() {
        console.log("sketch page render")
        const grid = this.state.gridToggle ? (
            <>
                <defs>
                    <pattern id="transformedPattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                        <rect x="0" y="0" width="50" height="50" className="grid-rect" />
                    </pattern>
                </defs>
                <rect x="0" y="0" width="100%" height="100%" className="shapes-svg" />
            </>
        ) : (
            <></>
        )

        return (
            <div className="my-2 mx-2">
                <div className="text-center">
                    <button type="button" className="btn btn-dark btn-sm" data-toggle="modal" data-target="#addShapeModal">+ Add a shape</button>
                    {" "}
                    <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#mergeShapeModal">Merge shapes</button>
                </div>

                <div class="row">
                    <div class="col-sm-2">
                        <CroppedShapeModal customShapesMap={this.state.customShapesMap} />
                        <button type="button" className="btn btn-link btn-sm" onClick={() => {this.toggleGrid()}}>Grid toggle</button>
                    </div>
                    <div class="col-sm-10">
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
                                    {/* DRAW GRID */}
                                    {grid}

                                    {/* DRAW ALL SHAPES */}
                                    <Shapes customShapesMap={this.state.customShapesMap} handleUpdateShapes={this.handleUpdateShapes} />
                                </svg>
                            </div>
                        </div>
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
                                <UpdateShape handleUpdateShape={this.handleUpdateShape} selectedShapeMap={this.state.selectedShapeMap} key={this.state.selectedShapeMap.id} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* SHAPE MERGE MODAL */}
                <div className="modal fade" id="mergeShapeModal" tabIndex="-1" role="dialog" aria-labelledby="mergeShapeModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="mergeShapeModalLabel">Merge shapes</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <MergeShapes handleMergeShape={this.handleMergeShape} customShapesMap={this.state.customShapesMap} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SketchPage;