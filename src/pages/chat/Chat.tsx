import { Dimensions, FlatList, Keyboard, StyleSheet, TouchableHighlight, View } from "react-native";
import MainText from "../../modules/text/MainText";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import  ChatType from "../../models/Chat";
import Context from "../../contexts/AuthContext/AuthContext";
import Loading from "../../modules/Loading/Loading";
import ChatMessageType from "../../models/ChatMessage";
import { FlashList } from "@shopify/flash-list";
import { ColorConstants } from "../../constants/ThemeConstants";
import { useRoute } from "@react-navigation/native";
import { LogLevel, HubConnectionBuilder, HubConnection} from "@microsoft/signalr"
import SendSVG from "../../../images/send.svg";
import MainInput from "../../components/mainInput/MainInput";

const Chat = (props: ChatProps) => {
    const route = useRoute();
    const routeParams = route.params as ChatProps;
    const chat = props.chat ?? routeParams?.chat;

    const [messages, setMessages] = useState<ChatMessageType[]>(chat?.messages ?? []);
    const [text, setText] = useState<string>("");
    const [scrollIndex, setScrollIndex] = useState<number>(0);
    const listRef = useRef<FlatList<ChatMessageType>>(null);
    const [signalRConnection, setSignalRConnection] = useState<HubConnection>();
    const [isLoading, setIsLoading] = useState(false);
    
    const authContext = useContext(Context);
    
    const senderUserId = authContext?.currentUser?.id;
    const receiverUserId = chat?.user1.id == senderUserId ? chat?.user2?.id : chat?.user1?.id;

    useEffect(() => {
        setIsLoading(true)
        let connection = new HubConnectionBuilder()
            .withUrl(process.env.BASE_URL+"/chatHub", {
                accessTokenFactory: () => authContext?.token ?? "",
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();
    
        connection.start().then(() => {
            setIsLoading(false)
            setSignalRConnection(connection);
        }).catch(err => {
            console.log(err)
            setIsLoading(false)
        })
    
        connection.on("ReceiveMessage", (userId, postId, message) => {
            setMessages([...messages, {
                message: message,
                sourceUserId: userId,
            }])
        });

        return () => {
            connection.stop().catch(err => console.log(err))
        }
    }, [])

    useEffect(() => {
        listRef.current?.scrollToIndex({index: scrollIndex})
    }, [scrollIndex])

    const onPressSend = () => {
        if (text === ""){
            return;
        }
        signalRConnection?.send("SendMessage", receiverUserId, chat?.post.id, text)
        setMessages([...messages, {
            message: text,
            sourceUserId: senderUserId!,
        }])
        setText("")
        setScrollIndex(messages.length-1)
    }

    return (
        <View style={style.mainContainer}>
            {isLoading ? <Loading /> : 
                <View style={style.container}>
                    <FlatList
                        ref={listRef}
                        data={messages}
                        style={style.messagesList}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => (
                            <View style={style.separator}></View>
                        )}
                        onScrollToIndexFailed={info => {
                            console.log(info)
                        }}
                        overScrollMode="never"
                        renderItem={({index, item}) => {
                            return (
                                <ChatMessage
                                    previousMessage={messages[index - 1]}
                                    message={item}
                                    type={item.sourceUserId == senderUserId ? 'sender' : 'receiver'}/>
                            )
                        }}/>
                    <View style={[style.inputContainer]}>
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
                    </View>
                </View>
            }
        </View>
    )
}

const ChatMessage = (props: ChatMessageProps) => {
    return (
        <View style={[style.messageContainer]}>
            <MainText
                text={props.message.message}
                fontSize={13}
                fontColor={ColorConstants.whiteMainColor}
                style={[
                    style.message,
                    props.type == 'sender' ? style.messageSender : style.messageReceiver]}/>
        </View>
    )
}

interface ChatProps {
    chat?: ChatType,
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
    },
    messageSender: {
        backgroundColor: ColorConstants.purpleMainColor,
        alignSelf: "flex-end",
    },
    messageReceiver: {
        backgroundColor: ColorConstants.greyLightColor,
        alignSelf: "flex-start",
    },
    message: {
        padding: 10,
        borderRadius: 18,
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
    }
})

export default Chat;
