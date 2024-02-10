import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import InboxInputBox from "../../components/InboxInputBox";
import InboxMessages from "../../components/InboxMessages";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function Page() {
    const { address } = useLocalSearchParams();

    const toUser = () => router.push("/chat/user?address=" + address);

    const handleSubmit = (text: string) => {
        console.log(text);
    }

    return (
        <View className="flex-1 items-center justify-center">
            <Stack.Screen options={{
                title: address as string,
                headerRight(props) {
                    return (
                        <Feather name="user" size={24} color={props.tintColor} onPress={toUser} />
                    )
                },
            }} />
            <InboxMessages />
            <InboxInputBox onsubmit={handleSubmit} />
            <StatusBar style="auto" />
        </View>
    );


}