
import { Modal, Pressable, StyleSheet, View } from "react-native";

export default function Dialog({ shown, onRequestClose, children }: { shown: boolean, onRequestClose: () => void, children: React.ReactNode })
{

    return (
        <Modal transparent statusBarTranslucent onRequestClose={onRequestClose}>
            <Pressable style={StyleSheet.absoluteFill} className="bg-black/75" />
            <View className="min-w-[280px] max-w-[520px] p-[24px] rounded-[24px]">
                {children}
            </View>
        </Modal>
    )
}

export const DialogTitle = ({ children }: { children: React.ReactNode }) =>
{
    return (
        <View className="mb-[16px] text-start">
            {children}
        </View>
    )
}

export const DialogActions = ({ children, ...props }: { children: React.ReactNode }) =>
{
    return (
        <View className="flex flex-row justify-end mt-[24px] gap-x-[8px]" {...props}>
            {children}
        </View>
    )
}