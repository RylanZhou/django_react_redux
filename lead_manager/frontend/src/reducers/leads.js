import { GET_LEADS, DELETE_LEAD, ADD_LEAD } from '../actions/types'

const initialState = {
  leads: []
}

// Pretty much like the origin useReducer.
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LEADS:
      return {
        // Include whatever else in the state
        ...state,
        leads: action.payload
      }
    case DELETE_LEAD:
      return {
        ...state,
        leads: state.leads.filter((lead) => lead.id !== action.payload)
      }
    case ADD_LEAD:
      return {
        ...state,
        leads: [...state.leads, action.payload]
      }
    default:
      return state
  }
}
