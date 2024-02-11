import Loading from '@/components/Loading';
import { Text, View } from '@/components/Themed';
import { useSession } from '@/utils/useSession';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function Profile() {
  const router = useRouter()
  const [, setSession] = useSession();

  return (
    <View className='flex-1 items-center p-5'>
      <Text>Profile</Text>

      <TouchableOpacity
        className="w-full bg-[#003885] items-center p-3 rounded-[50px]"
        onPress={() => {
          setSession(null)
          router.replace('/(auth)/login');
        }}
      >
        <Text className="text-white font-bold text-sm">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
