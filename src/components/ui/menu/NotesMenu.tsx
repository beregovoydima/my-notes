import React from 'react';
import {Menu} from 'react-native-paper';
import {useTheme} from '@/assets/config/colors';
import {NotesItems} from '@/core/interfaces';
import {useTranslation} from '@/core/i18n';
import {StyleSheet, View} from 'react-native';
import {Divider, IconButton} from 'react-native-paper';
import {memo, useState} from 'react';

interface Props {
  editNote: (id: string) => void;
  deleteNote: (id: string) => void;
  notes: NotesItems;
}

export const NotesMenu = memo(({editNote, deleteNote, notes}: Props) => {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

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
        contentStyle={[{backgroundColor: colors.whiteColor}, styles.content]}
        anchor={
          <IconButton size={24} icon="dots-vertical" onPress={openMenu} />
        }>
        <Menu.Item
          onPress={() => {
            delFolder();
          }}
          title={t('common.delete')}
        />
        <Divider />
        <Menu.Item onPress={() => changeFolder()} title={t('common.edit')} />
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
});
