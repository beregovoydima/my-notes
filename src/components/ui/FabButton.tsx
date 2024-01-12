import {lightColors, useTheme} from '@/assets/config/colors';
import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {StyleSheet} from 'react-native';
import {FAB, Portal} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const FabButton = () => {
  const [state, setState] = React.useState({open: false});
  const navigation = useNavigation();

  const onStateChange = ({open}: {open: boolean}) => setState({open});

  const {open} = state;

  const {colors} = useTheme();

  const getIcon = (size: number, name: string) => {
    return <Icon name={name} color={colors.primary} size={size} />;
  };

  return (
    <>
      {navigation.isFocused() ? (
        <Portal>
          <FAB.Group
            open={open}
            visible
            icon={open ? 'close' : 'plus'}
            backdropColor={colors.background}
            variant="secondary"
            color="white"
            fabStyle={fabStyle.button}
            style={fabStyle.ccc}
            actions={[
              {
                icon: ({size}) => getIcon(size, 'plus'),
                label: 'Создать',
                labelTextColor: colors.text,
                onPress: () => console.log('Pressed add'),
              },
              {
                icon: ({size}) => getIcon(size, 'email'),
                label: 'Email',
                labelTextColor: colors.text,
                onPress: () => console.log('Pressed email'),
              },
              {
                icon: ({size}) => getIcon(size, 'bell'),
                label: 'Напомнить',
                labelTextColor: colors.text,
                onPress: () => console.log('Pressed notifications'),
              },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
      ) : (
        <></>
      )}
    </>
  );
};

const fabStyle = StyleSheet.create({
  button: {
    backgroundColor: lightColors.primary,
    borderRadius: 40,
  },
  ccc: {
    opacity: 0.9,
    paddingBottom: 60,
  },
});
