import React from "react";
import { Pressable, Text } from "react-native";


export default function Button({ label, disabled = false, color, onPress, ...props }: { label: string, color: string, disabled?: boolean, onPress: () => void, [key: string]: any }) {

    return <>
        <Pressable className={`w-full p-0.5 items-center justify-center p-4 rounded-full bg-${color}-800${disabled ? "\\25" : ""} dark:bg-${color}-200${disabled ? "\\25" : ""}`} {...props} onPress={onPress}>
            <Text className="font-medium text-white dark:text-gray-800">{label}</Text>
        </Pressable>
    </>;
}