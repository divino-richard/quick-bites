import React from 'react'
import { View } from './Themed'
import { Image } from 'react-native'

function Loading() {
    return (
        <View>
            <Image width={50} height={50} source={require('../assets/images/loading.gif')} />
        </View>
    )
}

export default Loading
