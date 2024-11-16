import { Keyboard, TextInput, Touchable, TouchableWithoutFeedback, View } from "react-native";
import BookSVG from "../../../images/book.svg"
import CourseSVG from "../../../images/course.svg"
import ArrowDownSVG from "../../../images/arrowDown.svg"
import FitlerSVG from "../../../images/filter.svg"
import Search from "../../../images/search.svg"
import styles from "./style/searchBarStyle";
import IconDropdownElement from "../../modules/dropDown/iconDropDown/IconDropdownElement";
import ButtonWithIcon from "../../modules/buttonWithIcon/ButtonWithIcon";
import SearchBarProps from "./props/searchBarProps";
import { useEffect, useState } from "react";
import { ColorConstants } from "../../constants/ThemeConstants";
import IconDropDown from "../../modules/dropDown/iconDropDown/IconDropDown";

const SearchBar = (props : SearchBarProps) => {
    const [searchInputText, setSearchInputText] = useState(props.search ?? "");

    const sideButtonMode = props.sideButtonMode ?? 'dropdown'
    const buttonContainerStyle = sideButtonMode === 'dropdown' ? styles.dropDownContainer : styles.buttonContainer

    useEffect(() => {
        setSearchInputText(props.search ?? "")
    }, [props.search])

    const onSearchButtonPress = () => {
        Keyboard.dismiss();
        props.onPressSearch(searchInputText);
    }

    const onSearchInputTextChange = (text: string)  => {
        setSearchInputText(text);
    }

    return(
        <View
            style={[styles.mainContainer, props.style]}>
            <View style={[buttonContainerStyle, props.dropDownStyle]}>
                {sideButtonMode === 'dropdown' &&
                    <IconDropDown
                        style={styles.dropdownButton}>

                        <IconDropdownElement
                            icon={<BookSVG color={"#ffffff"} width={"20px"}/>}
                            text="Livres"/>
                        <IconDropdownElement
                            icon={<CourseSVG color={"#ffffff"} width={"20px"} />}
                            text="Cours" />
                            
                    </IconDropDown>
                }

                {sideButtonMode === 'button' &&
                    <ButtonWithIcon
                        containerStyle={[styles.button]}
                        onPress={() => props.onPressSideButton && props.onPressSideButton()}
                        underlayColor={ColorConstants.transparent}>
                        <FitlerSVG color={"#ffffff"} width={20} height={20} />
                    </ButtonWithIcon>
                }
            </View>

            <View style={styles.searchBarContainer}>
                <View style={styles.searchBarInputContainer}>
                    <TextInput
                        placeholder="Exemple: Néerlandais 4ème"
                        placeholderTextColor={ColorConstants.white70PercentColor}
                        inputMode="text"
                        style={styles.searchBarInput}
                        onChangeText={onSearchInputTextChange}
                        onSubmitEditing={onSearchButtonPress}
                        selectTextOnFocus
                        value={searchInputText}/>
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