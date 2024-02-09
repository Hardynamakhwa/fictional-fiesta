import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
    return <GestureHandlerRootView className="flex-1 flex">
        <Slot />
    </GestureHandlerRootView>
}