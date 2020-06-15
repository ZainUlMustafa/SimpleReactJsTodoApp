import React, { Component } from 'react'

class CroppedShape extends Component {
    constructor(props) {
        super(props)

        this.state = {
            shapeId: null
        }
    }

    componentDidMount() {
        console.log(this.props);
        let id = this.props.match.params.shape_id;
        this.setState({
            shapeId: id
        })
    }

    render() {
        return (
            <h1>{this.state.shapeId}</h1>
        )
    }
}

export default CroppedShape;