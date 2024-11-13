import Toast, { ErrorToast, InfoToast, ToastConfig } from "react-native-toast-message";
import { ColorConstants } from "../../constants/ThemeConstants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";

const Popup = () => {
    const insets = useSafeAreaInsets();

    const toastConfig : ToastConfig = {
        error: (props) => (
            <ErrorToast
                {...props}
                style={{
                    backgroundColor: ColorConstants.red,
                    borderLeftColor: ColorConstants.red70PercentColor
                }}
                text1Style={{
                    color: ColorConstants.whiteMainColor,
                    fontSize: 15
                }}
                text2Style={{
                    color: ColorConstants.whiteMainColor,
                    opacity: 0.7,
                    fontSize: 14,
                }}
                text2NumberOfLines={2}
            />
        ),
        info: (props) => (
            <InfoToast
                {...props}
                style={{
                    backgroundColor: ColorConstants.blue,
                    borderLeftColor: ColorConstants.blue70PercentColor
                }}
                text1Style={{
                    color: ColorConstants.whiteMainColor,
                    fontSize: 15,
                }}
                text2Style={{
                    color: ColorConstants.whiteMainColor,
                    opacity: 0.7,
                    fontSize: 14,
                }}
                text2NumberOfLines={2}
            />
        ),
        success : (props) => (
            <InfoToast
                {...props}
                style={{
                    backgroundColor: ColorConstants.green,
                    borderLeftColor: ColorConstants.green70PercentColor
                }}
                text1Style={{
                    color: ColorConstants.whiteMainColor,
                    fontSize: 15
                }}
            />
        )
    }

    return (
        <Toast config={toastConfig} topOffset={Platform.OS === "android" ? undefined : insets.top}/>
    )
}

export default Popup