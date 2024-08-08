import ChatMessage from "./ChatMessage";
import Post from "./Post";
import User from "./User";

export default interface ChatResponseDto {
    id: number,
    lastModificationDate: Date,
    messages: ChatMessage[],
    post: Post,
    user1: User,
    user2: User
}