import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <img alt={this.props.artist} src={this.props.thumb} />
        <div className="header-text">
          <h1 className="artist-name">{this.props.artist}</h1>
          <h1>Upcoming Events</h1>
        </div>
      </div>
    )
  }
}

export default Header;
