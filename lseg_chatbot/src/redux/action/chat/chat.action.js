import { CHAT_TYPES } from "../../../utilities/constants/actionTypes";


//Actions for chat creation
const chatCreateRequest = () => ({
  type: CHAT_TYPES.CREATE.LOAD_REQUEST,
});

const chatCreateSuccess = (data) => ({
  type: CHAT_TYPES.CREATE.LOAD_SUCCESS,
  payload: data,
});

const chatCreateError = (errorMessage) => ({
  type: CHAT_TYPES.CREATE.LOAD_ERROR,
  payload: errorMessage,
});

export default {
  chatCreateRequest,
  chatCreateSuccess,
  chatCreateError,
};
