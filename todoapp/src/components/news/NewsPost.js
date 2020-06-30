import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

class NewsPost extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    handleDelete = () => {
        this.props.deleteNews(this.props.news.id)
        this.props.history.push('/news')
    }

    render() {
        const newsToDisplay = this.props.news ? (
            <div className="container">
                <h3>{this.props.news.title}</h3>
                <hr></hr>
                <p>{this.props.news.body}</p>
                <button className="btn btn-light btn-sm" onClick={this.handleDelete}>Delete</button>
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
                    {newsToDisplay}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let id = parseInt(ownProps.match.params.news_id);
    console.log(ownProps);
    return {
        news: state.allNews.find(news => news.id === id)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteNews: (id) => { dispatch({ type: 'DELETE_NEWS', id: id }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsPost);