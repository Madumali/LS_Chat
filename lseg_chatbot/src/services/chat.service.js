import axiosInstance from "../helpers/api";

class ChatService {
  createChat = (payload) => axiosInstance.post(`/chat/create-chat`, payload);
}

export default new ChatService();
