import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Axios from 'axios';
import { connect } from 'react-redux';

class NewsPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    // shouldComponentUpdate() {
    //     console.log("comp should update")
    //     console.log(this.props.updateFlag)
    //     return this.props.updateFlag;
    // }

    componentDidMount() {
        console.log("comp did");
        if (this.props.updateFlag) {
            Axios.get("https://jsonplaceholder.typicode.com/posts")
                .then(res => {
                    console.log(res);
                    this.props.updateAllNews(res.data, false)
                })
        }
    }

    handleRefresh = (e) => {
        this.props.forceUpdate(true)
    }

    render() {
        console.log("render")
        const { allNews } = this.props;
        const allNewsList = allNews.length ? (
            allNews.map(news => {
                return (
                    <div className="container" key={news.id}>
                        <div className="card mx-5 my-2 p-3">
                            <Link to={'/news/' + news.id}><h5>{news.title}</h5></Link>
                            <p>{news.body}</p>
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
                    <button onClick={this.handleRefresh}>Refresh</button>
                </div>
                {allNewsList}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        allNews: state.allNews,
        updateFlag: state.updateFlag,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateAllNews: (allNewsData, updateFlag) => {
            dispatch({
                type: 'UPDATE_ALL_NEWS',
                allNewsData: allNewsData,
                updateFlag: updateFlag,
            })
        },
        forceUpdate: (updateFlag) => {
            dispatch({
                type: 'FORCE_UPDATE',
                updateFlag: updateFlag,
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);
