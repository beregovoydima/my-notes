import {useTheme} from '@/assets/config/colors';
import React, {memo, useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton, Icon, Menu, Text} from 'react-native-paper';
import {useTranslation} from '@/core/i18n';

interface Props {
  editList: (id: string) => void;
  deleteList: (id: string) => void;
  shareList: () => void;
  listId: string;
}

export const ListMenu = memo(
  ({editList, deleteList, shareList, listId}: Props) => {
    const {colors} = useTheme();
    const {t} = useTranslation();
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

    const getEditTitle = useCallback(
      () => <Text style={{color: colors.text}}>{t('common.edit')}</Text>,
      [colors.text, t],
    );

    const getShareTitle = useCallback(
      () => <Text style={{color: colors.text}}>{t('common.share')}</Text>,
      [colors.text, t],
    );

    const getDeleteTitle = useCallback(
      () => <Text style={{color: colors.text}}>{t('common.delete')}</Text>,
      [colors.text, t],
    );

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

    const getShareIcon = useCallback(
      () => (
        <Icon source="share-variant-outline" size={22} color={colors.text} />
      ),
      [colors.text],
    );

    const getDeleteIcon = useCallback(
      () => <Icon source="delete-outline" size={22} color={colors.text} />,
      [colors.text],
    );

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
            <IconButton size={22} icon={getMenuIcon} onPress={openMenu} />
          }>
          <Menu.Item
            leadingIcon={getEditIcon}
            onPress={() => changeFolder()}
            title={getEditTitle()}
          />
          <Menu.Item
            leadingIcon={getShareIcon}
            onPress={() => {
              shareList();
              closeMenu();
            }}
            title={getShareTitle()}
          />
          <Menu.Item
            leadingIcon={getDeleteIcon}
            onPress={() => {
              delFolder();
            }}
            title={getDeleteTitle()}
          />
        </Menu>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  content: {
    top: 16,
    right: 16,
  },
  icon: {
    margin: 0,
  },
  menuPadding: {
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});
