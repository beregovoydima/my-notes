import {lightColors, useTheme} from '@/assets/config/colors';
import {ScreenNavigationProp} from '@/core/interfaces';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {FAB, Portal} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  showFolderModal: () => void;
}

export const FabButton = ({showFolderModal}: Props) => {
  const [state, setState] = useState({open: false});
  const navigation: ScreenNavigationProp = useNavigation();
  const onStateChange = ({open}: {open: boolean}) => setState({open});

  const {open} = state;
  const isFocused = useIsFocused();

  const {colors} = useTheme();

  const getIcon = (size: number, name: string) => {
    return <Icon name={name} color={colors.primary} size={size} />;
  };

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible={isFocused}
        icon={open ? 'close' : 'plus'}
        backdropColor={colors.background}
        variant="secondary"
        color="white"
        fabStyle={fabStyle.button}
        style={fabStyle.buttonStyle}
        actions={[
          {
            icon: ({size}) => getIcon(size, 'note'),
            label: 'Создать заметку',
            labelTextColor: colors.text,
            onPress: () => navigation.navigate('NoteEdit', {noteId: null}),
          },
          {
            icon: ({size}) => getIcon(size, 'clipboard-list'),
            label: 'Создать список',
            labelTextColor: colors.text,
            onPress: () => navigation.navigate('ListEdit', {listId: null}),
          },
          {
            icon: ({size}) => getIcon(size, 'folder'),
            label: 'Создать папку',
            labelTextColor: colors.text,
            onPress: () => showFolderModal(),
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
  );
};

const fabStyle = StyleSheet.create({
  button: {
    backgroundColor: lightColors.primary,
    borderRadius: 40,
  },
  buttonStyle: {
    opacity: 0.9,
    paddingBottom: 60,
  },
});
