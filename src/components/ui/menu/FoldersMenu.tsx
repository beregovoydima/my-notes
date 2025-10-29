import React, {useCallback} from 'react';
import {Icon, Menu, Text} from 'react-native-paper';
import {useTheme} from '@/assets/config/colors';
import {NotesFolderItem} from '@/core/interfaces';
import {useTranslation} from '@/core/i18n';
import {memo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton} from 'react-native-paper';

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

  const getMenuIcon = useCallback(
    () => (
      <Icon source="dots-vertical" size={22} color={colors.greyIconColor} />
    ),
    [colors.greyIconColor],
  );

  const getEditIcon = useCallback(
    () => <Icon source="pencil-outline" size={22} color={colors.text} />,
    [colors.text],
  );

  const getDeleteIcon = useCallback(
    () => <Icon source="delete-outline" size={22} color={colors.text} />,
    [colors.text],
  );

  const getEditTitle = useCallback(
    () => <Text style={{color: colors.text}}>{t('common.edit')}</Text>,
    [colors.text, t],
  );

  const getDeleteTitle = useCallback(
    () => <Text style={{color: colors.text}}>{t('common.delete')}</Text>,
    [colors.text, t],
  );

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        contentStyle={[
          styles.content,
          styles.menuPadding,
          {backgroundColor: colors.menuBackgroundColor},
        ]}
        anchor={<IconButton size={22} icon={getMenuIcon} onPress={openMenu} />}>
        <Menu.Item
          onPress={() => changeFolder()}
          title={getEditTitle()}
          leadingIcon={getEditIcon}
          titleStyle={styles.titleStyle}
        />
        {folder.isDeletable ? (
          <>
            <Menu.Item
              onPress={() => {
                delFolder();
              }}
              title={getDeleteTitle()}
              leadingIcon={getDeleteIcon}
              titleStyle={styles.titleStyle}
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
  titleStyle: {
    lineHeight: 18,
  },
});
