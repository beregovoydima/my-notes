import {NotesPageType} from '@/core/interfaces/notes';
import React from 'react';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';
import {SegmentedButtons} from 'react-native-paper';

interface Props {
  changePageType: (val: string) => void;
  page: NotesPageType;
}

export const NotesSegmentedButtons = ({changePageType, page}: Props) => {
  return (
    <View style={styles.container}>
      <SegmentedButtons
        value={page}
        onValueChange={changePageType}
        style={styles.buttons}
        buttons={[
          {
            icon: 'note-multiple',
            value: 'all',
            label: 'Все',
          },
          {
            icon: 'note-multiple',
            value: 'notes',
            label: 'Заметки',
          },
          {
            icon: 'clipboard-list',
            value: 'list',
            label: 'Списки',
          },
          {
            icon: 'folder',
            value: 'folders',
            label: 'Папки',
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  buttons: {
    marginLeft: 8,
    marginRight: 8,
  },
});
