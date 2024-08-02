import ChatMessage from "./ChatMessage";
import Post from "./Post";
import User from "./User";

export default interface ChatResponseDto {
    id: number,
    messages: ChatMessage[],
    post: Post,
    user1: User,
    user2: User
}