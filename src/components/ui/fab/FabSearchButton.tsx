import React, {useRef} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {FAB} from 'react-native-paper';
import {useTheme} from '@/assets/config/colors';

interface FabSearchButtonProps {
  onPress: () => void;
  isVisible?: boolean;
}

export const FabSearchButton: React.FC<FabSearchButtonProps> = ({
  onPress,
  isVisible = true,
}) => {
  const {colors} = useTheme();
  const fabAnimation = useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.timing(fabAnimation, {
      toValue: isVisible ? 1 : 0,
      duration: 40,
      useNativeDriver: true,
    }).start();
  }, [isVisible, fabAnimation]);

  return (
    <Animated.View
      style={[
        styles.fabContainer,
        {
          opacity: fabAnimation,
          transform: [
            {
              scale: fabAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1],
              }),
            },
          ],
        },
      ]}>
      <FAB
        icon="magnify"
        style={[styles.fab, {backgroundColor: colors.primary}]}
        onPress={onPress}
        color={colors.whiteColor}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  fab: {
    borderRadius: 40,
  },
});
