import { Feather } from "@expo/vector-icons";
import dayjs from 'dayjs';
import { Stack, router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import _ from "lodash";
import React from "react";
import { Pressable, SectionList, Text, TextInput, View } from "react-native";
import chatStore from "../../store/chatStore";
import userStore from "../../store/userStore";
import { Message } from "../../types/chat";

export default function Page() {
    const { address } = useLocalSearchParams();
    const [input, setInput] = React.useState('')
    const inputRef = React.createRef<TextInput>()

    const user = address ? userStore.get(address as string) : userStore.admin;

    if (!user) return null

    const messages = _.filter(chatStore.messages, (message) => _.includes([user, userStore.admin], message.sender) && _.includes([user, userStore.admin], message.receiver))
    const sections = _.map(
        _.groupBy(
            _.sortBy(
                messages,
                'timestamp'
            ),
            (message) => dayjs(message.timestamp).format('MMM DD, YYYY')
        ),
        (data, title) => ({ title, data })
    )

    const toUser = () => router.push("/chat/user?address=" + user.address);

    const handleSubmit = () => {
        inputRef.current?.blur();
        chatStore.push(user, input)
        setInput('')
    }
    const keyExtractor = (item: Message) => {
        return item.id;
    }

    return (
        <View className="flex-1 flex h-full items-center justify-center">
            <Stack.Screen options={{
                title: user.displayName || user.address,
                headerRight(props) {
                    return (
                        <Feather name="user" size={24} color={props.tintColor} onPress={toUser} />
                    )
                },
            }} />
            <SectionList className="flex-1 flex w-full h-full flex-col" sections={sections} renderItem={renderItem} renderSectionHeader={renderSectionHeader} ListEmptyComponent={emptyListComponent()} keyExtractor={keyExtractor} />

            <View className="w-full p-2 bg-white gap-x-2 flex flex-row items-end">
                <TextInput ref={inputRef} placeholder="Aa..." value={input} onChangeText={setInput} className="flex-1 p-2.5 bg-gray-200  border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-gray-400 block " multiline numberOfLines={1} />
                <Pressable className="rounded-xl items-center justify-center p-3.5 bg-gray-900" onPress={handleSubmit}>
                    <Feather name="arrow-up" size={20} color="white" />
                </Pressable>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}
function renderItem({ item }: { item: Message }) {
    const handlePress = () => {
        throw new Error("Function not implemented.");
    }

    if (_.isEqual(item.sender, userStore.admin)) {
        return <>
            <Pressable className="w-full flex px-2 py-1 items-end" onPress={handlePress}>
                <View className="max-w-[80%] leading-1.5 p-4 border border-gray-200 bg-gray-50 rounded-lg shadow-lg">
                    <Text className="text-sm font-normal text-gray-900">{item.text}</Text>
                </View>
            </Pressable>
        </>
    }

    return <>
        <Pressable className="w-full flex px-2 py-1 items-start" onPress={handlePress}>
            <View className="max-w-[80%] leading-1.5 p-4 border border-gray-300 bg-white rounded-lg shadow-lg">
                <Text className="text-sm font-normal text-gray-900">{item.text}</Text>
            </View>
        </Pressable>
    </>
}

function renderSectionHeader({ section }: { section: { title: string } }) {
    return <>
        <Text className="text-center text-sm text-500 dark:text-gray-600 capitalize my-2">
            {section.title}
        </Text>
    </>
}

function emptyListComponent() {
    return <View className="flex-1 flex justify-center my-auto items-center">
        <Text className="text-gray-500 font-medium">No message</Text>
    </View>

}