import React from 'react'
import { View } from './Themed'
import { Image } from 'react-native'

function Loading() {
    return (
        <View className='w-full h-full bg-white justify-center items-center'>
            <Image className="w-[75px] h-[75px]" source={require('../assets/images/loading.gif')} />
        </View>
    )
}

export default Loading
