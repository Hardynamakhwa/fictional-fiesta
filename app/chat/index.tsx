import { Feather } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Text, Pressable } from "react-native";
import ChatComponent from "../../components/ChatComponent";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Page() {

    const navigateToProfile = () => {
        router.push("/chat/profile");
    }
    return (
        <View className="flex flex-col flex-1 items-center justify-center">
            <Stack.Screen options={{
                title: "Ghost", headerRight(props) {
                    return <View className="flex flex-row gap-x-4">
                        <Feather name="search" size={24} color={props.tintColor} />
                        <Feather name="user" size={24} color={props.tintColor} onPress={navigateToProfile} />
                    </View>
                },
            }} />
            <ChatComponent />
            <Pressable className="absolute bottom-4 right-4 w-14 h-14 bg-slate-900 rounded-xl items-center justify-center">
                <Feather name="plus" size={24} color="white" />
            </Pressable>

            <StatusBar style="auto" />
        </View>

    );
}