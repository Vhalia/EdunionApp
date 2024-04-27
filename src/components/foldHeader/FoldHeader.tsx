import { View } from "react-native"
import FoldHeaderProps from "./props/foldHeaderProps"
import styles from "./style/foldHeaderStyle"
import Animated, { Easing, clamp, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const FoldHeader = (props: FoldHeaderProps) => {
    let baseHeight = props.baseHeight ?? 200;
    let minHeight = props.minHeight ?? 50;
    let maxHeight = props.maxHeight ?? props.baseHeight ?? 200;

    const animatedStyle = useAnimatedStyle(() => {
        let heightValue = clamp(
            baseHeight - (props.swipeProgress.value*1.01),
            minHeight,
            maxHeight)

        const height = withTiming(
            heightValue,
            {
                duration: 50,
                easing: Easing.out(Easing.ease)
            }
        );
        
        let style = {
            height: height,
        };

        return style
    });

    return (
        <Animated.View style={[styles.mainContainer, animatedStyle, props.style]}>
            {props.children}
        </Animated.View>
    );
};

export default FoldHeader