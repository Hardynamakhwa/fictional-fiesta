import React from "react";
import { Modal, TextInput } from "react-native";

export default function ScanQRCodePrompt({ isOpen, onClose, onConfirm }: { isOpen: boolean; onClose: () => void; onConfirm: (displayName: string) => void; }) {
    const [displayName, setDisplayName] = React.useState('');

    const handleConfirm = () => {
        // Ensure display name is not empty before confirming
        if (displayName.trim() !== '') {
            onConfirm(displayName);
        }
    };

    return (
        <Modal
            animationType="fade"
            visible={isOpen}
            onRequestClose={onClose}
        >
            <TextInput
            
                value={displayName}
                onChangeText={setDisplayName}
                placeholder="Enter display name" />
            <button onClick={handleConfirm}>Confirm</button>
            <button onClick={onClose}>Cancel</button>
        </Modal>
    );
};
