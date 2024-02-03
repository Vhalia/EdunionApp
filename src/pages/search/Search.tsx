import { Text } from "react-native-svg";
import MainText from "../../modules/text/MainText";
import { View } from "react-native";
import styles from "./style/searchStyle"
import SearchBar from "../../components/searchBar/SearchBar";
import { ColorConstants } from "../../constants/ThemeConstants";

const Search = () => {
    return(
        <View style={styles.mainContainer}>
            {/*header*/}
            <View style={styles.header}>
                <SearchBar
                    onPressSearch={() => {}}
                    dropDownStyle={{backgroundColor: ColorConstants.blackMainColor}}
                    style={styles.seachBarStyle}>

                </SearchBar>
            </View>
        </View>
    );
}

export default Search