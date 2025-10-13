import React from 'react';
import {Menu} from 'react-native-paper';
import {useTheme} from '@/assets/config/colors';
import {NotesFolderItem} from '@/core/interfaces';
import {useTranslation} from '@/core/i18n';
import {memo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider, IconButton} from 'react-native-paper';

interface Props {
  editFolder: (id: string) => void;
  deleteFolder: (id: string) => void;
  folder: NotesFolderItem;
}

export const FoldersMenu = memo(({editFolder, deleteFolder, folder}: Props) => {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const changeFolder = () => {
    closeMenu();
    editFolder(folder.id);
  };

  const delFolder = () => {
    deleteFolder(folder.id);
  };

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        contentStyle={[
          {backgroundColor: colors.whiteColor},
          styles.content,
          styles.menuPadding,
        ]}
        anchor={
          <IconButton size={24} icon="dots-vertical" onPress={openMenu} />
        }>
        <Menu.Item
          onPress={() => changeFolder()}
          title={t('common.edit')}
          leadingIcon="pencil-outline"
        />
        {folder.isDeletable ? (
          <>
            <Divider />
            <Menu.Item
              onPress={() => {
                delFolder();
              }}
              title={t('common.delete')}
              leadingIcon="delete-outline"
            />
          </>
        ) : (
          <></>
        )}
        {/* <Divider />
        <Menu.Item onPress={() => {}} title="To do" /> */}
      </Menu>
    </View>
  );
});

const styles = StyleSheet.create({
  content: {
    top: 16,
    right: 16,
  },
  menuPadding: {
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});
