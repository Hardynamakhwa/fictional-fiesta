import { Feather } from "@expo/vector-icons";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ScanQRCodePrompt({ isOpen, onRequestClose, onConfirm }: { isOpen: boolean; onRequestClose: () => void; onConfirm: (displayName: string) => void; }) {
    const [displayName, setDisplayName] = React.useState('');

    const handleConfirm = () => {
        // Ensure display name is not empty before confirming
        if (displayName.trim() !== '') {
            onConfirm(displayName);
        }
    };

    return (
        <Modal
            animationType="fade"
            visible={isOpen}
            transparent
            statusBarTranslucent
            onRequestClose={onRequestClose}
            className="flex-1 flex items-center justify-center"
        >
            <Pressable style={StyleSheet.absoluteFill} onPress={onRequestClose} className="bg-black/75" />
            <View className="bg-white shadow-xl rounded-lg  mx-2 my-auto">
                <View className="flex flex-row justify-between p-4">
                    <Text className="text-lg font-semibold">Set Display Name</Text>
                    <Feather name="x" size={20} onPress={onRequestClose} />
                </View>
                <View className="px-4">

                    <TextInput
                        value={displayName}
                        onChangeText={setDisplayName}
                        placeholder="Enter display name"
                        className="w-full p-2 bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-gray-400 block " />
                        {/**help text */}
                    <Text className="text-sm text-gray-500 pl-1">To help you recognize this contact in your list, please provide a display name for the scanned address.</Text>
                </View>
                <View className="flex flex-row gap-x-4 p-4 justify-end">
                    <TouchableOpacity className="rounded-xl items-center justify-center py-2.5 px-3.5 bg-gray-200 border border-gray-300" onPress={handleConfirm}>
                        <Text className="font-medium">Skip</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="rounded-xl items-center justify-center py-2.5 px-3.5 bg-gray-800 border border-gray-700" onPress={handleConfirm}>
                        <Text className="font-medium text-white">Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};
