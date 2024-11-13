import { Linking, ScrollView, StyleSheet, TouchableHighlight, View } from "react-native";
import MainText from "../../../../modules/text/MainText";
import { ColorConstants } from "../../../../constants/ThemeConstants";

const AboutSetting = () => {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            overScrollMode="never">
            <View style={style.container}>
                <MainText fontSize={22} text={"À propos de Edunion"} weight="700"/>
                <View style={style.textContainer}>
                    <MainText fontSize={18} text={"Notre Mission"} weight="700"/>
                    <MainText fontSize={15} text={`Chez Edunion, notre mission est de faciliter l’échange de livres et la collaboration académique entre les élèves. Nous croyons fermement que l’accès aux ressources éducatives et l’entraide entre camarades sont essentiels pour réussir ses études. Nous sommes déterminés à créer une communauté où chaque étudiant peut maximiser son potentiel académique tout en économisant de l’argent, et oui car sur notre application tous les livres sont gratuits, une petite contribution peut être librement offerte à l’élève qui vous a vendu son livre pour le remercier d’avoir mis son livre à donner, mais celle ci n’est pas obligatoire.`}
                        weight="500"/>
                </View>
                <View style={style.textContainer}>
                    <MainText fontSize={18} text={"Qui Sommes-Nous ?"} weight="700"/>
                    <MainText fontSize={15} text={`Edunion a été fondée par Sacha, Alessio, et Alexandre, trois élèves passionnés par l’innovation et la technologie. Nous avons lancé cette mini-entreprise pour répondre à un besoin concret : permettre aux élèves de de se mettre en relation facilement pour vendre et acheter des livres d’occasion, afin de minimiser l’impact écologique que l’achat en neuf peut avoir, mais aussi vous faire économiser vos sous! L’application permet aussi de s’organiser des sessions d’entraide dans leurs cours, ça nous tenait à coeur d’implémenter ça car on pense que ça peut aider beaucoup d’élèves d’avoir un élève qui nous aide dés qu’on comprend pas quelque chose tout en aidant les autres élèves pour rendre l’appareil, se contact entre élèves apporte quelque chose en plus que juste demander à son professeur.`}
                        weight="500"/>
                </View>
                <View style={style.textContainer}>
                    <MainText fontSize={18} text={`Merci de nous faire confiance!`} weight="700"/>
                    <MainText fontSize={15} text={`Si tu lis ça c’est probablement que tu es sur l’application, merci de nous faire confiance! N’hésite surtout pas à nous contacter si il y a un soucis, ou si il y a quelque chose que tu aimerais voir sur notre application, on est toujours là pour aider!`}
                        weight="500"/>
                </View>
                <View style={style.textContainer}>
                    <MainText fontSize={18} text={"Contactez-nous !"} weight="700"/>
                    <TouchableHighlight onPress={() => Linking.openURL("mailto:edunionlje@gmail.com")}>
                        <MainText fontSize={15} text={"edunionlje@gmail.com"} weight="500" style={style.mail}/>
                    </TouchableHighlight>
                </View>
            </View>
        </ScrollView>
    );
}

const style = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 20,
        display: "flex",
        gap: 20
    },
    textContainer: {
        gap: 5
    },
    mail: {
        borderBottomWidth: 1,
        width: 155,
        borderColor: ColorConstants.whiteMainColor
    }
})

export default AboutSetting