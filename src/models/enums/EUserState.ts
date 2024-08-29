import { ColorConstants } from "../../constants/ThemeConstants";

enum EUserState {
   INACTIVE = "INACTIVE",
   PENDING = "PENDING",
   ACTIVE = "ACTIVE",
   BANNED = "BANNED" 
}

const UserStateToString = (state : EUserState)=> {
   switch(state) {
       case EUserState.ACTIVE:
           return "Actif";
       case EUserState.BANNED:
           return "Banni"
       case EUserState.INACTIVE:
           return "Inactif"
      case EUserState.PENDING:
           return "En attente"
       default:
           return ""
   }
}

const FromStringUserStateToEnum = (state : string)=> {
   switch(state) {
       case "Actif":
           return EUserState.ACTIVE;
       case "Banni":	
           return EUserState.BANNED;
       case "Inactif":
           return EUserState.INACTIVE;
       case "En attente":
           return EUserState.PENDING
   }
}

const UserStateToColor = (state : EUserState)=> {
   switch(state) {
       case EUserState.ACTIVE:
           return ColorConstants.green
       case EUserState.BANNED:
           return ColorConstants.red
       case EUserState.INACTIVE:
           return ColorConstants.greyLightColor
      case EUserState.PENDING:
           return ColorConstants.blue
       default:
           return "#000000"
   }
}

export default EUserState

export {UserStateToString, UserStateToColor, FromStringUserStateToEnum}