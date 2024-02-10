import { Modal, Pressable, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

type PromptProps = {
    children: React.ReactNode;
    callback?: () => void;
    shown: boolean;
    onRequestClose?: () => void;
}

export default function Prompt({ children, shown, callback, onRequestClose }: PromptProps) {
    return (
        <Modal visible={shown} transparent statusBarTranslucent onRequestClose={onRequestClose}>
            <Animated.View entering={FadeIn} className="relateive p-4 flex-1 bg-black/75 items-center justify-center">
                <Pressable className="absolute h-full w-full" onPress={onRequestClose} />
                <View className="container p-4 rounded-xl bg-white shadow">
                    {children}
                    <View className="flex flex-row gap-x-4 mt-4 justify-end">
                        <Pressable onPress={onRequestClose}>
                            <Text className="font-semibold">Cancel</Text>
                        </Pressable>
                        <Pressable onPress={callback}>
                            <Text className="font-semibold">Ok</Text>
                        </Pressable>
                    </View>
                </View>
            </Animated.View>
        </Modal>
    );
}