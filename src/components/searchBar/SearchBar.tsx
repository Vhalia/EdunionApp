import { View } from "react-native";
import IconDropDown from "../../modules/dropDown/iconDropDown/IconDropDown";
import Book from "../../../images/book.svg"
import Course from "../../../images/course.svg"
import { ColorConstants } from "../../constants/ThemeConstants";

const SearchBar = () => {
    return(
        <View>
            <IconDropDown style={{backgroundColor: ColorConstants.purpleMainColor}}>

                <Book color={"#ffffff"} />
                <Course color={"#ffffff"}/>
            
            </IconDropDown>
        </View>
    );
}

export default SearchBar;