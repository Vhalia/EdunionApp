import { Dimensions, FlatList, Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableHighlight, View } from "react-native";
import MainText from "../../modules/text/MainText";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import  ChatType from "../../models/Chat";
import Context from "../../contexts/AuthContext/AuthContext";
import Loading from "../../modules/Loading/Loading";
import ChatMessageType from "../../models/ChatMessage";
import { FlashList } from "@shopify/flash-list";
import { ColorConstants } from "../../constants/ThemeConstants";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LogLevel, HubConnectionBuilder, HubConnection} from "@microsoft/signalr"
import SendSVG from "../../../images/send.svg";
import MainInput from "../../components/mainInput/MainInput";
import dayjs from "dayjs";
import TimezoneContext from "../../contexts/TimezoneContext/TimezoneContext";
import useChatService from "../../hooks/useChatService";
import Config from "react-native-config";
import { SafeAreaView } from "react-native-safe-area-context";
import FastImage from "react-native-fast-image";

const Chat = (props: ChatProps) => {
    const route = useRoute();
    const routeParams = route.params as ChatProps;

    const [chat, setChat] = useState<ChatType>();
    const [text, setText] = useState<string>("");
    const listRef = useRef<FlatList<ChatMessageType>>(null);
    const [signalRConnection, setSignalRConnection] = useState<HubConnection>();
    const [getChatIsLoading, setGetChatIsLoading] = useState(false);
    const [signalRIsLoading, setSignalRIsLoading] = useState(false);
    
    const authContext = useContext(Context);
    const chatService = useChatService();
    const timezoneContext = useContext(TimezoneContext);
    const navigation = useNavigation<any>()
    
    const senderUserId = authContext?.currentUser?.id;
    const receiverUserId = chat?.user1.id == senderUserId ? chat?.user2?.id : chat?.user1?.id;

    useEffect(() => {
        if (routeParams.chat){
            routeParams.chat.messages.sort((a, b) => dayjs(b.date).diff(dayjs(a.date)))
            setChat(routeParams.chat)
            return;
        }
        
        if (routeParams.chatId){
            setGetChatIsLoading(true)
            chatService.getById(routeParams.chatId).then((chat) => {
                chat.messages.sort((a, b) => dayjs(b.date).diff(dayjs(a.date)))
                setChat(chat)
                setGetChatIsLoading(false)
            }).catch((err) => {
                console.log(err)
                setGetChatIsLoading(false)
            })
        }
    }, [])

    useEffect(() => {
        setSignalRIsLoading(true)

        let connection = new HubConnectionBuilder()
            .withUrl(Config.BASE_URL+"/chatHub", {
                accessTokenFactory: () => authContext?.token ?? "",
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();
    
        connection.start().then(() => {
            setSignalRIsLoading(false)
            setSignalRConnection(connection);
        }).catch(err => {
            console.log(err)
            setSignalRIsLoading(false)
        })
    
        connection.on("ReceiveMessage", (userId, postId, message, date) => {
            setChat({
                ...chat!,
                messages: [{
                    message: message,
                    sourceUserId: userId,
                    date: date
                }, ...chat!.messages]
            })
        });

        return () => {
            connection.stop().catch(err => console.log(err))
        }
    }, [])

    const onPressSend = () => {
        if (text === ""){
            return;
        }
        signalRConnection?.send("SendMessage", receiverUserId, chat?.post.id, text)
            .catch(err => console.log(err))
        setChat({
            ...chat!,
            messages: [{
                message: text,
                sourceUserId: senderUserId!,
                date: new Date()
            }, ...chat!.messages]
        })
        setText("")
    }

    return (
        <View style={style.mainContainer}>
            {getChatIsLoading || signalRIsLoading ? <Loading /> : 
                <View style={style.container}>
                    <TouchableHighlight
                        style={style.postInChat}
                        onPress={() => navigation.navigate("Post", {postId: chat?.post.id})}>
                        <>
                            <FastImage
                                source={chat?.post.blobPaths && chat?.post.blobPaths.length > 0 ? {uri: chat.post.blobPaths[0]} : require("../../../images/defaultProfilePicture.png")}
                                style={[style.postInChatImageStyle, {width: 50, height: 50, borderRadius: 55}]}
                                resizeMode={FastImage.resizeMode.cover}/>
                            <View>
                                <MainText
                                    fontSize={14}
                                    text={chat?.post.title ?? ""}/>
                                <MainText
                                    fontSize={13}
                                    fontColor={ColorConstants.white70PercentColor}
                                    text={"Gratuit"}/>
                            </View>
                        </>
                    </TouchableHighlight>

                    <FlatList
                        ref={listRef}
                        data={chat?.messages ?? []}
                        style={style.messagesList}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => (
                            <View style={style.separator}></View>
                        )}
                        inverted
                        overScrollMode="never"
                        renderItem={({index, item}) => {
                            return (
                                <ChatMessage
                                previousMessage={chat?.messages[index - 1]}
                                message={item}
                                type={item.sourceUserId == senderUserId ? 'sender' : 'receiver'}/>
                            )
                        }}/>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={style.inputContainer}
                        keyboardVerticalOffset={100}>
                            <MainInput
                                value={text}
                                autoCapitalize="sentences"
                                onLosingFocus={() => Keyboard.dismiss()}
                                onChange={(text) => setText(text)}
                                placeholder="Message"
                                placeholderColor={ColorConstants.white70PercentColor}
                                containerStyle={style.input}/>
                            <TouchableHighlight
                                onPress={onPressSend}
                                style={style.sendButton}>
                                    <SendSVG fill={ColorConstants.whiteMainColor} width={20} height={20} />
                            </TouchableHighlight>
                        </KeyboardAvoidingView>
                </View>
            }
        </View>
    )
}

const ChatMessage = (props: ChatMessageProps) => {

    const timezoneContext = useContext(TimezoneContext);

    const formatDate = (date: Date) => {
        let now = dayjs();
        let timezone = timezoneContext?.getTimezone();
        let dateTime = dayjs.tz(date.toString(), timezone);

        if (!dateTime.isValid())
            return "";

        if (now.year === dateTime.year)
            return dateTime.format("D MMM HH:mm");

        return dateTime.format("D MMM YYYY HH:mm")
    }

    return (
        <View style={[style.messageContainer]}>
            <MainText
                text={props.message.message}
                fontSize={14}
                fontColor={ColorConstants.whiteMainColor}
                style={[
                    style.message,
                    props.type == 'sender' ? style.messageSender : style.messageReceiver]}/>
            <MainText
                text={props.message.date ? formatDate(props.message.date) : ""}
                fontSize={11}
                fontColor={ColorConstants.white70PercentColor}
                style={props.type == 'sender' ? {alignSelf: "flex-end"} : {alignSelf: "flex-start"}}/>
        </View>
    )
}

interface ChatProps {
    chat?: ChatType,
    chatId?: number
}

interface ChatMessageProps {
    previousMessage?: ChatMessageType,
    message: ChatMessageType,
    type: 'sender' | 'receiver',
}

const style = StyleSheet.create({
    mainContainer: {
        display: "flex",
        flexGrow: 1,
        marginTop: 20,
        marginRight: 20,
        marginLeft: 20,
    },
    container: {
        display: "flex",
        flex: 1
    },
    messagesList: {
        flex: 0.9
    },
    separator: {
        height: 20
    },
    messageContainer: {
        display: "flex",
        gap: 3
    },
    messageSender: {
        backgroundColor: ColorConstants.purpleMainColor,
        alignSelf: "flex-end"
    },
    messageReceiver: {
        backgroundColor: ColorConstants.greyLightColor,
        alignSelf: "flex-start"
    },
    message: {
        padding: 10,
        borderRadius: 17,
        overflow: "hidden"
    },
    inputContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        gap: 10,
        flex: 0.1,
        marginTop: 20
    },
    sendButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
        borderRadius: 50,
        backgroundColor: ColorConstants.purpleMainColor,
    },
    input: {
        backgroundColor: ColorConstants.blackSecondaryColor,
        borderRadius: 14,
        height: 40
    },
    postInChatImageStyle: {
        margin: 10,
        width: 50,
        height: 50
    },
    postInChat: {
        backgroundColor: ColorConstants.greyMainColor,
        borderRadius: 10,
        padding:3,
        marginLeft: 50,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default Chat;
