import React, { Component } from 'react';
import {connect} from 'react-redux';
import Header from './components/Header';
import EventList from './components/EventList';
import './App.css';
// import { getEventsInfo } from './actions/actions'
var moment = require('moment');

const mapComponentToProps = (store) => {
  return {
    artistName: store.reducers.artistName,
    artistInfo: store.reducers.artistInfo,
    events: store.reducers.events
  }
}

export default connect(mapComponentToProps)(
  class App extends Component {
    constructor(props) {
      super(props)
      this.state = {
        events: []
      }
    }

    componentWillMount() {
      function getArtistName(field, url) {
        var href = url ? url : window.location.href;
        var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
        var string = reg.exec(href);
        return string ? string[1] : null;
      };

      let artistName = decodeURIComponent(getArtistName('artist'));

      // this.props.dispatch(getEventsInfo("https://rest.bandsintown.com/artists/", "Maroon 5"))

      fetch(`https://rest.bandsintown.com/artists/${artistName}?app_id=bit_challenge`)
      .then((rawResponse) => {
        return rawResponse.json()
      })
      .then((jsonresp) => {
        this.setState(
          {
            artist: jsonresp.name,
            thumb: jsonresp.thumb_url
          }
        )
      })
      fetch(`https://rest.bandsintown.com/artists/${artistName}/events?app_id=bit_challenge`)
      .then((rawResponse) => {
        return rawResponse.json()
      })
      .then((jsonresp) => {
        jsonresp.forEach((event) => {
          event.datetime = moment(event.datetime).format("MMM D")
        })
        this.setState(
          {
            events: jsonresp
          }
        )
      })
    }

    render() {
      return (
        <div className = "App">
          <Header artist={this.state.artist} thumb={this.state.thumb}/>
          <EventList events={this.state.events} />
        </div>
      );
    }
  }
)
