import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Axios from 'axios'

class NewsPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: [],
        }
    }

    componentDidMount() {
        Axios.get("https://jsonplaceholder.typicode.com/posts")
            .then(res => {
                console.log(res);
                this.setState({
                    posts: res.data
                })
            })
    }

    render() {
        const { posts } = this.state;
        const postList = posts.length ? (
            posts.map(post => {
                return (
                    <div className="container" key={post.id}>
                        <div className="card mx-5 my-2 p-3">
                            <Link to={'/news/' + post.id}><h5>{post.title}</h5></Link>
                            <p>{post.body}</p>
                            {/* <div className="text-center">
                                <img src={post.thumbnailUrl} alt={post.title} width="50%" />
                            </div> */}
                        </div>
                    </div>
                );
            })
        ) : (
                <div>
                    <p className="text-center">No articles yet</p>
                </div>
            );

        return (
            <div className="my-2">
                <div className="text-center">
                    <div className="valign-center">
                        <h3>Latest news</h3>
                        <i className="material-icons material-icons-outlined ml-2">public</i>
                    </div>
                </div>
                {postList}
            </div>
        )
    }
}

export default NewsPage;
