import React, { Component } from 'react'
import Axios from 'axios'

class NewsPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: [],
        }
    }

    componentDidMount() {
        Axios.get("http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=ac0779dc162a4e49b08927fbf328147d")
            .then(res => {
                console.log(res);
                this.setState({
                    posts: res.data.articles
                })
            })
    }

    render() {
        const { posts } = this.state;
        const postList = posts.length ? (
            posts.map(post => {
                return (
                    <div className="container">
                        <div className="card mx-5 my-2 p-3" key={post.id ?? Math.random()}>
                            <h5>{post.title}</h5>
                            <p>{post.description}</p>
                            <div className="text-center">
                                <img src={post.urlToImage} alt={post.title} width="50%" />
                            </div>
                        </div>
                    </div>
                );
            })
        ) : (
                <div>
                    <p className="text-center">No posts yet</p>
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
