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
            const res = await fetch(` {this.state.videoId}/data`); //Link to database
            const data = await res.json();
            this.setState({ videoData: data });
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <video controls muted autoPlay>
                        <source src={` {this.state.videoId}`} /*Link to database*/type="video/mp4"></source>
                    </video>
                    <h1>{ this.state.videoData.name }</h1>
                </header>
            </div>
        )
    }
}