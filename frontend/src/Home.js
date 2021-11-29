import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header.js'
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
            console.log(data)
            this.setState({ videos: data });
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        return (
            <div className="App App-header">
                
                <Header /> 

     
               
                <div className="container">
                    <div className="row">
                        {this.state.videos.map(video =>
                        <div className="col-md-4" key={video.id}>
                            <VideoBox className='videoBox' id={video.id} title={video.title} description={video.description}/>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}