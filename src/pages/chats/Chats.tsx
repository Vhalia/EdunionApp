import { Dimensions, FlatList, Image, StyleSheet, TouchableHighlight, View } from "react-native";
import styles from "./style/chatStyle";
import Header from "../../components/header/Header";
import MainText from "../../modules/text/MainText";
import { useContext, useEffect, useState } from "react";
import  ChatType from "../../models/Chat";
import useChatService from "../../hooks/useChatService";
import Context from "../../contexts/AuthContext/AuthContext";
import Loading from "../../modules/Loading/Loading";
import ChatMessageType from "../../models/ChatMessage";
import { FlashList } from "@shopify/flash-list";
import { ColorConstants } from "../../constants/ThemeConstants";
import { useNavigation } from "@react-navigation/native";

const Chats = () => {
    const [chats, setChats] = useState<ChatType[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation<any>();
    const chatService = useChatService()

    useEffect(() => {
        setIsLoading(true)

        chatService.get().then(chats => {
            setChats([...chats])
            setIsLoading(false)
        }).catch(err => {
            console.log(err)
            setIsLoading(false)
        })
    }, [])

    const onPressChat = (chat: ChatType) => {
        navigation.navigate('Chat', {chat: chat})
    }

    return (
        <View style={styles.container}>
            <Header style={styles.header}>
                <MainText weight={'700'} fontSize={20} text={"Messages"} />    
            </Header>
            {isLoading
                ? <Loading />
                :
                    <FlatList
                        style={style.listContainer}
                        data={chats}
                        renderItem={({index, item}) => (
                            <TouchableHighlight
                                key={index}
                                onPress={() => onPressChat(item)}
                                underlayColor={ColorConstants.transparent}>
                                <View style={style.chatContainer}>
                                    <Image
                                        source={item.post.blobPaths ? {uri: item.post.blobPaths[0]} : require("../../../images/defaultProfilePicture.png")}
                                        style={[style.imageStyle, {width: 50, height: 50}]}
                                        resizeMode="cover"
                                        borderRadius={55}/>
                                    <View style={style.textsContainer}>
                                        <MainText
                                            fontSize={14}
                                            text={item.post.title}/>
                                        <MainText
                                            fontSize={13}
                                            fontColor={ColorConstants.white70PercentColor}
                                            text={item.messages[item.messages.length - 1].message}/>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        )}/>
            }
        </View>
    )
}

const style = StyleSheet.create({
    listContainer: {
        margin: 10
    },
    chatContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    textsContainer: {
        gap: 2
    },
    imageStyle: {
        margin: 10,
        width: 50,
        height: 50
    },
})

export default Chats;