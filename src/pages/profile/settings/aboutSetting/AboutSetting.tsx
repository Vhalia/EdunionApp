import { View } from "react-native";
import MainText from "../../../../modules/text/MainText";

const AboutSetting = () => {
    return (
        <View>
            <View style={{marginTop: 10}}>
                <MainText fontSize={18} text={"Title 1"} weight="700"/>
                <MainText fontSize={15} text={"text content 1"} weight="500"/>
            </View>
        </View>
    );
}

export default AboutSetting