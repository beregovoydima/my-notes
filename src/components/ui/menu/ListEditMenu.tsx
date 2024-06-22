import {useTheme} from '@/assets/config/colors';
import React, {memo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider, IconButton, Menu} from 'react-native-paper';

interface Props {
  deleteList: () => void;
  saveList: () => void;
}

export const ListEditMenu = memo(({deleteList, saveList}: Props) => {
  const {colors} = useTheme();
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        contentStyle={[{backgroundColor: colors.whiteColor}, styles.content]}
        anchor={
          <IconButton
            size={24}
            icon="dots-vertical"
            iconColor={colors.greyIconColor}
            onPress={openMenu}
          />
        }>
        <Menu.Item
          onPress={() => {
            saveList();
          }}
          title="Сохранить"
        />
        <Divider />
        <Menu.Item
          onPress={() => {
            deleteList();
          }}
          title="Удалить"
        />
      </Menu>
    </View>
  );
});

const styles = StyleSheet.create({
  content: {
    top: 16,
    right: 16,
  },
});
