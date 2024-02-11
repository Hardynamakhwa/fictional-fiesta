import { Link, Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View, Pressable } from "react-native";


export default function Page() {
    const handleImport = () => {
        router.replace('/import');
    }
    const handleSetup = () => {
        router.replace('/setup');
    }

    return (
        <View className="flex-1 p-4 items-center justify-center">
            <Pressable onPress={handleSetup} className='w-full items-center justify-center p-3 rounded-xl mt-auto bg-gray-800 dark:bg-white mt-4'>
                <Text className='text-white font-medium dark:text-gray-800 capitalize'>Create account</Text>
            </Pressable>
            <Pressable onPress={handleImport} className='w-full items-center justify-center p-3 rounded-xl mt-auto bg-gray-800 dark:bg-white mt-4'>
                <Text className='text-white font-medium dark:text-gray-800 capitalize'>import</Text>
            </Pressable>
            <StatusBar style="auto" />
        </View>
    );
}