import {
    LATEST_BASIS_BY_NAME,
    CLEAR_ARBITRAGE_STATE
} from "../Actions/types";
import _ from 'lodash';
// initial state for the auth component
const initialState = {
    arbitrage: [],
    isLoading: false,
    status: null,
    message: null,
};

// Depending on the Action the state of the application
const arbitrageReducer = (state = initialState, action) => {
    switch (action.type) {
        case LATEST_BASIS_BY_NAME:
            const result = []
            action.payload.map(item => {
                result.push({ futurePrice: item.data[0].futurePrice, symbol: item.data[0].symbol })
            })
            return {
                ...state,
                arbitrage: result,
                app: null,
                isLoading: false,
                status: "success",
                message: "Successfully fetched the futures",

            }
        case CLEAR_ARBITRAGE_STATE:
            return {
                ...state,
                status: null,
                message: null,
            };
        default:
            return state
    }
}

export default arbitrageReducer;