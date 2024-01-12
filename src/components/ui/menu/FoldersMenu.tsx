import {useTheme} from '@/assets/config/colors';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider, IconButton, Menu} from 'react-native-paper';

export const FoldersMenu = () => {
  const {colors} = useTheme();
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        contentStyle={[{backgroundColor: colors.background}, styles.content]}
        anchor={
          <IconButton size={24} icon="dots-vertical" onPress={openMenu} />
        }>
        <Menu.Item onPress={() => {}} title="Удалить" />
        <Divider />
        <Menu.Item onPress={() => {}} title="Редактировать" />
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
});
