import { TouchableOpacity, View } from "react-native";
import PostCardsListProps from "./props/PostCardsListProps";
import style from "./style/PostCardsListStyle";
import PostCard from "../postCard/PostCard";
import { noImageGradientColors } from "../../constants/ThemeConstants";
import { FlashList } from "@shopify/flash-list";

const PostCardsList = (props : PostCardsListProps) => {
    
    return (
        <View style={[style.postsListContainer]}>
            <FlashList
                data={props.posts}
                estimatedItemSize={props.estimatedItemSize}
                showsVerticalScrollIndicator={false}
                overScrollMode={props.overScrollMode}
                numColumns={props.numberOfColumns ?? 1}
                ItemSeparatorComponent={() =>
                    <View style={{height: 20}}></View>}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity
                            onPress={() => props.onPostCardPress(item)}
                            style={[style.postElement, {width: props.itemWidth}]}>
                            <PostCard
                                informationBarSyle={{height: 70}}
                                key={item.id}
                                owner={item.user.firstName}
                                ownerImage={item.user.picturePath}
                                price={item.price}
                                title={item.title}
                                subtitle={item.shortDescription}
                                image={item.blobPaths ? item.blobPaths[0] : undefined}
                                gradientColors={noImageGradientColors[item.id%3]}/>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    )
}

export default PostCardsList;