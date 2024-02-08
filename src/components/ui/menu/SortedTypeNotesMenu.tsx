import {useTheme} from '@/assets/config/colors';
import {SortDirection} from '@/core/interfaces';
import React, {memo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Divider, IconButton, Menu} from 'react-native-paper';

interface Props {
  sortDirection: SortDirection;
  changeSort: (sort: SortDirection) => void;
}

export const SortedTypeNotesMenu = memo(
  ({changeSort, sortDirection}: Props) => {
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

    return (
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        contentStyle={[{backgroundColor: colors.whiteColor}, styles.content]}
        anchor={getIconButton()}>
        <Menu.Item
          leadingIcon="sort-descending"
          onPress={() => change('desc')}
          title="По возрастанию"
        />
        <Divider />
        <Menu.Item
          leadingIcon="sort-ascending"
          onPress={() => change('asc')}
          title="По убыванию"
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
});
