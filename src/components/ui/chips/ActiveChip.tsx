import React from 'react';
import {Chip} from 'react-native-paper';
import {useTheme} from '@/assets/config/colors';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';

interface ActiveChipProps {
  label: string;
  active: boolean;
  icon?: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const ActiveChip: React.FC<ActiveChipProps> = ({
  label,
  active,
  icon,
  onPress,
  style,
  textStyle,
  ...props
}) => {
  const {colors} = useTheme();

  return (
    <Chip
      icon={icon}
      onPress={onPress}
      textStyle={[{color: active ? colors.black : colors.text}, textStyle]}
      style={[
        // eslint-disable-next-line react-native/no-inline-styles
        {marginHorizontal: 4, borderWidth: 1},
        // eslint-disable-next-line react-native/no-inline-styles
        {
          backgroundColor: active
            ? colors.activeChipColor
            : colors.inactiveChipColor,
          borderColor: active ? 'transparent' : colors.navbar,
        },
        style,
      ]}
      {...props}>
      {label}
    </Chip>
  );
};
