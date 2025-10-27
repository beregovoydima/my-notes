import React from 'react';
import {Menu} from 'react-native-paper';
import {useTheme} from '@/assets/config/colors';
import {NotesSortType, SortDirection} from '@/core/interfaces';
import {useTranslation} from '@/core/i18n';
import {memo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';

interface Props {
  sortType: NotesSortType;
  changeSort: (sort: NotesSortType, direction: SortDirection) => void;
}

export const SortedNotesMenu = memo(({changeSort}: Props) => {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const change = (sort: NotesSortType, direction: SortDirection) => {
    changeSort(sort, direction);
    setVisible(false);
  };

  const getIconButton = () => {
    return (
      <IconButton
        icon="sort-variant"
        style={styles.anchor}
        onPress={openMenu}
      />
    );
  };

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      contentStyle={[
        {backgroundColor: colors.whiteColor},
        styles.content,
        styles.menuPadding,
      ]}
      anchor={getIconButton()}>
      <Menu.Item
        leadingIcon="sort-clock-ascending-outline"
        onPress={() => change('created', 'asc')}
        title={t('sorting.byCreationDate')}
        titleStyle={styles.titleStyle}
      />
      <Menu.Item
        leadingIcon="sort-clock-descending-outline"
        onPress={() => change('created', 'desc')}
        title={t('sorting.byCreationDate')}
        titleStyle={styles.titleStyle}
      />
      <Menu.Item
        leadingIcon="sort-clock-ascending"
        onPress={() => change('updated', 'asc')}
        title={t('sorting.byUpdateDate')}
        titleStyle={styles.titleStyle}
      />
      <Menu.Item
        leadingIcon="sort-clock-descending"
        onPress={() => change('updated', 'desc')}
        title={t('sorting.byUpdateDate')}
        titleStyle={styles.titleStyle}
      />
      <Menu.Item
        leadingIcon="sort-bool-ascending"
        onPress={() => change('color', 'asc')}
        title={t('sorting.byColor')}
        titleStyle={styles.titleStyle}
      />
      <Menu.Item
        leadingIcon="sort-bool-descending"
        onPress={() => change('color', 'desc')}
        title={t('sorting.byColor')}
        titleStyle={styles.titleStyle}
      />
      <Menu.Item
        leadingIcon="sort-alphabetical-ascending"
        onPress={() => change('title', 'asc')}
        title={t('sorting.byTitle')}
        titleStyle={styles.titleStyle}
      />
      <Menu.Item
        leadingIcon="sort-alphabetical-descending"
        onPress={() => change('title', 'desc')}
        title={t('sorting.byTitle')}
        titleStyle={styles.titleStyle}
      />
      <Menu.Item
        leadingIcon="sort-alphabetical-ascending"
        onPress={() => change('folder', 'asc')}
        title={t('sorting.byFolderName')}
        titleStyle={styles.titleStyle}
      />
      <Menu.Item
        leadingIcon="sort-alphabetical-descending"
        onPress={() => change('folder', 'desc')}
        title={t('sorting.byFolderName')}
        titleStyle={styles.titleStyle}
      />
    </Menu>
  );
});

const styles = StyleSheet.create({
  content: {
    top: 16,
    right: 16,
  },
  anchor: {
    margin: 0,
    padding: 0,
    bottom: 8,
    right: 8,
  },
  menuPadding: {
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  titleStyle: {
    lineHeight: 18,
  },
});
