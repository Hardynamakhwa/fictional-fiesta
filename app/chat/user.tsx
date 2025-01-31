import { useLocalSearchParams } from "expo-router";
import { observer } from "mobx-react";
import { Text, View } from "react-native";
import store from "../../store/store";

export default observer(() => {
    const { address } = useLocalSearchParams()

    const user = address ? store.getUser(address as string) : store.admin
    return <View className="flex-1 justify-end p-4 dark:bg-black">
        <Text>{user?.address}</Text>
    </View>

})





// import { Stack, useLocalSearchParams } from "expo-router";
// import { StatusBar } from "expo-status-bar";
// import { Pressable, View, Text, Modal } from "react-native";
// import { Feather } from "@expo/vector-icons";
// import React from "react";
// import QRCode from "react-qr-code";
// import { User } from "../../types/auth";
// import _ from "lodash";
// import { useColorScheme } from "nativewind";
// import theme from "../../misc/theme";
// import { ColorSchemeSystem } from "nativewind/dist/style-sheet/color-scheme";
// import { observer } from "mobx-react";
// import store from "../../store/store";

// export default observer(() => {
//     const { address } = useLocalSearchParams();
//     const colorScheme = useColorScheme()

//     const [promptDelete, setPromptDelete] = React.useState(false);

//     const user = address ? store.getUser(address as string) as User : store.admin;
//     const isAdmin = _.isEqual(user, store.admin);

//     const handleTheme = (scheme: ColorSchemeSystem) => {
//         colorScheme.setColorScheme(scheme)
//     }

//     return (
//         <View className="flex-1 justify-end p-4 dark:bg-black">
//             <Stack.Screen options={{
//                 title: user.displayName || user.address,
//                 headerTitleAlign: "center",
//             }} />
//             <View className="flex-1 flex flex-row gap-x-4">
//                 <View className="p-4 rounded-lg bg-gray-white dark:bg-gray-800">
//                     <QRCode value="null" />
//                 </View>
//                 <Text>{user.address} <Feather name="clipboard" color={theme[colorScheme.colorScheme].tint} /></Text>
//             </View>

//             {
//                 isAdmin ?
//                     <>
//                         <Options title="Theme Settings">
//                             <Option label="system" icon={store.scheme === 'system' ? "disc" : "circle"} onTap={() => handleTheme('system')} />
//                             <Option label="light" icon={store.scheme === 'light' ? "disc" : "circle"} onTap={() => handleTheme('light')} />
//                             <Option label="dark" icon={store.scheme === 'dark' ? "disc" : "circle"} isTrailing onTap={() => handleTheme('dark')} />
//                         </Options>
//                         <Options title="Privacy Controls">
//                             <Option label="Visibility Settings" icon="chevron-right" />
//                             <Option label="Block List" icon="chevron-right" isTrailing />
//                         </Options>
//                         <Options title="Security Settings">
//                             <Option label="Two-Factor Authentication (2FA)" icon="toggle-left" />
//                             <Option label="Biometric Authentication" icon="toggle-left" isTrailing />
//                         </Options>
//                     </>
//                     :
//                     <>
//                         <Options title="Data Management">
//                             <Option label="Export Data" icon="download-cloud" isTrailing />
//                         </Options>
//                         <Options title="Privacy Controls">
//                             <Option label="Mute notifications" icon="toggle-left" />
//                             <Option label="Block" icon="toggle-left" isTrailing />
//                         </Options>
//                     </>
//             }
//             {//danger zone
//                 isAdmin ?
//                     <>
//                         <Pressable className="flex flex-row justify-center w-full px-4 py-2.5 bg-red-500 mt-4 rounded-lg items-center" onPress={() => null}>
//                             <Text ellipsizeMode="tail" numberOfLines={1} className="text-white font-medium">Remove account</Text>
//                         </Pressable>
//                     </>
//                     :
//                     <>
//                         <Pressable className="flex flex-row justify-center w-full px-4 py-2.5 bg-red-500 mt-4 rounded-lg items-center" onPress={() => setPromptDelete(true)}>
//                             <Text ellipsizeMode="tail" numberOfLines={1} className="text-white font-medium">Delete <Text className="font-semibold">{user.displayName || user.address}</Text></Text>
//                         </Pressable>
//                         <Modal animationType="fade" visible={promptDelete} transparent statusBarTranslucent onRequestClose={() => setPromptDelete(false)}>
//                             <View className="min-w-[280px] max-w-[520px] p-[24px] rounded-[24px] my-auto mx-4 bg-white dark:bg-gray-800">
//                                 <Text className="dark:text-white">Are you sure to delete <Text className="font-semibold">{user.address}</Text>?</Text>
//                                 <View className="flex flex-row justify-end items-center gap-x-6 mt-4">
//                                     <Pressable onPress={() => setPromptDelete(false)}>
//                                         <Text className="dark:text-white font-semibold">Cancel</Text>
//                                     </Pressable>
//                                     <Pressable>
//                                         <Text className="text-red-600 dark:text-red-500 font-semibold">Delete</Text>
//                                     </Pressable>
//                                 </View>
//                             </View>
//                         </Modal>
//                     </>
//             }
//             <StatusBar style="auto" />
//         </View>
//     );
// })
// {/**5819 */ }
// {/**@Hard265 */ }

// function Options({ title, children }: { title: string; children: React.ReactNode }) {
//     return <>
//         <View className="my-0.5">
//             <Text className="text-start dark:text-white font-medium p-1">{title}</Text>
//             <View className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
//                 {children}
//             </View>
//         </View>
//     </>
// }

// interface OptionProps {
//     label: string,
//     icon: string,
//     isTrailing?: boolean,
//     onTap?: () => void
// }

// function Option({ label, icon, isTrailing = false, onTap }: OptionProps) {
//     const { colorScheme } = useColorScheme()
//     return <>
//         <Pressable onPress={onTap} className={"flex flex-row px-4 py-2.5 justify-between " + (!isTrailing && 'border-b border-gray-300 dark:border-gray-700')}>
//             <Text className="dark:text-white font-medium capitalize">{label}</Text>
//             {/**@ts-ignore */}
//             <Feather name={icon} size={20} color={theme[colorScheme].tint} />
//         </Pressable>
//     </>
// }