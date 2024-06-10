import { FlatList, TouchableHighlight, TouchableOpacity, View } from "react-native";
import SelectListProps from "./props/selectListProps";
import styles from "./style/selectListStyle";
import EllipseSVG from "../../../images/ellipse.svg";
import EllipseFilledSVG from "../../../images/ellipseFilled.svg";
import { useState } from "react";
import MainText from "../text/MainText";

const SelectList = (props : SelectListProps) => {
    const [selected, setSelected] = useState<string>(props.initialSelected ?? props.data[0]);

    const orientation = props.orientation ?? "vertical";

    const onPress = (value: string) =>
    {
        setSelected(value);
        props.onSelect(value);   
    }

    return (
        <View style={[styles.container, props.style]}>
            <FlatList
                data={props.data}
                horizontal={orientation === "horizontal"}
                renderItem={({item, index}) => {
                    return (
                    <TouchableOpacity
                        onPress={() => onPress(item)}
                        activeOpacity={0.6}> 
                        <View style={[styles.element, props.elementStyle, orientation == "horizontal" ? {} : {marginBottom: 10}]}>
                            {selected == item
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