import React, { Component } from 'react'
import "./Player.css"
import Comment from "./Comment.js"

export default class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoId: this.props.match.params.id,
            videoData: {},
            ratings: 0,
            likeStatus: null,
            comments: []
        };
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

        let test = "";
        if (this.state.likeStatus === null){
            test = "null"
        }
        else if (this.state.likeStatus === true){
            test = "true"
        }
        else if (this.state.likeStatus === false) {
            test = "false"
        }

        return (
            <div className="App">
                <header className="App-header">
                    <h1>{ this.state.videoData.title }</h1>
                    <video controls muted autoPlay key={this.state.videoData.filename}>
                        <source src={`/videos/${this.state.videoData.filename}`} /*Link to database: Video ID*/type="video/mp4"></source>
                    </video>
                </header>
                <div className="Popularity">
                    <p>
                        Views: {this.state.videoData.views}
                    </p>
                    <p>
                        <button className="likebutton" onClick={() => this.handleLikes("like")}>
                            Like
                        </button>
                        <button className="dislikebutton" onClick={() => this.handleLikes("dislike")}>
                            Dislike
                        </button>
                        Ratings: {this.state.ratings}
                    </p>
                </div>
                <div className="comments">
                    {this.state.comments.map(comment => <Comment className="comment" message={comment.content}></Comment>)}
                </div>
            </div>
        )
    }
}