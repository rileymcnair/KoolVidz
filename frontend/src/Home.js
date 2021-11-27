import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header.js'
import './Home.css'

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            videos: [{
                id: 1,
                name: "test",
                duration: 5
            },
            {
                id: 2,
                name: "test2",
                duration: 5
            },
            {
                id: 3,
                name: "test3",
                duration: 5
            }
        ]
        };
    }
    async componentDidMount() {
        try {
            const response = await fetch(''); //Link to the database: Videos directory
            const data = await response.json();
            this.setState({ videos: [...data] });
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
                                    <img src={``} /*Link to the database: Video Image/Thumbnail */alt={video.name} /> 
                                    <div className="card-body">
                                        <p>{video.name}</p>
                                        <p>{video.duration}</p>
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