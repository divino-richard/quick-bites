import { Image, Text, Touchable, TouchableOpacity, View } from "react-native";

export default function SelectUserType() {
    return (
        <View className="flex-1 bg-blue-50 p-5">
            <Text 
                className="py-10 font-bold text-[#003885] text-3xl"
            >
                Select your registration type below
            </Text>

            <TouchableOpacity className="flex-row p-5 mb-5 rounded-lg bg-white border border-blue-100">
                <Image className="h-[50px] w-[50px] mr-5" source={require('../../assets/images/customer-cart.png')}/>
                <View className="flex-1">
                    <Text className="font-bold mb-2 text-[#003885] text-lg">Customer</Text>
                    <Text>Lorem ipsum dolor, consectetur adipiscing elit, sed do eiusmod tempor</Text>
                </View>
            </TouchableOpacity> 

            <TouchableOpacity className="flex-row p-5 mb-5 rounded-lg bg-white border border-blue-100">
                <Image className="h-[50px] w-[50px] mr-5" source={require('../../assets/images/delivery-rider.png')}/>
                <View className="flex-1">
                    <Text className="font-bold mb-2 text-[#003885] text-lg">Delivery Rider</Text>
                    <Text>Lorem ipsum dolor sit amet, consectetur, sed do eiusmod tempor</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row p-5 rounded-lg bg-white border border-blue-100">
                <Image className="h-[50px] w-[50px] mr-5" source={require("../../assets/images/merchant.png")}/>
                <View className="flex-1">
                    <Text className="font-bold mb-2 text-[#003885] text-lg">Merchant</Text>
                    <Text>Lorem ipsum dolor sit amet, consectetur, sed do eiusmod tempor</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}