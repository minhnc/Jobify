import {useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {onlineManager} from '@tanstack/react-query';

export function useOnlineManager() {
  useEffect(() => {
    return NetInfo.addEventListener(state => {
      onlineManager.setOnline(
        state.isConnected != null &&
          state.isConnected &&
          Boolean(state.isInternetReachable),
      );
    });
  }, []);
}
