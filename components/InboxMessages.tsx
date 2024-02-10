import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import _ from "lodash";
import React from "react";
import { View, Text, SectionList, Pressable } from "react-native";

type message = {
    id: string;
    content: string;
    timestamp: string;
}

type messagesSection = {
    title: string;
    data: message[];
}

export default function InboxMessages() {
    const { address } = useLocalSearchParams();
    const messages: message[] = [{ id: '1', content: 'hello', timestamp: '1' }, { id: '2', content: 'hello', timestamp: '2' }, { id: '3', content: 'hello', timestamp: '3' }];
    const sectionedMessages: messagesSection[] = [{ title: '1 feb, 2024', data: messages }];

    if (_.isEmpty(messages)) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text>No messages</Text>
            </View>
        );
    }

    return (
        <SectionList className="flex-1 flex w-full flex-col" sections={sectionedMessages} renderItem={MessageItem} renderSectionHeader={({ section: { title } }) => <Text className="text-center my-2">{title}</Text>} keyExtractor={(item) => item.id} />
    );
}

const getAligment = (isUser: boolean) => {
    return isUser ? "self-start" : "self-end";
}

function MessageItem({ item }: { item: message }) {
    const [supportingTextHidden, setTupportingTextHidden] = React.useState(true);

    const handlePress = () => {
        setTupportingTextHidden(!supportingTextHidden);
    }
    const isUser = item.id == '1';

    if (isUser) return (
        <Pressable className="w-full flex px-2 py-1 items-start" onPress={handlePress}>
            <View className="max-w-[80%] leading-1.5 p-4 border border-slate-300 bg-white rounded-lg shadow-lg">
                <Text className="text-sm font-normal text-gray-900">{item.content}</Text>
                </View>
        </Pressable>
    )


    return (
        <Pressable className="w-full flex px-2 py-0.5  flex items-end" onPress={handlePress}>
            <View className="max-w-[80%] flex items-end p-4 border border-slate-600 bg-slate-800 rounded-lg shadow-lg">
                <Text className="text-sm font-normal text-gray-50">{item.content}</Text>
                {!supportingTextHidden && <Feather name="check-circle" size={14} color="green" />}
            </View>
        </Pressable>
    );
}
