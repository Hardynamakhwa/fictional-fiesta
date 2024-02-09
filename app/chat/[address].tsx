import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import InboxInputBox from "../../components/InboxInputBox";
import InboxMessages from "../../components/InboxMessages";
import { Stack, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function Page()
{
    const { address } = useLocalSearchParams();

    return (
        <View className="flex-1 items-center justify-center">
            <Stack.Screen options={{
                title: address as string,
                headerRight(props)
                {
                    return (
                        <Feather name="user" size={24} color={props.tintColor} />
                    )
                },
            }} />
            <InboxMessages />
            <InboxInputBox />
            <StatusBar style="auto" />
        </View>
    );
}