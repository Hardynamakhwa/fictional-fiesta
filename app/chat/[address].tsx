import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import InboxInputBox from "../../components/InboxInputBox";
import InboxMessages from "../../components/InboxMessages";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { User } from "../../types/auth";

export default function Page()
{
    const { address } = useLocalSearchParams();
    const user: User = {
        displayName: "User",
        address: address as string,
        publicKey: "key",
    }

    const toUser = () => router.push("/chat/user?address=" + address);

    const handleSubmit = (text: string) =>
    {
        console.log(text);
    }

    return (
        <View className="flex-1 items-center justify-center">
            <Stack.Screen options={{
                title: user.displayName || user.address,
                headerRight(props)
                {
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