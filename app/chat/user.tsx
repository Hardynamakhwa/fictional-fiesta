import { Stack, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import React from "react";
import QRCode from "react-qr-code";
import Dialog, { DialogActions, DialogTitle } from "../../components/Dialog";
import { User } from "../../types/auth";

export default function Page()
{
    const { address } = useLocalSearchParams();
    const [prompt, setPrompt] = React.useState(false);
    const isUser = !!address;


    const user: User = {
        displayName: "User",
        address: address as string,
        publicKey: "key",
    }

    const handleCopy = () =>
    {
        console.log("copied");
    }

    if (!isUser)
    {
        return (
            <View className="flex-1 items-center justify-center p-4">
                <Stack.Screen options={{
                    title: "Me",
                }} />
                <View className="flex flex-row gap-x-4 px-4">
                    {/**TODO: display user's QR value=address?key=publicKey */}
                    <QRCode value="<me>" size={164} />
                    {/**TODO: display user's address <me>*/}
                    <Text className="">{user.address} <Feather name="clipboard" size={20} /></Text>
                </View>
                <View className="w-full border border-gray-300 bg-white rounded-lg">
                    <Pressable className="flex flex-row justify-between items-center w-full px-4 py-2.5">
                        <Text>Block</Text>
                        <Feather name="toggle-left" size={20} />
                    </Pressable>
                </View>
                <Pressable className="p-2.5 rounded-lg bg-red-600 justify-center items-center">
                    <Text>Remove account</Text>
                </Pressable>
                <StatusBar style="auto" />

            </View>
        )
    }
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

            <View className="w-full border border-gray-300 bg-white rounded-lg">
                <Pressable className="flex flex-row justify-between items-center w-full px-4 py-2.5">
                    <Text>Block</Text>
                    <Feather name="toggle-left" size={20} />
                </Pressable>
            </View>

            <Pressable className="flex flex-row justify-center w-full px-4 py-2.5 bg-red-500 mt-auto rounded-lg items-center" onPress={() => setPrompt(!prompt)}>
                <Text ellipsizeMode="tail" numberOfLines={1} className="text-white font-medium">Delete <Text className="font-semibold">{user.displayName || user.address}</Text></Text>
            </Pressable>
            <StatusBar style="auto" />
        </View>
    );
}

// <Dialog shown={prompt} onRequestClose={() => setPrompt(false)}>
//                 <DialogTitle>
//                     <Text>{promptText}</Text>
//                 </DialogTitle>
//                 <Text>Are you sure you want to delete this <Text className="font-semibold">{user.displayName}</Text></Text>
//                 <DialogActions>
//                     <Pressable>
//                         <Text>Cancel</Text>
//                     </Pressable>
//                     <Pressable>
//                         <Text>Confirm</Text>
//                     </Pressable>
//                 </DialogActions>
//             </Dialog>