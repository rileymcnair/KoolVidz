import React, { Component } from 'react';
import './Home.css'
import VideoBox from './VideoBox.js';

export default class Home extends Component {
    constructor() {
        super();
        this.state = {videos: []};
    }
    async componentDidMount() {
        try {
            const response = await fetch('/api/video/search?search_str='); //Link to the database: Videos directory
            const data = await response.json();
            this.setState({ videos: data });
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        return (
            <div className="app">
    
               
                <div className="videoDisplay">
                    
                        {this.state.videos.map(video =>
                            <VideoBox 
                            key={video.id} 
                            className='videoBox' 
                            id={video.id} 
                            title={video.title} 
                            description={video.description} />
                        )}
                    
                </div>
            </div>
        )
    }
}