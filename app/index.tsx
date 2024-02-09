import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";


export default function Page() {
    return (
        <View className="flex-1 items-center justify-center">
            <Text>Open up App.tsx to start working on your app!</Text>
            <Link href={"/chat"}>Chat</Link>
            <StatusBar style="auto" />
        </View>
    );
}