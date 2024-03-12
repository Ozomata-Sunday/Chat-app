import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Chat = () => {
    const [messageList, setMessageList] = useState([])
    const route = useRoute();
    console.log(route.params.data.userId)
   
    useEffect(() => {
        const subscriber = firestore()
            .collection("chats")
            .doc(route.params.id + route.params.userId)
            .orderBy("createdAt", "desc")
        subscriber.onSnapshot(querysnapshot => {
            const allMessages = querysnapshot.docs.map(item => {
                return { ...item._data, createdAt: item._data.createdAt }
            });
            setMessageList(allMessages)
            console.log(allMessages)
        })
    }, [])
    const renderBubble = (props) => {
        return (
            <View
                style={{
                    backgroundColor: props.currentMessage.user._id === 1 ? '#DCF8C6' : 'pink', // Change background color based on user
                    borderRadius: 10,
                    padding: 10,
                    marginVertical: 5,
                    maxWidth: '90%',
                }}>
                <Text>{props.currentMessage.text}</Text>
            </View>
        );
    };

    const onSend = useCallback((messages = []) => {
        const msg = messages[0];
        const myMsg = {
            ...msg,
            sendBy: route.params.id,
            sendTo: route.params.data.userId,
            createdAt: Date.parse(msg.createdAt),
        }
        setMessageList(previousMessages =>
            GiftedChat.append(previousMessages, myMsg),
        );
        firestore()
            .collection("chats")
            .doc("" + route.params.id + route.params.userId)
            .add(myMsg)
        firestore()
            .collection("chats")
            .doc("" + route.params.userId + route.params.id)
            .add(myMsg)
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <GiftedChat
                messages={messageList}
                onSend={messages => onSend(messages)}
                user={{
                    _id: route.params.id,
                }}
            isTyping={true}
            textInputStyle={styles.textInput}
            renderBubble={renderBubble}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    textInput: {
        // backgroundColor: "red",
        borderRadius: 10
    }
})
export default Chat