import { View } from "react-native"
import UserContactProps from "./props/userContactProps"
import InstagramSVG from "../../../images/instagram.svg"
import MessengerSVG from "../../../images/messenger.svg"
import WhatsappSVG from "../../../images/whatsapp.svg"
import EmailSVG from "../../../images/email.svg"
import PhoneSVG from "../../../images/phone.svg"
import style from "./style/userContactStyle"
import EContactType from "../../models/enums/EContactType"
import MainText from "../../modules/text/MainText"
import { ColorConstants } from "../../constants/ThemeConstants"

const UserContact = (props : UserContactProps) => {
    let iconSize = props.iconSize ?? 25
    
    return (
        <View style={[style.mainContainer, props.style]}>
            {props.contacts.map((contact, index) => {
                return (
                    <View style={style.container} key={index}>
                        {contact.type == EContactType.INSTAGRAM && <InstagramSVG width={iconSize} height={iconSize}/>}                        
                        {contact.type == EContactType.MESSENGER && <MessengerSVG width={iconSize} height={iconSize}/>}                        
                        {contact.type == EContactType.WHATSAPP && <WhatsappSVG width={iconSize} height={iconSize}/>}
                        {contact.type == EContactType.EMAIL && <EmailSVG width={iconSize} height={iconSize} color={ColorConstants.purpleMainColor}/>}
                        {contact.type == EContactType.PHONE && <PhoneSVG width={iconSize} height={iconSize} color={ColorConstants.purpleMainColor}/>}
                        <MainText
                            text={contact.value}
                            fontSize={12}
                            style={style.text}
                        />
                    </View>
                )
            })}
        </View>
    )
}

export default UserContact