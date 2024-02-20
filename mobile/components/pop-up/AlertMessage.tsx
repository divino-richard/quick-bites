import React from 'react'
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';

type AlertMessageType = 'error' | 'success' | 'info' | 'warning';
interface Props {
    message: string;
    type: AlertMessageType;
    show: boolean;
    okText?: string;
    onOkay: () => void;
}

function AlertMessage(props: Props) {
    const {message, type, show, okText, onOkay} = props

    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={show}
        >
            <View>
                <View>
                    {type === "success" && (
                        <Image source={require('../../assets/images/check.gif')} />
                    )}
                    <Text>{message}</Text>
                    <TouchableOpacity
                        onPress={onOkay}
                    >
                        <Text>{okText || 'Ok'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default AlertMessage
