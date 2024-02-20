import { UserType } from "@/types/user.types";
import { Image, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

interface Props {
    userType: UserType;
    description: string;
    imagePath: any;
    onClick: (value: UserType) => void;
}

export default function RegistrationTypeCard(props: Props) {
    const {userType, description, imagePath, onClick} = props
    return (
        <Card style={styles.container} onPress={() => onClick(userType)} >
            <Card.Content style={styles.cardContent}>
                <View style={styles.imageCircle}>
                    <Image style={styles.cardImage} source={imagePath}/>
                </View>
                <View style={{flex: 1, rowGap: 10}}> 
                    <Text variant="titleMedium">{userType.toUpperCase()}</Text>
                    <Text variant="bodySmall">{description}</Text>
                </View>
            </Card.Content>
        </Card>
    )
} 

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF"
    },
    cardImage: {
        height: 30,
        width: 30,
    },
    imageCircle: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: "#f8f8f8",
        alignItems: "center", 
        justifyContent: "center"
    },
    cardContent: {
        flexDirection: "row",
        columnGap: 25,
    },
})

