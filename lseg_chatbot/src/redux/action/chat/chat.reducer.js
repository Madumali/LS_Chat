import { CHAT_TYPES } from "../../../utilities/constants/actionTypes";

//Initial states of values
const initialState = {
  isLoadingChat: false,
  chatList: [],
  totalCount: 0,
  errorMessage: null,
  postChat: [],
};

const chatReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHAT_TYPES.CREATE.LOAD_REQUEST:
      return {
        ...state,
        isLoadingChat: true,
        postChat: [],
        errorMessage: null,
      };

    case CHAT_TYPES.CREATE.LOAD_SUCCESS:
      return {
        ...state,
        isLoadingChat: false,
        postChat: payload ? payload : [],
        errorMessage: null,
      };

    case CHAT_TYPES.CREATE.LOAD_ERROR:
      return {
        ...state,
        isLoadingChat: false,
        postChat: [],
        errorMessage: payload,
      };
    default:
      return state;
  }
};

export default chatReducer;
