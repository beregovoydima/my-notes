import React from 'react';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';
import {SegmentedButtons} from 'react-native-paper';
import {NotesPageType} from '@/core/interfaces';
import {useTranslation} from '@/core/i18n';

interface Props {
  changePageType: (val: NotesPageType) => void;
  page: NotesPageType;
}

export const NotesSegmentedButtons = ({changePageType, page}: Props) => {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <SegmentedButtons
        value={page}
        onValueChange={val => changePageType(val as NotesPageType)}
        style={styles.buttons}
        density="small"
        buttons={[
          {
            icon: page === 'all' ? 'note-multiple' : 'note-multiple-outline',
            value: 'all',
            label: t('filters.all'),
            labelStyle: styles.labelStyle,
          },
          {
            icon: page === 'notes' ? 'note-multiple' : 'note-multiple-outline',
            value: 'notes',
            label: t('filters.notes'),
            labelStyle: styles.labelStyle,
          },
          {
            icon: page === 'list' ? 'clipboard-list' : 'clipboard-list-outline',
            value: 'list',
            label: t('filters.lists'),
            labelStyle: styles.labelStyle,
          },
          {
            icon: page === 'folders' ? 'folder' : 'folder-outline',
            value: 'folders',
            label: t('filters.folders'),
            labelStyle: styles.labelStyle,
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
  labelStyle: {
    fontSize: 11,
  },
});
