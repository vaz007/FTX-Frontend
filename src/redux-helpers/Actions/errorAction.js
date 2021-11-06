import { GET_ERRORS, CLEAR_ERRORS } from "./types";

// Errors are register
export const returnErrors = (msg, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id },
  };
};

// clears the store action
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
