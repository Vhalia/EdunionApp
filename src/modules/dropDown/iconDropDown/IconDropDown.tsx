import { Modal, Pressable, TouchableHighlight, TouchableOpacity, View } from "react-native";
import IIconDropDownProps from "./props/props";
import { ReactElement, useRef, useState } from "react";
import ArrowDown from "../../../../images/arrowDown.svg"
import styles from "./style/style";

const IconDropDown = (props : IIconDropDownProps) => {
    const [isActive, setActive] = useState(false);
    const [activeIcon, setActiveIcon] = useState<ReactElement>(props.children[0])
    const [dropDownListTopPosition, setDropDownListTopPosition] = useState(0);
    const DropdownButton = useRef<TouchableHighlight>(null);
    
    const onPressDropdownElement = (index : number) => {
        setActiveIcon(props.children[index])
        setActive(!isActive);
    }

    const onPressDropdown = () => {
        DropdownButton.current?.measure((x, y, width, height, pageX, pageY) => {
            const offset = 5
            setDropDownListTopPosition(offset + pageY + height);
        })
        setActive(!isActive);
    }

    return(
        <View>
            <Modal
                visible={isActive}
                transparent={true}>
                
                <Pressable
                    onPress={() => setActive(false)}
                    style={styles.overlay}>

                    <View style={[styles.dropDownElementContainer, { top: dropDownListTopPosition}]}>
                        {props.children.map((c, i) => {
                            if (c == activeIcon)
                                return;

                            return (
                                <TouchableOpacity
                                    key={i}
                                    onPress={() => onPressDropdownElement(i)}
                                    style={styles.dropDownElement}>
                                    
                                    {c}

                                </TouchableOpacity>
                            );
                        })}
                    </View>

                </Pressable>
                

            </Modal>

            <View style={styles.mainView}>

                <TouchableHighlight onPress={() => onPressDropdown()} ref={DropdownButton}>

                    <View style={[styles.button, props.style]}>
                        
                        {activeIcon}

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