import {useTheme} from '@/assets/config/colors';
import {NotesSortType} from '@/core/interfaces';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Divider, IconButton, Menu} from 'react-native-paper';

interface Props {
  changeSort: (sort: NotesSortType) => void;
}

export const SortedNotesMenu = ({changeSort}: Props) => {
  const {colors} = useTheme();
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const change = (sort: NotesSortType) => {
    changeSort(sort);
    setVisible(false);
  };

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      contentStyle={[{backgroundColor: colors.whiteColor}, styles.content]}
      anchor={
        <IconButton icon="sort" style={styles.anchor} onPress={openMenu} />
      }>
      <Menu.Item onPress={() => change('created')} title="По дате создания" />
      <Divider />
      <Menu.Item onPress={() => change('updated')} title="По дате изменения" />
      <Divider />
      <Menu.Item onPress={() => change('color')} title="По цвету" />
      <Divider />
      <Menu.Item onPress={() => change('title')} title="По названию" />
      <Divider />
      <Menu.Item onPress={() => {}} title="To do" />
    </Menu>
  );
};

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
