import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function InboxInputBox()
{
    const [text, setText] = useState("");

    const handleSubmit = () =>
    {
        setText("");
    }

    return (
        <View className="w-full p-4 bg-white mt-auto gap-x-2 flex flex-row">
            <TextInput placeholder="Aa..." value={text} onChangeText={setText} className="flex-1 bg-gray-100  border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-slate-400 block  p-2.5" multiline numberOfLines={1} />
            <Pressable className="rounded-xl items-center justify-center p-4 bg-slate-900" onPress={handleSubmit}>
                <Feather name="arrow-up" size={20} color="white" />
            </Pressable>
        </View>
    )
}