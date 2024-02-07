import SelectUserType from "@/components/registration/SelectUserType";
import Welcome from "@/components/registration/Welcome";
import { ScrollView, Text, View } from "react-native";

export default function Register () {
    return (
        <ScrollView contentContainerStyle={{flex: 1, justifyContent: "center"}}>
            <SelectUserType />
        </ScrollView>
    )
}