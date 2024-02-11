import { Feather } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import ChatComponent from "../../components/ChatComponent";
import { Gesture, GestureHandlerRootView, TapGestureHandler } from "react-native-gesture-handler";
import React from "react";
import Animated, { ZoomOut, ZoomIn } from "react-native-reanimated";
import ScanQRBottomsheet from "../../components/ScanQRBottomsheet";
import Finder from "../../components/Finder";
import ScanQRCodePrompt from "../../components/ScanQRCodePrompt";
import ContactsModal from "../../components/ContactsModal";

export default function Page() {
    const [finderShown, setFinderShown] = React.useState(false);
    const [scanQRVisible, setScanQRVisible] = React.useState(false);
    const [saveUserPromptShown, setSaveUserPromptShown] = React.useState(false);

    const [contactsShown, setContactsShown] = React.useState(false);

    const toProfile = () => {
        router.push("/chat/user");
    }

    const toggleFinder = () => {
        setFinderShown(!finderShown);
    }
    function toggleScanQR() {
        setScanQRVisible(true);
    }

    const handleScannedQR = ({ data }: { data: string }) => {

    }

    return (
        <View className="flex flex-col flex-1 items-center justify-center">
            <Stack.Screen options={{
                title: "Ghost", headerRight(props) {
                    return <View className="flex flex-row gap-x-4">
                        <Feather name="book" size={24} color={props.tintColor} onPress={() => setContactsShown(true)} />
                        <Feather name="search" size={24} color={props.tintColor} onPress={toggleFinder} />
                        <Feather name="user" size={24} color={props.tintColor} onPress={toProfile} />
                    </View>
                },
            }} />
            <ChatComponent />
            {finderShown ? <Finder onRequestClose={toggleFinder} /> :
                <Animated.View className="absolute bottom-4 right-4 w-14 h-14 bg-slate-900 rounded-xl items-center justify-center" entering={ZoomIn} exiting={ZoomOut}>
                    <TapGestureHandler onActivated={toggleScanQR}>
                        <Feather name="plus" size={24} color="white" />
                    </TapGestureHandler>
                </Animated.View>
            }
            <ContactsModal shown={contactsShown} onRequestClose={() => setContactsShown(false)} />
            <ScanQRBottomsheet visible={scanQRVisible} onScanQR={handleScannedQR} onRequestClose={() => setScanQRVisible(false)} />
            <ScanQRCodePrompt isOpen={saveUserPromptShown} onRequestClose={() => setSaveUserPromptShown(false)} onConfirm={() => setSaveUserPromptShown(false)} />
            <StatusBar style="auto" />
        </View>
    );


}


