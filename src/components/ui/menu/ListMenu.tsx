import {useTheme} from '@/assets/config/colors';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider, IconButton, Menu} from 'react-native-paper';

interface Props {
  editList: (id: string) => void;
  deleteList: (id: string) => void;
  listId: string;
}

export const ListMenu = ({editList, deleteList, listId}: Props) => {
  const {colors} = useTheme();
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const changeFolder = () => {
    closeMenu();
    editList(listId);
  };

  const delFolder = () => {
    deleteList(listId);
  };

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        contentStyle={[{backgroundColor: colors.whiteColor}, styles.content]}
        anchor={
          <IconButton
            style={styles.icon}
            size={26}
            icon="dots-vertical"
            iconColor={colors.greyColor}
            onPress={openMenu}
          />
        }>
        <Menu.Item
          onPress={() => {
            delFolder();
          }}
          title="Удалить"
        />
        <Divider />
        <Menu.Item onPress={() => changeFolder()} title="Редактировать" />
        <Divider />
        <Menu.Item onPress={() => {}} title="To do" />
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    top: 16,
    right: 16,
  },
  icon: {
    margin: 0,
  },
});
