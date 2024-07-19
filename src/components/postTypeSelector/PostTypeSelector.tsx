import { StyleProp, StyleSheet, TouchableHighlight, View, ViewProps, ViewStyle } from "react-native"
import MainText from "../../modules/text/MainText"
import BookSVG from "../../../images/book.svg"
import CourseSVG from "../../../images/course.svg"
import { ColorConstants } from "../../constants/ThemeConstants"
import EPostType from "../../models/enums/EPostType"
import { useEffect, useState } from "react"

const PostTypeSelector = (props: PostTypeSelectorProps) => {
    const [postType, setPostType] = useState<EPostType|undefined>(
        props.canSelectNone ? undefined : (props.postType ?? EPostType.BOOK));

    useEffect(() => {
        setPostType(props.postType);
    }, [props.postType])

    const applyTypeButtonStyle = (selectedPostType: EPostType) => {
        if (postType === selectedPostType) {
            return styles.activeTypeButton;
        }
        return {
            backgroundColor: props.inactiveTypeBackgroundColor ?? styles.inactiveTypeButton.backgroundColor,
            color: props.inactiveTypeColor ?? styles.inactiveTypeButton.color
        };
    }
    
    const onPressType = (selectedPostType: EPostType) => {
        if (props.canSelectNone && selectedPostType === postType) {
            setPostType(undefined)
            props.onChange && props.onChange(undefined)
            return;
        }

        setPostType(selectedPostType);
        props.onChange && props.onChange(selectedPostType)
    }


    return (
        <View style={[styles.typeButtonsContainer, styles.minorGap, props.style]}>
                                
        <TouchableHighlight
            onPress={() => onPressType(EPostType.BOOK)}
            underlayColor={ColorConstants.transparent}>
            <View
                style={[styles.type, applyTypeButtonStyle(EPostType.BOOK)]}>
                <BookSVG color={applyTypeButtonStyle(EPostType.BOOK).color} />
                <MainText
                    weight={'700'}
                    fontSize={12}
                    text="Livre"
                    style={[styles.typeButtonText, applyTypeButtonStyle(EPostType.BOOK)]}/> 
            </View>
        </TouchableHighlight>
        <TouchableHighlight
            onPress={() => onPressType(EPostType.COURSE)}
            underlayColor={ColorConstants.transparent}>
            <View
                style={[styles.type, applyTypeButtonStyle(EPostType.COURSE)]}>
                <CourseSVG color={applyTypeButtonStyle(EPostType.COURSE).color} />
                <MainText
                    weight={'700'}
                    fontSize={12}
                    text="Cours"
                    style={[styles.typeButtonText, applyTypeButtonStyle(EPostType.COURSE)]}/> 
            </View>
        </TouchableHighlight>

    </View>
    )
}

interface PostTypeSelectorProps{
    postType? : EPostType,
    onChange? : (postType?: EPostType) => void,
    style? : StyleProp<ViewStyle>,
    inactiveTypeBackgroundColor? : string,
    inactiveTypeColor? : string,
    canSelectNone?: boolean
}

const styles = StyleSheet.create({
    typeButtonsContainer : {
        display: 'flex',
        flexDirection: 'row',
        width: "80%",
        alignItems: 'center'
    },
    type : {
        padding: 10,
        borderRadius: 14,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 10
    },
    activeTypeButton : {
        backgroundColor: ColorConstants.purpleMainColor,
        color: ColorConstants.whiteMainColor,
    },
    inactiveTypeButton : {
        backgroundColor: ColorConstants.greyMainColor,
        color: ColorConstants.white70PercentColor,
    },
    typeButtonText : {
        marginLeft: 5,
    },
    gap: {
        marginTop: 20
    },
    minorGap: {
        marginTop: 5
    },
})

export type {PostTypeSelectorProps}

export default PostTypeSelector