import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function InboxInputBox({ onsubmit }: { onsubmit: (text: string) => void }) {
    const [text, setText] = React.useState("");
    const inputRef = React.createRef<TextInput>();

    const handleSubmit = () => {
        setText("");
        inputRef.current?.blur();
        onsubmit(text);
    }

    return (
        <View className="w-full p-2 bg-white mt-auto gap-x-2 flex flex-row items-end">
            <TextInput ref={inputRef} placeholder="Aa..." value={text} onChangeText={setText} className="flex-1 p-2.5 bg-slate-200  border-slate-300 text-slate-900 text-sm rounded-lg  focus:border-slate-400 block " multiline numberOfLines={1} />
            <Pressable className="rounded-xl items-center justify-center p-3.5 bg-slate-900" onPress={handleSubmit}>
                <Feather name="arrow-up" size={20} color="white" />
            </Pressable>
        </View>
    )
}