import { Feather } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { BarcodeScanningResult, CameraProps, CameraView, useCameraPermissions } from "expo-camera/next";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Modal, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";

export default function ScanQRBottomsheet({ visible, onScanQR, onRequestClose }: { visible: boolean, onScanQR: ({ data }: { data: string }) => void, onRequestClose: () => void }) {
    const [permission, requestPermission] = useCameraPermissions();
    const [hasScanned, setHasScanned] = React.useState(false);

    const pattern = /^[A-Za-z0-9]+\?key=[A-Za-z0-9]+$/

    const onQRCodeScanned = (scanningResult: BarcodeScanningResult) => {
        if (pattern.test(scanningResult.data) && !hasScanned) {
            setHasScanned(true);
            onScanQR(scanningResult);
            onRequestClose();
        }
    }

    return (
        <Modal visible={visible} transparent statusBarTranslucent onRequestClose={onRequestClose} className="flex-1 items-center justify-center">
            <Pressable style={StyleSheet.absoluteFill} className="bg-black/75" onPress={onRequestClose} />
            <Animated.View entering={SlideInDown} exiting={SlideOutDown} className="flex-1 flex pt-8">
                <View className="flex-1 flex flex-col rounded-lg bg-white">
                    <CameraView style={StyleSheet.absoluteFill} onBarcodeScanned={onQRCodeScanned}>
                        <View className="flex flex-row justify-between p-4 border-b border-slate-300 bg-white">
                            <Text className="text-lg font-medium">Scan QR code</Text>
                            <Pressable onPress={onRequestClose}>
                                <Feather name="x" size={24} />
                            </Pressable>
                        </View>

                    </CameraView>
                </View>
            </Animated.View>
            <StatusBar style="auto" />
        </Modal>
    );
}