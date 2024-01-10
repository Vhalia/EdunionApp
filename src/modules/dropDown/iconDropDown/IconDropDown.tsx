import { Button, Modal, Pressable, StyleProp, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import {IIconDropDownProps, IIconDropdownElementProps} from "./props/props";
import { ReactElement, useRef, useState } from "react";
import ArrowDown from "../../../../images/arrowDown.svg"
import styles from "./style/style";
import { ColorConstants } from "../../../constants/ThemeConstants";
import { getElement, map } from "../../../utils/utils";
import IconDropdownElement from "./IconDropdownElement";

const IconDropDown = (props : IIconDropDownProps) => {

    const [isActive, setActive] = useState(false);
    const [activeElementIndex, setActiveElementIndex] = useState(0)
    const [dropDownListOriginPosition, setDropDownListOriginPosition] = useState({x: 0, y: 0});
    const DropdownButton = useRef<TouchableHighlight>(null);
    
    const onPressDropdownElement = (index : number) => {
        setActiveElementIndex(index)
        setActive(!isActive);
    }

    const onPressDropdown = () => {
        DropdownButton.current?.measure((x, y, width, height, pageX, pageY) => {
            let pos = {
                x : pageY,
                y:  pageX
            }
            setDropDownListOriginPosition(pos);
        })
        setActive(!isActive);
    }

    const setDropdownElementStyle = (indexOfElement: number) : StyleProp<ViewStyle> => {
        if (indexOfElement == activeElementIndex)
        {
            return  {backgroundColor: ColorConstants.purpleMainColor}
        }

        return {backgroundColor: ColorConstants.greyLightColor}
    }

    const createDropdownElementButton = (
        index: number,
        onPress : (index: number) => void) => {

        let dropdownElement = getElement(props.children, index)

        return (
            <TouchableHighlight
                onPress={() => onPress(index)}
                key={index}>

                    <IconDropdownElement
                        icon={dropdownElement.props.icon}
                        text={dropdownElement.props.text}
                        containerStyle={[styles.dropdownElement, setDropdownElementStyle(index)]}
                    />
            
            </TouchableHighlight>)
    }

    const displayDropdownElements = (onPress : (index: number) => void) => {
        return [
            createDropdownElementButton(activeElementIndex, (index) => onPress(index)),
            ...map(props.children, (c, i ,a) => {
                if (i == activeElementIndex)
                {
                    return;
                }
                
                return createDropdownElementButton(
                    i,
                    (index) => onPress(index))
            })
        ]
    }

    return(
        <View>
            <Modal
                visible={isActive}
                transparent={true}>
                
                <Pressable
                    onPress={() => setActive(false)}
                    style={styles.overlay}>

                    <View style={[styles.dropdownElementContainer, { top: dropDownListOriginPosition.x, left: dropDownListOriginPosition.y }]}>
                        {displayDropdownElements(onPressDropdownElement)}
                    </View>

                </Pressable>

            </Modal>

            <View style={styles.mainView}>

                <TouchableHighlight onPress={onPressDropdown} ref={DropdownButton}>

                    <View style={[styles.button, props.style]}>
                        
                        {getElement(props.children, activeElementIndex).props.icon}

                        <View style={styles.arrow}>
                            <ArrowDown color={"#ffffff"}/>
                        </View>

                    </View>

                </TouchableHighlight>
            </View>
        </View>
    );
}

export default IconDropDown;