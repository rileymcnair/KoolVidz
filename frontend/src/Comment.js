import React, { Component } from 'react'

export default class Comment extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className="comment">
                    <p>{this.props.message}</p>
            </div>
        )
    }
}