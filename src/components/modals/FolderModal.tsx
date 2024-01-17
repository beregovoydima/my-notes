import {useTheme} from '@/assets/config/colors';
import {NotesFolderItem} from '@/core/interfaces';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Modal, Portal, Text, IconButton, TextInput} from 'react-native-paper';

interface Props {
  visible: boolean;
  hideModal: () => void;
  saveFolder: (val: string, id?: number) => void;
  editFolder: NotesFolderItem | null;
}

export const FolderModal = ({
  visible,
  hideModal,
  saveFolder,
  editFolder,
}: Props) => {
  const {colors} = useTheme();
  const [text, setText] = useState('');

  const containerStyle = {backgroundColor: 'white', padding: 20, margin: 20};

  const closeModal = () => {
    setText('');
    hideModal();
  };

  const save = () => {
    if (editFolder) {
      saveFolder(text, editFolder.id);
    } else {
      saveFolder(text);
    }
    setText('');
    hideModal();
  };

  useEffect(() => {
    if (editFolder) {
      setText(editFolder.label);
    }
  }, [editFolder]);

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={closeModal}
          contentContainerStyle={containerStyle}>
          <Text variant="titleLarge" style={styles.modal}>
            {editFolder ? 'Редактировать' : 'Создать'}
          </Text>
          <TextInput
            label="Название"
            placeholder="Введите название папки"
            mode="outlined"
            value={text}
            onChangeText={val => setText(val)}
          />
          <View style={styles.footer}>
            <IconButton
              icon="close"
              iconColor={colors.whiteColor}
              style={[styles.button, {backgroundColor: colors.error}]}
              mode="contained"
              onPress={() => closeModal()}
            />
            <IconButton
              iconColor={colors.whiteColor}
              style={[styles.button, {backgroundColor: colors.success}]}
              icon="check"
              mode="contained"
              onPress={() => save()}
            />
          </View>
        </Modal>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    maxWidth: '40%',
    marginLeft: 20,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
});
