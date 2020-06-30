import React, { Component } from 'react'
import Floor from "./assets/wl1.svg";
import AddShape from './AddShape';
import $ from "jquery";
import Shapes from './Shapes';
import UpdateShape from './UpdateShape';
import MergeShapes from './MergeShapes';
import AllShapesList from './AllShapesList';
import UnmergeShapes from './UnmergeShapes';
import GridSettings from './GridSettings';
import {connect} from 'react-redux';

class SketchPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            customShapesMap: [
                {
                    id: "0",
                    shape: <circle cx='120' cy='500' r='20' className='customShape' onClick={() => { this.handleShapeOnClick("0") }} key={"0"} />,
                    shapeInd: 1,
                    shapeDimension: [120, 500, 20]         ///cx,cy,r
                },
                {
                    id: "1",
                    shape: <circle cx='600' cy='200' r='50' className='customShape' onClick={() => { this.handleShapeOnClick("1") }} key={"1"} />,
                    shapeInd: 1,
                    shapeDimension: [600, 200, 50]
                },
                {
                    id: "2",
                    shape: <rect x='0' y='0' width='100' height='200' className='customShape' onClick={() => { this.handleShapeOnClick("2") }} key={"2"} />,
                    shapeInd: 0,
                    shapeDimension: [0, 0, 100, 200]         ///x,y,w,h
                },
                {
                    // to move a group, add an offset (each x,y) on both the shapes
                    id: "5",
                    shape: <g className='customShape' onClick={() => { this.handleShapeOnClick("5") }} key={"5"}>
                        <path d="M200 80 L125 240 L275 240 Z" />
                        <rect x='350' y='350' width='100' height='200' />
                    </g>,
                    shapeInd: 3,
                    shapeDimension: [],
                    listOfShapes: [
                        {
                            id: "3",
                            shape: <path d="M200 80 L125 240 L275 240 Z" className='customShape' onClick={() => { this.handleShapeOnClick("3") }} key={3} />,
                            shapeInd: 0,
                            shapeDimension: ["M200 80 L125 240 L275 240 Z"]         ///coordinates
                        },
                        {
                            id: "4",
                            shape: <rect x='350' y='350' width='100' height='200' className='customShape' onClick={() => { this.handleShapeOnClick("4") }} key={4} />,
                            shapeInd: 0,
                            shapeDimension: [350, 350, 100, 200]         ///x,y,w,h
                        }
                    ]
                },
            ],

            simpleCustomShapesMap: [
                {
                    id: "0",
                    shape: <circle cx='120' cy='500' r='20' key={"0"} />,
                },
                {
                    id: "1",
                    shape: <circle cx='600' cy='200' r='50' key={"1"} />,
                },
                {
                    id: "2",
                    shape: <rect x='0' y='0' width='100' height='200' key={"2"} />
                },
                {
                    id: "5",
                    shape: <g key={"5"}>
                        <path d="M200 80 L125 240 L275 240 Z" key={"3"} />
                        <rect x='350' y='350' width='100' height='200' key={"4"} />
                    </g>,
                    listOfShapes: [
                        {
                            id: "3",
                            shape: <path d="M200 80 L125 240 L275 240 Z" key={"3"} />,
                        },
                        {
                            id: "4",
                            shape: <rect x='350' y='350' width='100' height='200' key={"4"} />,
                        },
                    ]
                },
            ],


            selectedShapeMap: { id: null, shape: null, shapeInd: 0, shapeDimension: "" },

            imgWidth: null,
            imgHeight: null,
            svgWidth: null,
            svgHeight: null,

            zoomFactor: 1,

            gridToggle: true,
            gridSize: 5,
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

    handleDeleteShape = (id) => {
        /// deleting old map
        const customShapesMap = this.state.customShapesMap.filter(customShapeMap => {
            return customShapeMap.id !== id
        });

        const simpleShapesMap = this.state.simpleCustomShapesMap.filter(simpleShapeMap => {
            return simpleShapeMap.id !== id
        });

        this.setState({
            customShapesMap: customShapesMap,
            simpleCustomShapesMap: simpleShapesMap
        });
    }

    handleUpdateShape = (id, sda, ind) => {
        /// generate shape
        const svgSquareShape = <rect x={sda[0]} y={sda[1]} width={sda[2]} height={sda[2]} className="customShape" onClick={() => { this.handleShapeOnClick(id) }} key={id} />;
        const svgCircleShape = <circle cx={sda[0]} cy={sda[1]} r={sda[2]} className="customShape" onClick={() => { this.handleShapeOnClick(id) }} key={id} />;
        const svgRectShape = <rect x={sda[0]} y={sda[1]} width={sda[2]} height={sda[3]} className="customShape" onClick={() => { this.handleShapeOnClick(id) }} key={id} />;

        const svgSimpleSquareShape = <rect x={sda[0]} y={sda[1]} width={sda[2]} height={sda[2]} key={id} />;
        const svgSimpleCircleShape = <circle cx={sda[0]} cy={sda[1]} r={sda[2]} key={id} />;
        const svgSimpleRectShape = <rect x={sda[0]} y={sda[1]} width={sda[2]} height={sda[3]} key={id} />;

        /// create new map
        const svgShape = ind === 0 ? svgRectShape : ind === 1 ? svgCircleShape : svgSquareShape
        const svgSimpleShape = ind === 0 ? svgSimpleRectShape : ind === 1 ? svgSimpleCircleShape : svgSimpleSquareShape

        const customShapeMap = { id: id, shape: svgShape, shapeInd: ind, shapeDimension: sda }
        const simpleShapeMap = { id: id, shape: svgSimpleShape }

        /// deleting old map
        const customShapesMap = this.state.customShapesMap.filter(customShapeMap => {
            return customShapeMap.id !== id
        });

        const simpleShapesMap = this.state.simpleCustomShapesMap.filter(simpleShapeMap => {
            return simpleShapeMap.id !== id
        });

        /// add map in list of maps
        let newCustomShapesMap = [...customShapesMap, customShapeMap];
        let newSimpleShapesMap = [...simpleShapesMap, simpleShapeMap];
        this.setState({
            customShapesMap: newCustomShapesMap,
            simpleCustomShapesMap: newSimpleShapesMap
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

        const svgSimpleSquareShape = <rect x={sda[0]} y={sda[1]} width={sda[2]} height={sda[2]} key={id} />;
        const svgSimpleCircleShape = <circle cx={sda[0]} cy={sda[1]} r={sda[2]} key={id} />;
        const svgSimpleRectShape = <rect x={sda[0]} y={sda[1]} width={sda[2]} height={sda[3]} key={id} />;

        /// create new map
        const svgShape = ind === 0 ? svgRectShape : ind === 1 ? svgCircleShape : svgSquareShape
        const svgSimpleShape = ind === 0 ? svgSimpleRectShape : ind === 1 ? svgSimpleCircleShape : svgSimpleSquareShape

        const customShapeMap = { id: id, shape: svgShape, shapeInd: ind, shapeDimension: sda }
        const simpleShapeMap = { id: id, shape: svgSimpleShape }

        /// add map in list of maps
        let customShapesMap = [...this.state.customShapesMap, customShapeMap];
        let simpleShapesMap = [...this.state.simpleCustomShapesMap, simpleShapeMap];
        this.setState({
            customShapesMap: customShapesMap,
            simpleCustomShapesMap: simpleShapesMap,
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
            /// merge (concat) all ids together with delimiter ("o") for later on separation
            let idConcat = listOfMergeShapeIds.join("o");
            idConcat = Math.ceil(Math.random() * 100000).toString();

            /// get respective shapes
            const filterCustomShapesMap = this.state.customShapesMap.filter(function (eachShape) {
                return listOfMergeShapeIds.includes(eachShape.id);
            })
            const filterSimpleShapesMap = this.state.simpleCustomShapesMap.filter(function (eachShape) {
                return listOfMergeShapeIds.includes(eachShape.id);
            })

            /// add shapes under group tag
            const customShapeList = filterCustomShapesMap.map(eachShape => {
                return eachShape.shape;
            })
            const simpleShapeList = filterSimpleShapesMap.map(eachShape => {
                return eachShape.shape;
            })

            console.log(customShapeList, simpleShapeList)

            const mergeGroup = <g className='customShape' onClick={() => { this.handleShapeOnClick(idConcat) }} key={idConcat}>{simpleShapeList}</g>
            const simpleMergeGroup = <g>{simpleShapeList}</g>
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
            const customMergeMap = { id: idConcat, shape: mergeGroup, shapeInd: mergeInd, shapeDimension: "", listOfShapes: filterCustomShapesMap }
            const simpleMergeMap = { id: idConcat, shape: simpleMergeGroup, listOfShapes: filterSimpleShapesMap }
            console.log(simpleMergeMap)

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

    handleUnmergeShape = (customShape, simpleShape) => {
        /// get list of shapes withing group
        let listOfCustomShapes = customShape.listOfShapes
        let listOfSimpleShapes = simpleShape.listOfShapes

        /// store separately in state
        let customShapesMap = this.state.customShapesMap
        listOfCustomShapes.forEach((eachCustomShape) => {
            customShapesMap = [...customShapesMap, eachCustomShape]
        })
        let simpleShapesMap = this.state.simpleCustomShapesMap
        listOfSimpleShapes.forEach((eachSimpleShape) => {
            simpleShapesMap = [...simpleShapesMap, eachSimpleShape]
        })

        /// delete the merge shape
        customShapesMap = customShapesMap.filter(customShapeMap => {
            return customShapeMap.id !== customShape.id
        });
        simpleShapesMap = simpleShapesMap.filter(simpleShapeMap => {
            return simpleShapeMap.id !== simpleShape.id
        });
        console.log(customShapesMap, simpleShapesMap)

        /// set the new state
        this.setState({
            customShapesMap: customShapesMap,
            simpleCustomShapesMap: simpleShapesMap,
        });

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

    handleGridSizeChange = (size) => {
        this.setState({
            gridSize: size,
        })
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
                    <pattern id="transformedPattern" x="0" y="0" width={this.state.gridSize} height={this.state.gridSize} patternUnits="userSpaceOnUse">
                        <rect x="0" y="0" width={this.state.gridSize} height={this.state.gridSize} className="grid-rect" />
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
                    <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#mergeShapeModal">Merge</button>
                    {" "}
                    <button type="button" className="btn btn-danger btn-sm" data-toggle="modal" data-target="#unmergeShapeModal">Unmerge</button>
                </div>

                <div className="row">
                    <div className="col-sm-2">
                        <AllShapesList customShapesMap={this.state.customShapesMap} handleDeleteShape={this.handleDeleteShape} />
                        <div className="d-flex justify-content-between">
                            <div className="border-0 w-95">
                                <button type="button" className="btn btn-link btn-sm" onClick={() => { this.toggleGrid() }}>Grid toggle ({this.state.gridSize}x{this.state.gridSize})</button>
                            </div>
                            <button className="btn btn-sm" data-toggle="modal" data-target="#gridSettingsModal">
                                <i className="material-icons material-icons">settings</i>
                            </button>
                        </div>
                    </div>
                    <div className="col-sm-10">
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

                {/* SHAPE UNMERGE MODAL */}
                <div className="modal fade" id="unmergeShapeModal" tabIndex="-1" role="dialog" aria-labelledby="unmergeShapeModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="unmergeShapeModalLabel">Unmerge shapes</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <UnmergeShapes handleUnmergeShape={this.handleUnmergeShape} customShapesMap={this.state.customShapesMap} simpleCustomShapesMap={this.state.simpleCustomShapesMap} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* GRID SETTINGS MODAL */}
                <div className="modal fade" id="gridSettingsModal" tabIndex="-1" role="dialog" aria-labelledby="gridSettingsModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="gridSettingsModalLabel">Grid settings</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <GridSettings handleGridSizeChange={this.handleGridSizeChange} grideSize={this.state.gridSize}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

/// TODO: MIGRATE TO REACT HERE
const mapStateToProps = (state) => {
    console.log(state)
    return {
    }
}

export default connect()(SketchPage);