import {
    Dimensions, FlatList,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    View
} from "react-native";
import {ThemeContext} from "../../store/context/theme";
import {useCallback, useContext, useMemo, useState} from "react";
import {AppContext} from "../../store/context/app";
import Ionicons from "react-native-vector-icons/Ionicons";
import Paragraph from "../../components/atoms/Paragraph";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import IconInput from "../../components/molecules/iconInput";

const ChatScreen = ({route}) => {
    const {userChat} = route.params;
    const {appTheme} = useContext(ThemeContext);

    const [messages, setMessages] = useState([
        {
            from: "Julio",
            date: "09/12/2023",
            value: "Hola",
            time: "14:30"
        },
        {
            from: "Julio",
            date: "09/12/2023",
            value: "Hola",
            time: "14:30"
        },
        {
            from: "Não é julio",
            date: "09/12/2023",
            value: "Hola",
            time: "14:30"
        },
        {
            from: "Julio",
            date: "09/12/2023",
            value: "Hola",
            time: "14:30"
        },
        {
            from: "Julio",
            date: "09/12/2023",
            value: "Hola",
            time: "14:30"
        },
        {
            from: "Não é julio",
            date: "09/12/2023",
            value: "Hola",
            time: "14:30"
        },
        {
            from: "Julio",
            date: "09/12/2023",
            value: "Hola",
            time: "14:30"
        },
        {
            from: "Julio",
            date: "09/12/2023",
            value: "Hola",
            time: "14:30"
        },
        {
            from: "Não é julio",
            date: "09/12/2023",
            value: "Hola",
            time: "14:30"
        },
        {
            from: "Julio",
            date: "09/12/2023",
            value: "Hola",
            time: "14:30"
        },
        {
            from: "Julio",
            date: "09/12/2023",
            value: "Hola",
            time: "14:30"
        },
        {
            from: "Não é julio",
            date: "09/12/2023",
            value: "Hola",
            time: "14:30"
        },
        {
            from: "Julio",
            date: "09/12/2023",
            value: "Hola",
            time: "14:30"
        },
        {
            from: "Julio",
            date: "09/12/2023",
            value: "Hola",
            time: "14:30"
        },
        {
            from: "Não é julio",
            date: "09/12/2023",
            value: "Hola",
            time: "14:30"
        },
        {
            from: "Julio",
            date: "09/12/2023",
            value: "Hola",
            time: "14:30"
        },
        {
            from: "Julio",
            date: "09/12/2023",
            value: "Hola",
            time: "14:30"
        },
        {
            from: "Não é julio",
            date: "09/12/2023",
            value: "Hola",
            time: "14:30"
        }
    ]);

    return (
        <SafeAreaView>
            <View>
                <ChatHeader user={userChat}/>
                <Chat messages={messages}/>
                <IconInput
                    trailling={
                    <Ionicons
                        name="send"
                        size={25}
                        color={appTheme.color.darkBackground}
                    />
                    }
                />
            </View>
        </SafeAreaView>
    )
}

const Chat = ({messages}) => {
    const {appTheme} = useContext(ThemeContext);
    const position = useCallback((message) => {
        return message.from !== "Julio" ?
            {
                bottom: appTheme.spacing.s,
                right: appTheme.spacing.s
            } : {
                bottom: appTheme.spacing.s,
                left: appTheme.spacing.s
            }
    }, [])
    return (
        <SafeAreaView
            style={{
                backgroundColor: appTheme.color.lightBackground,
                height: Dimensions.get('window').height - 115,
            }}
        >
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingHorizontal: 16,
                    justifyContent: "end",
                    gap: 3,
                    paddingBottom: 20,
                }}
                nestedScrollEnabled
            >

                {messages.map((message, index) => {
                    return (
                        <View
                            style={{
                                borderRadius: 10,
                                backgroundColor: message.from != "Julio" ? "white" : "green",
                                maxWidth: Dimensions.get('window').width * 0.6,
                                paddingTop: appTheme.spacing.s,
                                paddingHorizontal: appTheme.spacing.m,
                                position: "relative",
                                alignSelf: message.from != "Julio" ? "flex-end" : "flex-start",
                                paddingBottom: 20,
                                minWidth: 80,
                            }}
                        >
                            <View
                                style={{
                                    width: "100%",
                                    textAlign: "end",
                                }}
                            >
                                <Paragraph
                                    type={"p2"}
                                    styles={{
                                        textAlign: message.from != "Julio" ? "end" : "start"
                                    }}
                                >
                                    {message.value}
                                </Paragraph>
                            </View>

                            <View
                                style={{
                                    position: "absolute",
                                    ...position(message)
                                }}
                            >
                                <Paragraph
                                    type={"p"}
                                >
                                    {message.time}
                                </Paragraph>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
        </SafeAreaView>

    );
}

const ChatHeader = ({user}) => {
    const {appTheme} = useContext(ThemeContext)
    const {navigation} = useContext(AppContext)
    return (
        <View
            style={{
                width: "100%",
                paddingVertical: appTheme.spacing.l,
                paddingHorizontal: appTheme.spacing.l,
                backgroundColor: appTheme.color.darkBackground,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <TouchableOpacity
                onPress={() => navigation.goBack()}
            >
                <Ionicons
                    name="chevron-back"
                    size={30}
                    color="white"
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <Paragraph
                    type={"h3"}
                    color={"white"}
                >
                    {user.name}
                </Paragraph>
            </TouchableOpacity>
            <FontAwesome
                name="users"
                size={30}
                color="white"
            />
        </View>
    )
}

export default ChatScreen;