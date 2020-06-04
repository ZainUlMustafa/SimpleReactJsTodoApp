import React, { Component } from 'react'
import Floor from "./assets/floor.svg";

class SketchPage extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }


    render() {
        return (
            <div className="my-2 mx-5">
                <div className="text-center">
                    <div className="valign-center">
                        <h3>Sketch it</h3>
                        <i className="material-icons material-icons-outlined ml-2">brush</i>
                    </div>
                </div>
                <img src={Floor} width="100%" alt="React Logo" />
            </div>
        )
    }
}

export default SketchPage;