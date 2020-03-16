import React, { Component } from 'react'
import './Styles/SideBar.css'


export default class SideBar extends Component {
    render() {
        return (
            <div className="side-bar">
                <div className="side-btn" onClick={this.props.cVidFunc}>Home</div>
                <div className="side-btn">Trendig</div>
                <div className="side-btn">Subscriptions</div>
                <div className="side-btn">Library</div>
            </div>
        )
    }
}
