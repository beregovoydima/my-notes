import {lightColors} from '@/assets/config/colors';
import {ScreenNavigationProp} from '@/core/interfaces';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {FAB, Portal} from 'react-native-paper';

export const FabAddCalendarEventButton = ({
  selectDate,
}: {
  selectDate: string;
}) => {
  const navigation: ScreenNavigationProp = useNavigation();

  const isFocused = useIsFocused();

  const onButtonPress = () => {
    navigation.push('CalendarEvent', {selectedDate: selectDate});
  };

  return (
    <Portal>
      <FAB
        visible={isFocused}
        icon={'plus'}
        onPress={() => onButtonPress()}
        style={[fabStyle.button]}
        color={lightColors.whiteColor}
      />
    </Portal>
  );
};

const fabStyle = StyleSheet.create({
  button: {
    backgroundColor: lightColors.primary,
    borderRadius: 30,
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 60,
    opacity: 0.9,
  },
});
