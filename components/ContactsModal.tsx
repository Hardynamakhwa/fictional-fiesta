import { Feather } from "@expo/vector-icons";
import React from "react";
import {
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

type user = {
    displayName: string;
    address: string; // bitcoin like address
};

export default function ContactsModal({
    shown,
    onRequestClose,
}: {
    shown: boolean;
    onRequestClose: () => void;
}) {
    const [search, setSearch] = React.useState("");

    const users: user[] = [
        {
            displayName: "Lee Von",
            address: "jd4wu48oJF394U309F930I9FEOW39",
        },
        {
            displayName: "Jenna Christiansen",
            address: "DMFJ3OWIJDW93WIj93utu3u9tu49t",
        },
        {
            displayName: "Miss Jeremy Kiehn",
            address: "jf29034u39rjijd93w8ur9ij484u9",
        },
    ];

    const searchResults = () => {
        return users.filter((user) =>
            user.displayName
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase())
        );
    };

    const UserListItem = ({ item }: { item: user }) => {
        return (
            <View className="px-4 py-1">
                <Text className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {item.displayName}
                </Text>
                <Text className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {item.address}
                </Text>
            </View>
        );
    };

    const emptyListComponent = search ? (
        <Text className="text-center text-gray-500">
            No results found
        </Text>
    ) : (
        <Text className="text-center text-gray-500">
            No contacts found
        </Text>
    );
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
                    renderItem={({ item }) => (
                        <UserListItem item={item} />
                    )}
                    ListEmptyComponent={emptyListComponent}
                    keyExtractor={(item) => item.address}
                />
            </View>
        </Modal>
    );
}
