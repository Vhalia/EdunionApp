import { TextInput, View } from "react-native";
import IconDropDown from "../../modules/dropDown/iconDropDown/IconDropDown";
import Book from "../../../images/book.svg"
import Course from "../../../images/course.svg"
import Search from "../../../images/search.svg"
import { ColorConstants } from "../../constants/ThemeConstants";
import MainText from "../../modules/text/MainText";
import styles from "./style/style";
import IconDropdownElement from "../../modules/dropDown/iconDropDown/IconDropdownElement";
import ButtonWithIcon from "../../modules/buttonWithIcon/ButtonWithIcon";
import SearchBarProps from "./props/props";

const SearchBar = (props : SearchBarProps) => {

    const onSearchButtonPress = () => {

    }

    return(
        <View style={[styles.mainContainer, props.style]}>
            <View style={styles.dropDownContainer}>
                <IconDropDown
                    style={styles.dropdownButton}>

                    <IconDropdownElement
                        icon={<Book color={"#ffffff"} width={"20px"}/>}
                        text="Livres"/>
                    <IconDropdownElement
                        icon={<Course color={"#ffffff"} width={"20px"} />}
                        text="Cours" />
                        
                </IconDropDown>
            </View>

            <View style={styles.searchBarContainer}>
                <View style={styles.searchBarInputContainer}>
                    <TextInput
                        placeholder="Exemple: Néerlandais 4ème"
                        inputMode="text"
                        style={styles.searchBarInput}
                        />
                    <ButtonWithIcon
                        style={styles.searchButton}
                        onPress={onSearchButtonPress}>

                        <Search color={"#ffffff"} width={"13px"} />
                        
                    </ButtonWithIcon>
                </View>
            </View>
        </View>
    );
}

export default SearchBar;