import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View} from "react-native"
import StepForm from "./stepForm/StepForm";
import { useCallback, useEffect, useState } from "react";
import ProgressBar from "../../modules/progressBar/ProgressBar";
import { useSharedValue } from "react-native-reanimated";
import { ColorConstants } from "../../constants/ThemeConstants";
import MainText from "../../modules/text/MainText";
import { useNavigation } from "@react-navigation/native";

const MultiStepForm = (props: MultiStepFormProps) => {
    const stack = createNativeStackNavigator();
    const [step, setStep] = useState(props.step ?? 0)
    const progress = useSharedValue<number>(props.step ? step / (props.steps.length - 1) : 0)

    const onPressNext = () => {
        props.onNext && props.onNext(step)

        setStep(step+1)
        
        if (step == props.steps.length - 1){
            props.onPressSubmit && props.onPressSubmit();
        }

    }

    const onPressPrevious = () => {
        const previousStepIndex = step -1;

        setStep(previousStepIndex)

    }

    useEffect(() => {
        progress.set(step / (props.steps.length - 1))
    }, [step])

    return (
        <View style={styles.container}>
            <View style={styles.progressBarContainer}>
                <MainText text={props.steps[step].name.toUpperCase()} fontSize={14} weight="700"/>

                <ProgressBar
                    progress={progress}
                    backgroundColor={ColorConstants.greyLightColor}
                    progressColor={ColorConstants.purpleMainColor}
                    height={10}/>

                <MainText text={step+1 + " sur " + (props.steps.length)} fontSize={14} weight="700"/>
            </View>

            <stack.Navigator initialRouteName={props.steps[props.step ? props.step : 0].index.toString()} screenOptions={{headerShown: false}}>
                {props.steps.map((step, index) => (
                    <stack.Screen name={step.index.toString()} key={index} options={{animation: 'slide_from_right'}}>
                        {(screenProps) => <StepForm
                            {...screenProps}
                            step={step}
                            hasNext={step.index < props.steps.length - 1}
                            hasPrevious={step.index > 0}
                            onPressNext={onPressNext}
                            onPressPrevious={onPressPrevious}
                            onPressSubmit={props.onPressSubmit}
                            disablePreviousButton={props.disablePreviousButtons}
                            isLoading={props.isLoading}/>
                        }
                    </stack.Screen>
                ))}
            </stack.Navigator>
        </View>
    )
}

interface MultiStepFormProps {
    steps: Step[],
    onPressSubmit?: () => void,
    onNext? : (step: number) => void,
    step?: number,
    disablePreviousButtons?: boolean,
    isLoading?: boolean
}

export interface Step {
    renderContent: () => React.ReactElement,
    canGoNext?: () => boolean,
    name: string,
    index: number,
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
    },
    progressBarContainer: {
        marginTop: 30,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 70,
        display: "flex",
        gap: 5
    }
})

export default MultiStepForm;
