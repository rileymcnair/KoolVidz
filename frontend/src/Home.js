import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header.js'
import './Home.css'

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
                <div className="topbar">
                <Header /> 
                </div>
              
                <div className="container">
                    <div className="row">
                        {this.state.videos.map(video =>
                        <div className="col-md-4" key={video.id}>
                            <Link to={`/player/${video.id}`}>
                                <div className="card border-0">
                                    <div className="card-body">
                                        <p>{video.title}</p>
                                        <p>{video.description}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}