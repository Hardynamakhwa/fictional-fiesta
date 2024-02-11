import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";

export default function Page() {
    const [seed, setSeed] = useState("");

    const validateSeed = (seed: string) =>
        seed.split(" ").length === 12;

    const handleImport = () => {
        router.replace("/chat");
    };

    return (
        <View className="flex-1 flex items-center justify-center p-4 dark:bg-gray-900">
            <View className="w-full flex flex-row items-center ">
                <Feather name="chevron-left" size={24} />
                <Text className="font-bold text-lg my-8 mx-auto">Import</Text>
            </View>
            <Text className="mb-4 text-center">
                Enter your 12-word seed phrase below. This
                phrase is used to securely restore your
                account.
            </Text>
            <TextInput
                clearButtonMode="unless-editing"
                value={seed}
                onChangeText={setSeed}
                secureTextEntry={true}
                autoCapitalize="none"
                multiline
                placeholder="Enter your 12-word seed phrase"
                className="w-full p-2.5 bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-gray-400 block"
            />

            <View className="mt-auto w-full">
                <Text>
                    By importing, I agree to the{" "}
                    <Text className="text-blue-500 underline">
                        Terms of Service
                    </Text>{" "}
                    and{" "}
                    <Text className="text-blue-500 underline">
                        Privacy Policy
                    </Text>
                </Text>
                <Pressable
                    onPress={handleImport}
                    className="w-full items-center justify-center p-3 rounded-xl bg-gray-800 dark:bg-white mt-2"
                >
                    <Text className="text-white font-medium dark:text-gray-800 capitalize">
                        import
                    </Text>
                </Pressable>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}
