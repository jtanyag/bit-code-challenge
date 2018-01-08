let moment = require('moment');
let apiURL = "https://rest.bandsintown.com/artists/";

function getArtistName(field, url) {
  var href = url ? url : window.location.href;
  var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
  var string = reg.exec(href);
  return string ? string[1] : null;
};

let artistName = decodeURIComponent(getArtistName('artist'));

export function getArtistInfo(apiURL, artistName) {
  return ((dispatch) => {
    fetch(`${apiURL}${artistName}?app_id=bit_challenge`)
    .then((rawResponse) => {
      return rawResponse.json()
    })
    .then((jsonresp) => {
      dispatch(
        {
          type: 'LOAD_ARTIST_INFO',
          payload: {
            artist: jsonresp.name,
            thumb: jsonresp.thumb_url
          }
        }
      )
    })
  })
}

export function getEventsInfo(apiURL, artistName) {
  return ((dispatch) => {
    fetch(`${apiURL}${artistName}/events?app_id=bit_challenge`)
    .then((rawResponse) => {
      return rawResponse.json()
    })
    .then((jsonresp) => {
      jsonresp.forEach((event) => {
        event.datetime = moment(event.datetime).format("MMM D")
      })
      dispatch(
        {
          type: 'LOAD_EVENTS_INFO',
          payload: jsonresp
        }
      )
    })
  })
}

export function getAllInfo(apiURL, artistName) {
  return dispatch => Promise.all([
    dispatch(getArtistInfo(apiURL, artistName)),
    dispatch(getEventsInfo(apiURL, artistName))
  ])
}
