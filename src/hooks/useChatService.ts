import { useContext } from "react";
import HttpClient from "../services/httpClient/HttpClient";
import Context from "../contexts/AuthContext/AuthContext";
import ChatResponseDto from "../models/Chat";
import ChatMessage from "../models/ChatMessage";

const useChatService = () => {
    const authContext = useContext(Context);

    return {
       get: () => {
           return HttpClient.get<ChatResponseDto[]>(
            `/api/chat`,
            authContext?.token);
       },
       getById: (id: number) => {
           return HttpClient.get<ChatResponseDto>(
            `/api/chat/${id}`,
            authContext?.token);
       },
       getMessages: (userId: number) => {
           return HttpClient.get<ChatMessage[]>(
            `/api/chat/${userId}/messages`,
            authContext?.token);
       },
       create: (postId: number) => {
           return HttpClient.post<number>(
                `/api/chat/${postId}`,
                {},
                authContext?.token);
       }
    }
}

export default useChatService;