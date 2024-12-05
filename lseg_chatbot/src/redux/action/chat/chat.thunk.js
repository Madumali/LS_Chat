import actions from "./chat.action";
import ChatService from "../../../services/chat.service";
import { handleThunkError } from "../../../helpers/thunkErrorHandling";

//Thunk that triggers actions for chat creation
export const createChat = (payload, setChatHistory) => (dispatch) => {
  dispatch(actions.chatCreateRequest()); //request action
  ChatService.createChat(payload)
    .then((response) => {
      dispatch(actions.chatCreateSuccess(response.data)); //success action
      let text = response.data;
      setChatHistory((prev) => [ //updates chat history with response
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text, type: "typetext" },
      ]);
      return response.data;
    })
    .catch((error) => {
      handleThunkError(error);
      return dispatch(actions.chatCreateError(error)); //error action
    });
};
