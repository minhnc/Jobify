import React from 'react';
import { QueryClient, QueryClientProvider, focusManager } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  useTheme
} from 'react-native-paper';

import { HomeStack } from '@app/nav/HomeStack';
import { useOnlineManager } from '@app/hooks/useOnlineManager';
import { useAppState } from '@app/hooks/useAppState';

import { AppStateStatus } from 'react-native/types';

function onAppStateChange(status: AppStateStatus) {
  focusManager.setFocused(status === 'active');
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 3 } },
});

const theme = {
  ...DefaultTheme,
  spacing: {
    xs: 10,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32
  }
}

export const useAppTheme = () => useTheme<typeof theme>()

function App(): JSX.Element {
  useOnlineManager()
  useAppState(onAppStateChange)

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <HomeStack />
        </NavigationContainer>
      </PaperProvider>
    </QueryClientProvider>
  )
}

export default App;
