import { Feather } from "@expo/vector-icons";
import { Pressable, TextInput } from "react-native";
import React from "react";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";

export default function Finder({ onRequestClose }: { onRequestClose: () => void; }) {
    return <>
        <Animated.View entering={SlideInDown} exiting={SlideOutDown} className="flex flex-row items-center gap-x-2 p-2 bg-white">
            <TextInput className="flex-1 rounded-lg p-2 placeholder:text-white border border-slate-300 bg-gray-200" placeholder="Find" placeholderTextColor={"gray"} returnKeyType="search" />
            <Pressable>
                <Feather name="chevron-down" size={24} />
            </Pressable>
            <Pressable>
                <Feather name="chevron-up" size={24} />
            </Pressable>
            <Pressable>
                <Feather name="x" size={24} onPress={onRequestClose} />
            </Pressable>
        </Animated.View>
    </>;
}
