import {useTheme} from '@/assets/config/colors';
import {NotesSortType} from '@/core/interfaces';
import React, {memo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Divider, IconButton, Menu} from 'react-native-paper';

interface Props {
  sortType: NotesSortType;
  changeSort: (sort: NotesSortType) => void;
}

export const SortedNotesMenu = memo(({changeSort, sortType}: Props) => {
  const {colors} = useTheme();
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const change = (sort: NotesSortType) => {
    changeSort(sort);
    setVisible(false);
  };

  const icons = {
    created: 'sort-clock-ascending-outline',
    updated: 'sort-clock-ascending',
    color: 'sort-bool-ascending',
    title: 'sort-alphabetical-ascending',
  };

  const getIconButton = () => {
    return (
      <IconButton
        icon={icons[sortType]}
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
        onPress={() => change('created')}
        title="По дате создания"
      />
      <Divider />
      <Menu.Item
        leadingIcon="sort-clock-ascending"
        onPress={() => change('updated')}
        title="По дате изменения"
      />
      <Divider />
      <Menu.Item
        leadingIcon="sort-bool-ascending"
        onPress={() => change('color')}
        title="По цвету"
      />
      <Divider />
      <Menu.Item
        leadingIcon="sort-alphabetical-ascending"
        onPress={() => change('title')}
        title="По названию"
      />
      <Divider />
      <Menu.Item onPress={() => {}} title="To do" />
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
