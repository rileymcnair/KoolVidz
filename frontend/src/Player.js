import React, { Component } from 'react'

export default class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoId: this.props.match.params.id,
            videoData: {}
        };
    }
    async componentDidMount() {
        try {
            const res = await fetch(`/api/video/get?video_id=${this.state.videoId}`); //Link to database: Video Metadata
            const data = await res.json();
            console.log(data.filename)
            this.setState({ videoData: data });
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>{ this.state.videoData.title }</h1>
                    <video controls muted autoPlay key={this.state.videoData.filename}>
                        <source src={`/videos/${this.state.videoData.filename}`} /*Link to database: Video ID*/type="video/mp4"></source>
                    </video>
                </header>
            </div>
        )
    }
}