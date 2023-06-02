import { useTheme } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "@app/screens/Home";
import JobDetails from "@app/screens/JobDetails";

import { HomeStackNav } from './types';

const Stack = createNativeStackNavigator<HomeStackNav>()

export const HomeStack = () => {
    const { colors } = useTheme()

    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerStyle: { backgroundColor: colors.background },
                    headerShadowVisible: false,
                    headerTitle: ''
                }}
            />
            <Stack.Screen
                name="JobDetails"
                component={JobDetails}
                options={{ headerTitle: "TODO-name here" }}
            />
        </Stack.Navigator>
    )
}