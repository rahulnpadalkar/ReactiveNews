import React, { Component, Fragment } from 'react';
import { FetchService } from '../NRComponents/FetchPosts';
import { StoreService } from '../NRComponents/DataStore';
import { GooSpinner } from 'react-spinners-kit';
import { FaCaretUp } from 'react-icons/fa';
import './postList.css';
import './card.css'

export default class PostList extends Component {

    constructor(props) {
        super(props);
        var that = this;
        this.state = {
            initialDataLoading: true,
            loadingMorePosts: false,
            posts: []
        };

        window.onscroll = () => {

            if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {

                that.setState({ loadingMorePosts: true })
                that.fetcData(that.props.activeTab).then(function (data) {
                    console.log(data);
                    that.setState({
                        loadingMorePosts: false,
                        posts: that.state.posts.concat(data)
                    });
                });

            }

        }
    }


    generateDisplayObject(post) {

        let postsObject = {};
        postsObject['title'] = post.title;
        postsObject['time'] = post.time;
        postsObject['url'] = post.url;
        postsObject['by'] = post.by;
        postsObject['score'] = post.score;
        postsObject['id'] = post.id;
        postsObject['descendants'] = post.descendants ? post.descendants : '';
        return postsObject;

    }

    fetcData(category) {
        var that = this, displayPostObjects = [];
        return new Promise(function (resolve, reject) {
            FetchService.fetchPostsByCategory((category.toLowerCase() + 'stories')).then(function (data) {
                StoreService.saveItemIds(data.data);
                var postIds = StoreService.getNextPage();
                FetchService.fetchBulkPostsById(postIds).then(function (posts) {
                    posts.forEach(function (post) {
                        displayPostObjects.push(that.generateDisplayObject(post.data));
                    });
                    resolve(displayPostObjects);
                });
            });
        });
    }

    componentDidMount() {
        var that = this;
        this.fetcData(that.props.activeTab).then(function (data) {
            that.setState({ initialDataLoading: false, posts: that.state.posts.concat(data) });
        });
    }

    componentWillReceiveProps(newProps) {
        var that = this;
        if (this.props.activeTab !== newProps.activeTab) {
            StoreService.resetDataStore();
            this.setState({ initialDataLoading: true, posts: [] });
            this.fetcData(newProps.activeTab).then(function (data) {
                that.setState({ initialDataLoading: false, posts: that.state.posts.concat(data) });
            });
        }
    }
    render() {
        if (this.state.initialDataLoading) {
            return (
                <div className="row loader-container">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4 loader">
                        <GooSpinner size={70} color="#f46257" />
                    </div>
                    <div className="col-sm-4"></div>
                </div>
            );
        } else {
            return (
                <div className="row post-container">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-8">
                        {
                            this.state.posts.map(post => (
                                <Fragment key={post.id}>
                                    <Card data={post} />
                                </Fragment>
                            ))
                        }
                        {
                            this.state.loadingMorePosts ? <div className="loader"><GooSpinner size={70} color="#f46257" /></div> : ''
                        }
                    </div>
                    <div className="col-sm-2"></div>
                </div>
            );
        }
    }

}



class Card extends Component {

    render() {

        return (
            <div className="row custom-card-container">
                <div className="col-sm-2">
                    <div className="score-container">
                        <div className="icon-container"><FaCaretUp size={40} /></div>
                        <div className="score">{this.props.data.score}</div>
                    </div>
                </div>
                <div className="col-sm-10 custom-card">
                    <div className="card-details-container">
                        <div className="custom-card-title">
                            <div className="custom-card-title-container">
                                <a href={this.props.data.url} target="_blank">{this.props.data.title}</a>
                            </div>
                        </div>
                        <div className="custom-card-footer row">
                            <div className="col-sm-2">
                                {
                                    this.props.data.descendants ? this.props.data.descendants + ' comments' : ''
                                }</div>
                            <div className="col-sm-6"></div>
                            <div className="col-sm-4 author-container">
                                by {this.props.data.by}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}