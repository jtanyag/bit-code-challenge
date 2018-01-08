const initialState = {
  artistName: "Muse",
  artistInfo: null,
  events: []
}

export default(state=initialState, action) => {
  switch(action.type) {
    case('LOAD_ARTIST_INFO'):{
      state = {
        ...state,
        artistInfo: action.payload
      }
      break
    }
    case('LOAD_EVENTS_INFO'):{
      state = {
        ...state,
        events: action.payload
      }
      break
    }
    default: {}
  }
  return state
}
