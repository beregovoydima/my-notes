import React from 'react';
import {Menu, Icon, Text} from 'react-native-paper';
import {useTheme} from '@/assets/config/colors';
import {NotesItems} from '@/core/interfaces';
import {useTranslation} from '@/core/i18n';
import {StyleSheet, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {memo, useState, useCallback} from 'react';

interface Props {
  editNote: (id: string) => void;
  deleteNote: (id: string) => void;
  shareNote: () => void;
  notes: NotesItems;
}

export const NotesMenu = memo(
  ({editNote, deleteNote, shareNote, notes}: Props) => {
    const {colors} = useTheme();
    const {t} = useTranslation();
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

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

    const getMenuIcon = useCallback(
      () => (
        <Icon source="dots-vertical" size={22} color={colors.greyIconColor} />
      ),
      [colors.greyIconColor],
    );

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

    const changeFolder = () => {
      closeMenu();
      editNote(notes.id);
    };

    const delFolder = () => {
      deleteNote(notes.id);
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
              shareNote();
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
  menuPadding: {
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});
