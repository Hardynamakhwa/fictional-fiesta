import { Stack, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import React from "react";
import Prompt from "../../components/Prompt";
import QRCode from "react-qr-code";

export default function Page() {
    const { address } = useLocalSearchParams();
    const [prompt, setPrompt] = React.useState(false);
    const isUser = !!address;
    const promptText = isUser ? "Delete User" : "Remove account";
    const modalText = isUser ? "Are you sure you want to delete this User" : "Are you sure you want to remove your account from the device. All data will be deleted";

    return (
        <View className="flex-1 items-center justify-center p-4">
            <Stack.Screen options={{
                title: "user",
                headerTitleAlign: "center",
            }} />
            {/** row with QR code and text address beside */}
            <View className="flex flex-row gap-x-4 px-4">
                <QRCode
                    value={"address"}
                    level="H"
                    size={128}
                />
                <Text className="flex-1 block wrap text-sm text-gray-800 dark:text-gray-300">
                    {"user.address"}{" "}
                    <Feather
                        name="clipboard"
                        size={16}
                    />
                </Text>
            </View>

            <Pressable className="flex flex-row justify-between w-full px-4 py-2.5 bg-red-500 mt-auto rounded-lg items-center" onPress={() => setPrompt(!prompt)}>
                <Text className="text-white font-medium">{promptText}</Text>
                <Feather name="trash" size={20} color="white" />
            </Pressable>

            {/**modals */}
            <Prompt shown={prompt} callback={() => null} onRequestClose={() => setPrompt(false)}>
                <Text>{modalText}</Text>
            </Prompt>
            <StatusBar style="auto" />
        </View>
    );
}

