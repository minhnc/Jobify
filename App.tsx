import React from 'react';
import { QueryClient, QueryClientProvider, focusManager } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';

import { JobsStack } from '@app/nav/JobsStack';
import { useOnlineManager } from '@app/hooks/useOnlineManager';
import { useAppState } from '@app/hooks/useAppState';

import { AppStateStatus } from 'react-native/types';

function onAppStateChange(status: AppStateStatus) {
  focusManager.setFocused(status === 'active');
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 3 } },
});

function App(): JSX.Element {
  useOnlineManager()
  useAppState(onAppStateChange)

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <JobsStack />
      </NavigationContainer>
    </QueryClientProvider>
  )
}

export default App;
