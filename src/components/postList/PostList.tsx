import { FlatList, TouchableHighlight, View } from "react-native";
import PostListProps from "./props/PostListProps";
import style from "./style/PostListStyle";
import MainText from "../../modules/text/MainText";
import EllipseFilledSVG from "../../../images/ellipseFilled.svg"
import { PostStatusToColor, PostStatusToString } from "../../models/enums/EPostStatus";

const PostList = (props : PostListProps) => {
    return (
       <FlatList
        style={[style.container, props.style]}
        data={props.posts}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) =>
            <TouchableHighlight
                style={[style.post, props.itemStyle]}
                onPress={() => props.onPress(item)}>
                
                <>
                    <MainText text={item.title} fontSize={14}/>
                    <View style={style.status}>
                        <MainText text={PostStatusToString(item.status)} fontSize={14}/>
                        <EllipseFilledSVG color={PostStatusToColor(item.status)} width={13} height={13}/>
                    </View>
                </>
            </TouchableHighlight>}>
       </FlatList>
   ); 
}

export default PostList