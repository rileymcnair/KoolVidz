import React, { Component } from 'react';
import "./Player.css";
import Comment from "./Comment.js";
import {DislikeFilled, DislikeOutlined, LikeOutlined, LikeFilled} from '@ant-design/icons';


export default class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoId: this.props.match.params.id,
            videoData: {},
            ratings: 0,
            likeStatus: null,
            comments: [],
            current_comment: '',
            file: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        try {
            const data = await (await fetch(`/api/video/get?video_id=${this.state.videoId}`)).json(); //Link to database: Video Metadata
            const rating_data = await (await fetch(`/api/rating/get?video_id=${this.state.videoId}`)).json();
            const current_like_data = await (await fetch(`/api/rating/has?video_id=${this.state.videoId}`)).json();
            const comment_data = await (await fetch(`/api/comment/get?video_id=${this.state.videoId}`)).json();
            console.log(data.filename);
            this.setState({ videoData: data });
            this.setState({ ratings: rating_data });
            this.setState({ likeStatus: current_like_data })
            this.setState({ comments: comment_data })
           
        } catch (error) {
            console.log(error);
        } 
    }

    handleChange(event) {
        this.setState({current_comment: event.target.value});
      }
    
    handleSubmit = async() => {
        if (this.state.current_comment !== '')
        {
            await fetch(`/api/comment/create?video_id=${this.state.videoId}&content=${this.state.current_comment}`, {method: 'POST'})
            var new_comments = await (await fetch(`/api/comment/get?video_id=${this.state.videoId}`)).json();
            this.setState({ comments: new_comments })
            this.setState({ current_comment: ''})
        }
    }

    handleLikes = async (type) => {
        var new_rating_data;
        var new_like_status;
        if ((this.state.likeStatus === true && type === "like") || (this.state.likeStatus === false && type === "dislike")){
            await fetch(`/api/rating/delete?video_id=${this.state.videoId}`, {method: 'DELETE'})
        }
        else{
            if (type === "like"){
                await fetch(`/api/rating/create?video_id=${this.state.videoId}&is_like=true`, {method: 'POST'})
            }
            else{
                await fetch(`/api/rating/create?video_id=${this.state.videoId}&is_like=false`, {method: 'POST'})
            }
        }
        new_rating_data = await (await fetch(`/api/rating/get?video_id=${this.state.videoId}`)).json();
        new_like_status = await (await fetch(`/api/rating/has?video_id=${this.state.videoId}`)).json();
        this.setState({ ratings: new_rating_data });
        this.setState({ likeStatus: new_like_status });
    }

    render() {

        var likeButtonClass = ""
        var dislikeButtonClass = ""
        var likeButtonIcon;
        var dislikeButtonIcon; 

        if (this.state.likeStatus === null){
            likeButtonClass = "likeButtonBefore"
            dislikeButtonClass = "dislikeButtonBefore"
            likeButtonIcon = <LikeOutlined className='rating'/>
            dislikeButtonIcon = <DislikeOutlined className='rating'/>
        }
        else if (this.state.likeStatus === true){
            likeButtonClass = "likeButton"
            dislikeButtonClass = "dislikeButtonBefore"
            likeButtonIcon = <LikeFilled className='rating'/>
            dislikeButtonIcon = <DislikeOutlined className='rating'/>
        }
        else if (this.state.likeStatus === false) {
            likeButtonClass = "likeButtonBefore"
            dislikeButtonClass = "dislikeButton"
            likeButtonIcon = <LikeOutlined className='rating'/>
            dislikeButtonIcon = <DislikeFilled className='rating'/>
        }

        return (
            <div className="container">
                <div className="videoContainer">
                    <video controls muted autoPlay key={this.state.videoData.filename} className="videoPlayer">
                        <source src={`/videos/${this.state.videoData.filename}`} type='video/mp4'></source>  {/* Link to videos stored in /public/videos */}
                    </video>
                    <div className="popularity">
                        <div className="titleViewCount">
                            <h1 className="titleText">{ this.state.videoData.title }</h1>
                            <p className="viewText">
                            { this.state.videoData.views !== "1" ? (`${this.state.videoData.views} views`) : (`${this.state.videoData.views} view`) }
                            </p>
                        </div>
                        <div className="ratings">
                            <p className="ratingText">
                                Ratings: {this.state.ratings}
                            </p>
                            <div className="ratingButtons">
                                <button className={likeButtonClass} onClick={() => this.handleLikes("like")}>
                                    {likeButtonIcon}
                                    <p>Like</p>
                                </button>
                                <button className={dislikeButtonClass} onClick={() => this.handleLikes("dislike")}>
                                    {dislikeButtonIcon}
                                    <p>Dislike</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <p className="description">
                        {this.state.videoData.description}
                    </p>
                </div>
                
                <div className="feedback">
                    <h3 className="commentHeader">
                        { this.state.comments.length !== 1 ? (<p>{this.state.comments.length} Comments</p>) : (<p>{this.state.comments.length} Comment</p>) }
                    </h3>
                    <input type="text" className="commentInput" value={this.state.current_comment} onChange={this.handleChange} placeholder="Write a Comment" />
                    <div className="submitButtonDiv">
                        <button className="submitButton" onClick={this.handleSubmit}>
                            COMMENT
                        </button>
                    </div>
                    { this.state.comments.length > 1 ? (<p className="commentDirection">Oldest</p>) : <></>}
                    <div className="comments">
                        {this.state.comments.map(comment => <Comment className="comment" message={comment.content}></Comment>)}
                    </div>
                    { this.state.comments.length > 1 ? (<p className="commentDirection">Most Recent</p>) : <></>}
                </div>
            </div>
        )
    }
}
