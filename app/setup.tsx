import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList, TouchableOpacity, Pressable, Modal, StyleSheet } from 'react-native';

interface PageProps {
    // Define props here if needed
}

export default function Page(props: PageProps) {
    const [confirmSeed, setConfirmSeed] = useState(false);

    // Function to generate a random seed phrase
    const mnemonic = ['apple', 'banana', 'orange', 'grape', 'kiwi', "cherry", "mango", "pineapple", "watermelon", "papaya", "strawberry", "raspberry"]; // Example words
    const warningText = " Your mnemonic seed phrase is a series of words that can be used to recover your account if you lose access to your device. It's crucial to keep this seed phrase secure and never share it with anyone. Write down your seed phrase on a piece of paper and store it in a safe place. Do not store it digitally or take a screenshot."


    function handleContinue(): void {
        setConfirmSeed(true);
    }

    function handleSuccess(): void {
        router.replace('/chat');
    }

    return (
        <View className='flex-1 flex items-center justify-center p-4 dark:bg-gray-900'>
            <View className='container border border-gray-300 rounded-xl p-4 mb-8 mt-auto flex flex-row gap-x-2'>
                <Feather style={{ marginTop: 4 }} name="key" size={24} color="black" />
                <Text className='flex-1 mb-2 text-gray-600'>
                    <Text className='font-semibold'>Warning:</Text>
                    {warningText}
                </Text>
            </View>
            <View className="flex flex-row flex-wrap w-full gap-1 justify-center">
                {mnemonic
                    .map((item: string, index: number) => (
                        <View key={index} className='inline-flex flex-row gap-x-2 p-2 rounded-xl border border-gray-300'>
                            <Text className='text-sm text-gray-300'>{index + 1}</Text>
                            <Text className='font-semibold text-gray-900'>{item}</Text>
                        </View>
                    ))}
            </View>

            <Pressable onPress={() => handleContinue()} className='w-full items-center justify-center p-3 rounded-xl mt-auto bg-gray-800 dark:bg-white'>
                <Text className='text-white font-medium dark:text-gray-800'>Continue</Text>
            </Pressable>
            {confirmBackup(confirmSeed, setConfirmSeed, handleSuccess)}
            <StatusBar style="auto" />
        </View>
    );
}
function confirmBackup(confirmSeed: boolean, setConfirmSeed: React.Dispatch<React.SetStateAction<boolean>>, handleContinue: () => void) {
    return <Modal animationType="fade" visible={confirmSeed} transparent statusBarTranslucent onRequestClose={() => setConfirmSeed(false)}>
        <Pressable style={StyleSheet.absoluteFill} className="bg-black/75" onPress={() => setConfirmSeed(false)} />
        <View className="bg-white p-4 rounded-lg shadow-lg mx-2 my-auto">
            <View>
                <Text className='text-sm text-gray-500'>Please enter the mnemonic seed phrase to continue</Text>
                <TextInput secureTextEntry onSubmitEditing={() => handleContinue()} placeholder='Word1 Word2 Word3...' multiline numberOfLines={1} className='w-full p-2.5 bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-gray-400 block' />
            </View>
            <Pressable onPress={() => handleContinue()} className='w-full items-center justify-center p-3 rounded-xl mt-auto bg-gray-800 dark:bg-white mt-4'>
                <Text className='text-white font-medium dark:text-gray-800 capitalize'>confirm seed phrase</Text>
            </Pressable>
        </View>
    </Modal>;
}

