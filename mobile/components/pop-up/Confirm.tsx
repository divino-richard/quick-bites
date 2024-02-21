import React, { Children, ReactNode } from 'react'
import { Modal, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';

interface Props {
    show: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    children?: JSX.Element;
}

function Confirm(props: Props) {
    const {show, onCancel, onConfirm, children} = props

    return (
        <Modal
            transparent={true}
            visible={show}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    {children}

                    <View style={styles.actions}>
                        <TouchableOpacity>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
            </View>
        </Modal>
    )
}

export default Confirm

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 25
    },
    content: {
        backgroundColor: "#FFF",
        elevation: 15,
        width: "100%",
        padding: 25,
        borderRadius: 10,
    },
    actions: {
        flexDirection: "row",
        columnGap: 15,
        justifyContent: "flex-end"
    }
})