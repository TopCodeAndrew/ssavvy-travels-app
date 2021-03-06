const initialState = {
    budget: '',
    location: '',
    airports: [],
    departureDate: '',
    arrivalDate: '',
}

const NEW_SEARCH = 'NEW_SEARCH'
const AIRPORT_SEARCH = "AIRPORT_SEARCH"


export function airportSearch(search) {
    console.log(search)
    return {
        type: AIRPORT_SEARCH,
        payload: search
    }
}

export function newSearch(search) {
    return {
        type: NEW_SEARCH,
        payload: search
    }
}


export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case AIRPORT_SEARCH:
            return { ...state, airports: action.payload }
        case NEW_SEARCH:
            const { budget, location, departureDate, returnDate } = action.payload
            return { ...state, budget: budget, location: location, departureDate: departureDate, returnDate: returnDate }
        default:
            return state
    }
}