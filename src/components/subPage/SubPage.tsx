import { TouchableHighlight, View } from "react-native";
import SubPageProps from "./props/subPageProps";
import styles from "./style/subPageStyle";
import LeftArrowSVG from "../../../../images/leftArrow.svg"
import { ColorConstants } from "../../constants/ThemeConstants";

const SubPage = (props : SubPageProps) => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.contentContainer}>
                <TouchableHighlight
                    onPress={() => props.navigation.goBack()}
                    underlayColor={ColorConstants.greyMainColor}
                    style={styles.backButtonContainer}>
                    <LeftArrowSVG color={ColorConstants.whiteMainColor}/>
                </TouchableHighlight>
               {props.renderContent()} 
            </View>
        </View>
    );
}

export default SubPage;