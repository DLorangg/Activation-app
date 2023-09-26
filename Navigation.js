import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Screens
import LoginScreen from "./screens/LoginScreen";
import ButtonScreen from "./screens/ButtonScreen";

const Stack = createNativeStackNavigator();

function MyStack(){
    return(
        <NavigationContainer theme={MyTheme}>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
                <Stack.Screen options={{headerShown: false}} name="Button" component={ButtonScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default function Navigation(){
    return(
        <MyStack />
    )
}
const MyTheme = {
    colors: {
      background: '#ffffff'
    },
};