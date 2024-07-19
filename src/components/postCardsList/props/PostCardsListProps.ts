import Post from "../../../models/Post";

export default interface PostCardsListProps {
    posts: Post[],
    estimatedItemSize: number,
    itemWidth: number,
    numberOfColumns?: number,
    onPostCardPress: (post: Post) => void,
    overScrollMode?: "auto" | "always" | "never",
    onRefresh?: () => void,
    isRefreshing?: boolean,
    onEndReached?: () => void
}