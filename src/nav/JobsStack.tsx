import { createNativeStackNavigator } from "@react-navigation/native-stack";

import JobsList from "@app/screens/JobsList";
import JobDetails from "@app/screens/JobDetails";

import { JobsStackNav } from './types';

const Stack = createNativeStackNavigator<JobsStackNav>()

export const JobsStack = () => (
    <Stack.Navigator initialRouteName="JobsList">
        <Stack.Screen
            name="JobsList"
            component={JobsList}
            options={{ headerTitle: 'Jobs' }}
        />
        <Stack.Screen
            name="JobDetails"
            component={JobDetails}
            options={{ headerTitle: "TODO-name here" }}
        />
    </Stack.Navigator>
)