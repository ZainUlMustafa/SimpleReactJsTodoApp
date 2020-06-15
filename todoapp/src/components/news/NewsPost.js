import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Axios from 'axios'

class NewsPost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            post: null
        }
    }

    componentDidMount() {
        console.log(this.props);
        let id = this.props.match.params.news_id;
        Axios.get("https://jsonplaceholder.typicode.com/posts/" + id)
            .then(res => {
                console.log(res);
                this.setState({
                    post: res.data
                })
            })
    }

    render() {
        const postToDisplay = this.state.post ? (
            <div className="container">
                <h3>{this.state.post.title}</h3>
                <hr></hr>
                <p>{this.state.post.body}</p>
            </div>
        ) : (
                <></>
            )

        return (
            <div className="container my-5 p-3">
                <div className="card mx-5 my-2 p-3">
                    <Link to="/news">
                        <div className="pb-3">
                            <div className="valign-center">
                                <i className="material-icons material-icons-outlined ml-2">chevron_left</i>
                                <span>Back</span>
                            </div>
                        </div>
                    </Link>
                    {postToDisplay}
                </div>
            </div>
        )
    }
}

export default NewsPost;