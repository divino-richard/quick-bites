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
            <View className='flex-1 justify-center'>
                <View className='p-5 bg-white shadow-lg shadow-slate-700 w-[80%] mx-auto items-center rounded-md'>
                    {type === "success" && <Image className='w-20 h-20' source={require('../../assets/images/double-check.gif')} /> }
                    <Text className='font-bold text-slate-700'>{message}</Text>
                    <TouchableOpacity
                        className='w-[50%] items-center p-3 mt-5 bg-[#003885] rounded-lg'
                        onPress={onOkay}
                    >
                        <Text className='text-white font-bold text-sm'>{okText || 'Ok'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default AlertMessage
