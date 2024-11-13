import { useContext } from "react";
import Context from "../contexts/AuthContext/AuthContext";
import ChatResponseDto from "../models/Chat";
import ChatMessage from "../models/ChatMessage";
import useHttpClient from "./useHttpClient";

const useChatService = () => {

    const httpClient = useHttpClient()

    return {
       get: () => {
           return httpClient.get<ChatResponseDto[]>(
            `/api/chat`,
            true);
       },
       getById: (id: number) => {
           return httpClient.get<ChatResponseDto>(
            `/api/chat/${id}`,
            true);
       },
       getMessages: (userId: number) => {
           return httpClient.get<ChatMessage[]>(
            `/api/chat/${userId}/messages`,
            true);
       },
       create: (postId: number) => {
           return httpClient.post<number>(
                `/api/chat/${postId}`,
                {},
                true);
       }
    }
}

export default useChatService;