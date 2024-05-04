import LanguageSettingProps from "./props/languageSettingProps";
import styles from "./style/languageSettingStyle";
import { useEffect, useState } from "react";
import Language from "../../../../models/Language";
import { FlatList, TouchableOpacity, View } from "react-native";
import MainText from "../../../../modules/text/MainText";
import SelectList from "../../../../modules/SelectList/SelectList";
import { ColorConstants } from "../../../../constants/ThemeConstants";

const LanguageSetting = (props : LanguageSettingProps) => {
   const [languages, setLanguages] = useState<Language[]>([])
   const [selectedLanguage, selectLanguage] = useState<Language | undefined>(undefined)

   useEffect(() => {
        const languagesMoq = [
            {
               id: 1,
               key: 'en-GB',
               name: 'English' 
            },
            {
                id: 2,
                key: 'fr-BE',
                name: 'Français'
            },
            {
                id: 3,
                key: 'nl-BE',
                name: 'Dutch'
            }
        ]

        setLanguages([...languagesMoq])
   }, [])
    
   const onSelectLanguage = (index : number) => {
        selectLanguage(languages[index])       
   }
   
    return (
        <View style={[styles.container]}>
            <SelectList
                data={languages.map(l => l.name)}
                onSelect={onSelectLanguage}
                ellipseColor={ColorConstants.whiteMainColor}
                ellipseSelectedColor={ColorConstants.purpleMainColor}
                fontSize={15}
            />
        </View>
    );
}

export default LanguageSetting