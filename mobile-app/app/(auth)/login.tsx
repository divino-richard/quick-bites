import { Text, View } from '@/components/Themed';
import { Image, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';

export default function TabOneScreen() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="flex-1">
      <View className='items-center py-12 mt-5'>
        <Image 
          className="h-[200px] w-[200px]"
          source={require("../../assets/images/quick-bites-logo.png")}/>
      </View>
      <View className='px-5 gap-y-5'>
        <Text className='font-bold text-sm text-sky-900'>Login Account</Text>
        
        <View className='p-3 rounded-lg border border-slate-500'>
          <TextInput className='text-lg' placeholder="email"/>
        </View>

        <View className='flex-row justify-between items-center p-3 rounded-lg border border-slate-500'>
          <TextInput secureTextEntry={showPassword ? false : true} placeholder='password'/>
          <TouchableOpacity 
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text className='text-slate-500'>
              <Feather name={showPassword ? "eye" : "eye-off"} size={25} />
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity className='p-4 bg-rose-600 rounded-2xl'>
          <Text className='text-center text-white font-bold text-sm'>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

