import { TouchableHighlight, View } from "react-native";
import SubPageProps from "./props/subPageProps";
import styles from "./style/subPageStyle";
import LeftArrowSVG from "../../../images/leftArrow.svg"
import { ColorConstants } from "../../constants/ThemeConstants";
import { SafeAreaView } from "react-native-safe-area-context";

const SubPage = (props : SubPageProps) => {
    const mode = props.mode ?? 'normal';

    if (mode === 'fullscreen') {
        return <SubPageFullscreen {...props} />
    }

    return (
        <View style={{flex: 1, backgroundColor: ColorConstants.blackMainColor}}>
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
        </View>
    );
}

const SubPageFullscreen = (props : SubPageProps) => {
    const backButtonPosition = props.backButtonPosition ?? 'default';

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: ColorConstants.blackMainColor}}>
            <View style={styles.mainContainer}>
                <TouchableHighlight
                    onPress={() => props.navigation.goBack()}
                    underlayColor={ColorConstants.transparent}
                    style={(backButtonPosition === 'absolute') ? styles.backButtonContainerAbsolute : styles.backButtonContainerFullscreen}>
                    <LeftArrowSVG color={ColorConstants.whiteMainColor} width={12} height={12}/>
                </TouchableHighlight>

                <View style={styles.mainContainer}>
                    {props.renderContent()} 
                </View>
            </View>
        </SafeAreaView>
    );
}

export default SubPage;