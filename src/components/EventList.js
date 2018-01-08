import React, { Component } from 'react';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
// import EventListItem from './components/EventListItem';

class EventList extends Component {
  render() {
    return (
      <div className="event-list">
        <ListGroup>
          {this.props.events.map((event, index) => {
            return (
              <ListGroupItem className="event"
                key={index}
                header={
                  <div className="event-content">
                    <div className="date">{event.datetime}</div>
                    <div className="venue">{event.venue.name}</div>
                    <div className="location">{event.venue.city}, {event.venue.region}</div>
                    <div className="tickets">
                    <Button href={event.offers.url}>Tickets</Button>
                    </div>
                  </div>
                }>
              </ListGroupItem>
            )
          })}
        </ListGroup>
      </div>
    )
  }
}

export default EventList;
