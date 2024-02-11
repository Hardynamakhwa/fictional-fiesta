import { useState } from "react";
import { FlatList, Text, View, Pressable } from "react-native";
import _ from "lodash";
import { router } from "expo-router";
import { GestureDetector } from "react-native-gesture-handler";

export default function ChatComponent() {
    const chats = [{ id: 1, name: "Mark Murazik" }, { id: 2, name: "Mrs. Perry Welch" }];

    if (_.isEmpty(chats)) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text>No recent chats</Text>
            </View>
        );
    }

    return (
        <FlatList className="flex-1 w-full" data={chats} renderItem={({ item }) => <ChatListItem item={item} />} />
    )
}

function ChatListItem({ item }: { item: { id: number, name: string } }) {
    const handlePress = () => {
        router.push(`/chat/${item.name}`);
    }
    return (
        <Pressable className="flex flex-col px-4 py-2" onPress={handlePress}>
            <Text className="text-sm font-medium text-gray-900 truncate dark:text-white">{item.name}</Text>
            <Text numberOfLines={1} ellipsizeMode="tail" className="text-sm text-gray-500 truncate dark:text-gray-400">Omnis dicta delectus.pariatur ipsum temporeImpedit repellat eveniet ipsum.</Text>
        </Pressable>
    );
}