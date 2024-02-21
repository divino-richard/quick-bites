import { Image, Pressable, StyleSheet } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { useSession } from '@/utils/useSession';
import Confirm from '@/components/pop-up/Confirm';

export default function Settings() {
  const [[isLoading], setSesssion] = useSession();
  return (
    <View style={styles.container}>
      <View>
        <Avatar.Image 
          size={120}  
          style={{backgroundColor: Colors.lightGray}}
          source={require('../../assets/images/profile-placeholder.png')}
        />
        <AntDesign 
          name="pluscircle"
          style={styles.addProfileIcon}
          size={25} 
          color={Colors.orange}
        />
      </View>
      <Button 
        labelStyle={{color: Colors.darkGray}} 
        mode='text'
      >
        Logout
      </Button>

      <Confirm show={true} onCancel={() => {}} onConfirm={() => {}} >
        <View>
          <Text>Hello</Text>
        </View>
      </Confirm>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 25,
    rowGap: 25
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  addProfileIcon: {
    position: "absolute",
    bottom: 7,
    right: 7,
  },
});
