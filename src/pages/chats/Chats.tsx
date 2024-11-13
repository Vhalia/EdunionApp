import { FlatList, Image, Platform, StyleSheet, TouchableHighlight, View } from "react-native";
import styles from "./style/chatStyle";
import Header from "../../components/header/Header";
import MainText from "../../modules/text/MainText";
import { useCallback, useContext, useEffect, useState } from "react";
import  ChatType from "../../models/Chat";
import useChatService from "../../hooks/useChatService";
import Loading from "../../modules/Loading/Loading";
import { ColorConstants } from "../../constants/ThemeConstants";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import Context from "../../contexts/AuthContext/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

const Chats = () => {
    const [chats, setChats] = useState<ChatType[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation<any>();
    const chatService = useChatService()
    const authContext = useContext(Context);

    useEffect(() => {
        reloadChats()
    }, [])

    useFocusEffect(
        useCallback(() => {
            reloadChats()
        }, [])
    )
    
    const reloadChats = () => {
        setIsLoading(true)
    
        chatService.get().then(chats => {
            setChats([
                ...chats.sort((a, b) => dayjs(b.lastModificationDate).diff(dayjs(a.lastModificationDate)))
            ])
            setIsLoading(false)
        }).catch(err => {
            console.log(err)
            setIsLoading(false)
        })
    }

    const determineOtherUser = (chat: ChatType) => {
        return chat?.user1.id == authContext?.currentUser?.id ? chat?.user2 : chat?.user1;
    }

    const onPressChat = (chat: ChatType) => {
        navigation.navigate('Chat', {chat: chat})
    }
    
    return (
        <View style={styles.container}>
            <SafeAreaView style={[{backgroundColor: ColorConstants.blackSecondaryColor}, Platform.OS == "android" ? {padding: 30} : {}]}>
                <Header style={styles.header}>
                    <MainText weight={'700'} fontSize={20} text={"Messages"} />    
                </Header>
            </SafeAreaView>
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
                                        source={item.post.blobPaths && item.post.blobPaths.length > 0 ? {uri: item.post.blobPaths[0]} : require("../../../images/defaultProfilePicture.png")}
                                        style={[style.imageStyle, {width: 50, height: 50}]}
                                        resizeMode="cover"
                                        borderRadius={55}/>
                                    <View style={style.textsContainer}>
                                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <MainText
                                                fontSize={14}
                                                text={item.post.title}/>
                                            <MainText
                                                fontSize={13}
                                                text={dayjs(item.lastModificationDate).format("DD/MM/YYYY")}
                                                fontColor={ColorConstants.white70PercentColor}/>
                                        </View>
                                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <MainText
                                                fontSize={13}
                                                fontColor={ColorConstants.white70PercentColor}
                                                text={item.messages[item.messages.length - 1]?.message}/>
                                            <MainText
                                                fontSize={13}
                                                fontColor={ColorConstants.white70PercentColor}
                                                text={determineOtherUser(item)?.firstName + " " + determineOtherUser(item)?.lastName}/>
                                        </View>
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
        gap: 2,
        flexShrink: 0,
        flexGrow: 1
    },
    imageStyle: {
        margin: 10,
        width: 50,
        height: 50
    },
})

export default Chats;