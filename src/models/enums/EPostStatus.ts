import { ColorConstants } from "../../constants/ThemeConstants";

enum EPostStatus {
    CREATED = "CREATED",
    AVAILABLE = "AVAILABLE" ,
    UNAVAILABLE = "UNAVAILABLE",
}

const PostStatusToString = (status : EPostStatus)=> {
    switch(status) {
        case EPostStatus.CREATED:
            return "Créé";
        case EPostStatus.AVAILABLE:
            return "Disponible"
        case EPostStatus.UNAVAILABLE:
            return "Indisponible"
        default:
            return ""
    }
}

const PostStatusToColor = (status : EPostStatus)=> {
    switch(status) {
        case EPostStatus.CREATED:
            return ColorConstants.blue
        case EPostStatus.AVAILABLE:
            return ColorConstants.green
        case EPostStatus.UNAVAILABLE:
            return ColorConstants.red
        default:
            return "#000000"
    }
}

export default EPostStatus
export {PostStatusToString, PostStatusToColor}