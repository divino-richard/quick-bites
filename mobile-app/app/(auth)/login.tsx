import { Text, View } from '@/components/Themed';
import { Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <ScrollView className="bg-white">
      <View className='items-center py-5 mt-5'>
        <Image 
          className="h-[250px] w-[250px]"
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

        <View className="flex-row gap-x-2 justify-center">
          <Text className='text-sky-900'>Doesn't have an account?</Text>
          <TouchableOpacity>
          <Text className='text-rose-600' onPress={() => router.push("/(auth)/register")}>Register here</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}

