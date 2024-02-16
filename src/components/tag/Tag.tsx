import { TouchableHighlight, View } from "react-native";
import TagProps from "./props/tagProps";
import MainText from "../../modules/text/MainText";
import styles from "./style/tagStyle";
import { ColorConstants } from "../../constants/ThemeConstants";

const Tag = (props : TagProps) => {
    const activeStyle = props.active
        ? {backgroundColor: ColorConstants.purpleMainColor}
        : {backgroundColor: ColorConstants.blackMainColor};

    return (
        <TouchableHighlight
            style={[styles.tagContainer, activeStyle]}
            onPress={props.onPress}>
            <MainText
                weight={'500'}
                fontSize={12}
                text={props.tag}
                style={styles.tagText}/>
        </TouchableHighlight>
    )
}

export default Tag;