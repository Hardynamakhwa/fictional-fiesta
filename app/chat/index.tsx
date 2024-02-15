import { Feather } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import _ from "lodash";
import React from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";
import Animated, { SlideInDown, SlideOutDown, ZoomIn, ZoomOut } from "react-native-reanimated";
import Contacts from "../../components/Contacts";
import ScanQRBottomsheet from "../../components/ScanQRBottomsheet";
// import ScanQRCodePrompt from "../../components/ScanQRCodePrompt";
import { User } from "../../types/auth";


const users: User[] = [
    { displayName: "Mark Murazik", address: "address1", publicKey: "key" },
    { displayName: "Mrs. Perry Welch", address: "address2", publicKey: "key" }
]

export default function Page() {
    const [finderShown, setFinderShown] = React.useState(false);
    const [finderQuery, setFinderQuery] = React.useState("");
    const [scanQRVisible, setScanQRVisible] = React.useState(false);

    const [contactsShown, setContactsShown] = React.useState(false);

    const toProfile = () => {
        router.push("/chat/user");
    }

    function toggleScanQR() {
        setScanQRVisible(true);
    }

    const handleScannedQR = ({ data }: { data: string }) => {

    }

    const data = finderQuery.length && finderShown ?
        _.filter(users, user => user.displayName ?
            user.displayName.toLowerCase().includes(finderQuery.toLowerCase()) :
            false) :
        users;

    return (
        <View className="flex flex-col flex-1 items-center justify-center dark:bg-black">
            <Stack.Screen options={{
                title: "Ghost",
                headerRight(props) {
                    return <>
                        <View className="flex flex-row gap-x-4">
                            <Feather name="book" size={24} color={props.tintColor} onPress={() => setContactsShown(true)} />
                            <Feather name="search" size={24} color={props.tintColor} onPress={() => setFinderShown(true)} />
                            <Feather name="user" size={24} color={props.tintColor} onPress={toProfile} />
                        </View>
                    </>
                },
            }} />
            <FlatList className="flex-1 w-full" data={data} renderItem={renderUser} keyExtractor={item => item.address} ListEmptyComponent={renderUsersEmpty} />
            {finderShown ?
                <>
                    <Animated.View entering={SlideInDown} exiting={SlideOutDown} className="flex flex-row items-center gap-x-2 p-2 bg-white">
                        <TextInput value={finderQuery} onChangeText={setFinderQuery} className="flex-1 rounded-lg p-2 placeholder:text-white border border-slate-300 bg-gray-200" placeholder="Find" placeholderTextColor={"gray"} returnKeyType="search" />
                        <Pressable>
                            <Feather name="x" size={24} onPress={() => setFinderShown(false)} />
                        </Pressable>
                    </Animated.View>
                </>
                :
                <>
                    <Animated.View className="absolute bottom-4 right-4 w-14 h-14 bg-slate-900 rounded-xl items-center justify-center" entering={ZoomIn} exiting={ZoomOut}>
                        <TapGestureHandler onActivated={toggleScanQR}>
                            <Feather name="plus" size={24} color="white" />
                        </TapGestureHandler>
                    </Animated.View>
                </>
            }
            <Contacts shown={contactsShown} onRequestClose={() => setContactsShown(false)} />
            <ScanQRBottomsheet visible={scanQRVisible} onScanQR={handleScannedQR} onRequestClose={() => setScanQRVisible(false)} />
            {/* <ScanQRCodePrompt isOpen={saveUserPromptShown} onRequestClose={() => setSaveUserPromptShown(false)} onConfirm={() => setSaveUserPromptShown(false)} /> */}
            <StatusBar style="auto" />
        </View>
    );


}

function renderUser({ item }: { item: User }) {
    const handlePress = () => router.push(`/chat/${item.address}`);

    return <>
        <Pressable className="flex flex-col px-4 py-2" onPress={handlePress}>
            <Text className="text-sm font-medium text-gray-900 truncate dark:text-white">{item.displayName || item.address}</Text>
            {item.displayName && <Text numberOfLines={1} ellipsizeMode="tail" className="text-sm text-gray-500 truncate dark:text-gray-400">{item.address}</Text>}
        </Pressable>
    </>
}

function renderUsersEmpty() {
    return <>
        <View className="flex-1 items-center justify-center">
            <Text>No users</Text>
        </View>
    </>
}

