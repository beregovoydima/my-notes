import {useTheme} from '@/assets/config/colors';
import {NotesSortType, SortDirection} from '@/core/interfaces';
import React, {memo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Divider, IconButton, Menu} from 'react-native-paper';

interface Props {
  sortDirection: SortDirection;
  sortType: NotesSortType;
  changeSort: (sort: SortDirection) => void;
}

export const SortedTypeNotesMenu = memo(
  ({changeSort, sortDirection, sortType}: Props) => {
    const {colors} = useTheme();
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const change = (sort: SortDirection) => {
      changeSort(sort);
      setVisible(false);
    };

    const icons = {
      asc: 'sort-ascending',
      desc: 'sort-descending',
    };

    const getIconButton = () => {
      return (
        <IconButton
          icon={icons[sortDirection]}
          style={styles.anchor}
          onPress={openMenu}
        />
      );
    };

    const descStatusName = {
      created: 'От старых к новым',
      updated: 'От старых к новым',
      color: 'По убыванию індекса',
      title: 'От Я до А',
      folder: 'От А до Я',
    };

    const ascStatusName = {
      created: 'От новым к старых',
      updated: 'От новым к старых',
      color: 'По возрастанию індекса',
      title: 'От А до Я',
      folder: 'От А до Я',
    };

    const getDescTitle = () => {
      return descStatusName[sortType];
    };

    const getAscTitle = () => {
      return ascStatusName[sortType];
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
          leadingIcon="sort-descending"
          onPress={() => change('desc')}
          title={getDescTitle()}
        />
        <Divider />
        <Menu.Item
          leadingIcon="sort-ascending"
          onPress={() => change('asc')}
          title={getAscTitle()}
        />
      </Menu>
    );
  },
);

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
});
