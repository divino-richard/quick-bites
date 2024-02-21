import Colors from '@/constants/Colors';
import React from 'react'
import { Image, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from "react-native-paper";

type AlertMessageType = 'error' | 'success' | 'info' | 'warning';
interface Props {
    message: string;
    type: AlertMessageType;
    show: boolean;
    okText?: string;
    onOkay: () => void;
}

export default function AlertMessage(props: Props) {
    const {message, type, show, okText, onOkay} = props

    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={show}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    {type === "success" && (
                        <Image 
                            style={{width: 80, height: 80}} 
                            source={require('../../assets/images/check.gif')} 
                        />
                    )}
                    {type === "error" && (
                        <Image 
                            style={{width: 80, height: 80}} 
                            source={require('../../assets/images/error.gif')} 
                        />
                    )}
                    <Text variant="labelLarge">{message}</Text>
                    
                    <TouchableOpacity
                        onPress={onOkay}
                        style={{marginTop: 15}}
                    >
                        <Text  variant="labelLarge" style={{color: Colors.orange}}>{okText || 'Ok'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        padding: 25,
    },
    content: {
        backgroundColor: "#FFF",
        elevation: 15,
        alignItems: "center",
        padding: 25,
        borderRadius: 15,
        rowGap: 10
    }
})
