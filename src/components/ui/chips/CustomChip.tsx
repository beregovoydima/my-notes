import React from 'react';
import {Chip} from 'react-native-paper';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';

export const CustomChip = ({
  mode = 'flat',
  icon,
  children,
  onPress,
}: {
  children: React.ReactNode;
  mode?: 'flat' | 'outlined';
  icon?: IconSource;
  onPress: () => void;
}) => {
  return (
    <Chip icon={icon ? icon : undefined} mode={mode} onPress={() => onPress()}>
      {children}
    </Chip>
  );
};
