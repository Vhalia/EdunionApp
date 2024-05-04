import { FlatList, TouchableHighlight, TouchableOpacity, View } from "react-native";
import SelectListProps from "./props/selectListProps";
import styles from "./style/selectListStyle";
import EllipseSVG from "../../../images/ellipse.svg";
import EllipseFilledSVG from "../../../images/ellipseFilled.svg";
import { useState } from "react";
import MainText from "../text/MainText";

const SelectList = (props : SelectListProps) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    
    const onPress = (index: number) =>
    {
        setSelectedIndex(index);
        props.onSelect(index);   
    }

    return (
        <View style={[props.style, styles.container]}>
            <FlatList
                data={props.data}
                renderItem={({item, index}) => {
                    return (
                    <TouchableOpacity
                        onPress={() => onPress(index)}
                        activeOpacity={0.6}> 
                        <View style={[props.elementStyle, styles.element]}>
                            {selectedIndex == index
                            ? <EllipseFilledSVG color={props.ellipseSelectedColor}/>
                            : <EllipseSVG color={props.ellipseColor} />}
                            <MainText fontSize={props.fontSize ?? 12} text={item} weight={"500"} style={{marginLeft: 10}}/>
                        </View>
                    
                    </TouchableOpacity>
                    )}} />
        </View>  
    );
}

export default SelectList;