import { View } from "react-native";
import Form from "../../../../modules/form/Form";
import { SubmitResult } from "../../../../modules/form/props/FormProps";
import { ColorConstants } from "../../../../constants/ThemeConstants";
import { useContext } from "react";
import Context from "../../../../contexts/AuthContext/AuthContext";

const SecuritySetting = () => {
    const authContext = useContext(Context)
    
    const onSubmit = (results : SubmitResult[]) => {

    }
    
    return (
        <Form
            buttonTitle="Confirmer"
            onSubmit={onSubmit}
            inputConfig={[
                {
                    key: "email",
                    title: "Changez votre email",
                    placeholder: authContext?.currentUser?.email,
                },
                {
                    key: "password",
                    title: "Changez votre mot de passe",
                    placeholder: "**********",
                    secret: true,
                },
                {
                    key: "confirmPassword",
                    title: "Confirmez votre mot de passe",
                    placeholder: "**********",
                    secret: true,
                },
            ]}
            inputStyle={
                {
                    backgroundColor:ColorConstants.blackSecondaryColor,
                    color: ColorConstants.whiteMainColor,
                    borderRadius: 10,
                }}/>
    )
}

export default SecuritySetting;