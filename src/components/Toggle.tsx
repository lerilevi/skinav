import React from 'react';
import { Pressable, View } from 'react-native';

import { theme } from '../theme';

interface ToggleProps {
  value: boolean;
  onToggle: () => void;
  onColor?: string;
}

// The pill switch used in Account preferences and the Friends share-location row.
export function Toggle({ value, onToggle, onColor = theme.cyan }: ToggleProps) {
  return (
    <Pressable
      onPress={onToggle}
      hitSlop={8}
      style={{
        width: 38,
        height: 22,
        borderRadius: 11,
        backgroundColor: value ? onColor : 'rgba(255,255,255,0.12)',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          position: 'absolute',
          top: 2,
          left: value ? 18 : 2,
          width: 18,
          height: 18,
          borderRadius: 9,
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOpacity: 0.25,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
          elevation: 2,
        }}
      />
    </Pressable>
  );
}
