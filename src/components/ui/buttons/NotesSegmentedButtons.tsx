import React from 'react';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';
import {SegmentedButtons} from 'react-native-paper';
import {NotesPageType} from '@/core/interfaces';
import {useTranslation} from '@/core/i18n';

interface Props {
  changePageType: (val: string) => void;
  page: NotesPageType;
}

export const NotesSegmentedButtons = ({changePageType, page}: Props) => {
  const {t} = useTranslation();

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
            label: t('filters.all'),
          },
          {
            icon: 'note-multiple',
            value: 'notes',
            label: t('filters.notes'),
          },
          {
            icon: 'clipboard-list',
            value: 'list',
            label: t('filters.lists'),
          },
          {
            icon: 'folder',
            value: 'folders',
            label: t('filters.folders'),
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
