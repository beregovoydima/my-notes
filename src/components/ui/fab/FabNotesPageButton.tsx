import {useTheme} from '@/assets/config/colors';
import {NotesPageType, ScreenNavigationProp} from '@/core/interfaces';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {FAB, Portal} from 'react-native-paper';

interface Props {
  showFolderModal: () => void;
  pageType: NotesPageType;
}

export const FabNotesPageButton = ({showFolderModal, pageType}: Props) => {
  const navigation: ScreenNavigationProp = useNavigation();
  const {colors} = useTheme();
  const isFocused = useIsFocused();

  const onButtonPress = () => {
    if (pageType === 'folders') {
      showFolderModal();
    }
    if (pageType === 'list') {
      navigation.navigate('ListEdit', {listId: null});
    }
    if (pageType === 'notes') {
      navigation.navigate('NoteEdit', {noteId: null});
    }
  };

  return (
    <Portal>
      <FAB
        visible={isFocused}
        icon={'plus'}
        color={colors.whiteColor}
        onPress={() => onButtonPress()}
        style={[fabStyle.button, {backgroundColor: colors.primary}]}
      />
    </Portal>
  );
};

const fabStyle = StyleSheet.create({
  button: {
    borderRadius: 30,
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 60,
    opacity: 0.9,
  },
});
