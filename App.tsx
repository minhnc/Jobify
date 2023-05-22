import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { JobsStack } from '@app/nav/JobsStack';

function App(): JSX.Element {

  return (
    <NavigationContainer>
      <JobsStack />
    </NavigationContainer>
  )
}

export default App;
