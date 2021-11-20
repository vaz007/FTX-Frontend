import { LATEST_BASIS_BY_NAME, CLEAR_ARBITRAGE_STATE } from './types';
import baseApiReq from '../../api';
import { returnErrors } from "./errorAction";

export const latestBasisByBaseName = (body) => async (dispatch) => {
    // console.log("BASE API ", process.env.REACT_APP_BASE_URL);
    await baseApiReq.post("/latestBasisByBaseName", body)
        .then(res => {
            dispatch({
                type: LATEST_BASIS_BY_NAME,
                payload: res.data,
            });
        }).catch(err => {
            dispatch(
                returnErrors(err, 400, "LATEST_BASIS_BY_NAME_FAIL")
            )
        })
};

export const clearArbitragesState = () => (dispatch) => {
    dispatch({
        type: CLEAR_ARBITRAGE_STATE,
        payload: null,
    });
}