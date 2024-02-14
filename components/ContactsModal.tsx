import { Feather } from "@expo/vector-icons";
import React from "react";
import
{
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import userStore from "../store/userStore";
import { User } from "../types/auth";


export default function ContactsModal({
    shown,
    onRequestClose,
}: {
    shown: boolean;
    onRequestClose: () => void;
    })
{
    const [search, setSearch] = React.useState("");

    const users: User[] = userStore.users;

    const searchResults = () =>
    {
        return users.filter((user) =>
            (user.displayName || user.address)
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase())
        );
    };


    return (
        <Modal
            animationType="slide"
            visible={shown}
            transparent
            statusBarTranslucent
            onRequestClose={onRequestClose}
        >
            <Pressable
                style={StyleSheet.absoluteFill}
                className="bg-black/75"
                onPress={onRequestClose}
            />
            <View className="flex-1 flex flex-col items-center justify-center bg-white mt-8 rounded-t-xl">
                <View className="w-full flex flex-row items-center justify-between p-4 border-b border-gray-300">
                    <Text className="text-lg font-semibold">
                        Contacts
                    </Text>
                    <Feather
                        name="x"
                        size={24}
                        onPress={onRequestClose}
                    />
                </View>
                <View className="w-full flex flex-row items-center justify-between p-2">
                    <TextInput
                        value={search}
                        onChangeText={setSearch}
                        className="flex-1 rounded-lg p-2 placeholder:text-white border border-slate-300 bg-gray-200"
                        placeholder="Find"
                        placeholderTextColor={"gray"}
                        returnKeyType="search"
                    />
                </View>
                <FlatList
                    className="flex-1 w-full"
                    data={search ? searchResults() : users}
                    renderItem={renderItem}
                    ListEmptyComponent={emptyListComponent(!!search.length)}
                    keyExtractor={(item) => item.address}
                />
            </View>
        </Modal>
    );
}


function renderItem({ item }: { item: User })
{
    return <>
        <View className="flex flex-row items-center gap-4 px-4 py-1">
            <View className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <Text className="font-medium text-gray-600 dark:text-gray-300">JL</Text>
            </View>
            <View>
                <Text className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {item.displayName}
                </Text>
                <Text className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {item.address}
                </Text>
            </View>
        </View>
    </>
}

function emptyListComponent(isSearching: boolean)
{
    return isSearching ?
        <>
            <Text className="text-center text-gray-500">
                No results found
            </Text>
        </> : <>
            <Text className="text-center text-gray-500">
                No saved contacts found
            </Text>
        </>
}