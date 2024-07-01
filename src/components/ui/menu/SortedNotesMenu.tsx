import {useTheme} from '@/assets/config/colors';
import {NotesSortType, SortDirection} from '@/core/interfaces';
import React, {memo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Divider, IconButton, Menu} from 'react-native-paper';

interface Props {
  sortType: NotesSortType;
  changeSort: (sort: NotesSortType, direction: SortDirection) => void;
}

export const SortedNotesMenu = memo(({changeSort}: Props) => {
  const {colors} = useTheme();
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
      contentStyle={[{backgroundColor: colors.whiteColor}, styles.content]}
      anchor={getIconButton()}>
      <Menu.Item
        leadingIcon="sort-clock-ascending-outline"
        onPress={() => change('created', 'asc')}
        title="По дате создания"
      />
      <Divider />
      <Menu.Item
        leadingIcon="sort-clock-descending-outline"
        onPress={() => change('created', 'desc')}
        title="По дате создания"
      />
      <Divider />
      <Menu.Item
        leadingIcon="sort-clock-ascending"
        onPress={() => change('updated', 'asc')}
        title="По дате изменения"
      />
      <Divider />
      <Menu.Item
        leadingIcon="sort-clock-descending"
        onPress={() => change('updated', 'desc')}
        title="По дате изменения"
      />
      <Divider />
      <Menu.Item
        leadingIcon="sort-bool-ascending"
        onPress={() => change('color', 'asc')}
        title="По цвету"
      />
      <Divider />
      <Menu.Item
        leadingIcon="sort-bool-descending"
        onPress={() => change('color', 'desc')}
        title="По цвету"
      />
      <Divider />
      <Menu.Item
        leadingIcon="sort-alphabetical-ascending"
        onPress={() => change('title', 'asc')}
        title="По названию"
      />
      <Divider />
      <Menu.Item
        leadingIcon="sort-alphabetical-descending"
        onPress={() => change('title', 'desc')}
        title="По названию"
      />
      <Divider />
      <Menu.Item
        leadingIcon="sort-alphabetical-ascending"
        onPress={() => change('folder', 'asc')}
        title="По названию папки"
      />
      <Divider />
      <Menu.Item
        leadingIcon="sort-alphabetical-descending"
        onPress={() => change('folder', 'desc')}
        title="По названию папки"
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
});
