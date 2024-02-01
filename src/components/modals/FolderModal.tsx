import {NotesFolderItem} from '@/core/interfaces';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Modal, Portal, Text, TextInput, Button} from 'react-native-paper';

interface Props {
  visible: boolean;
  hideModal: () => void;
  saveFolder: (val: string, id?: number) => void;
  editFolderData: NotesFolderItem | null;
}

export const FolderModal = ({
  visible,
  hideModal,
  saveFolder,
  editFolderData,
}: Props) => {
  const [text, setText] = useState('');

  const closeModal = () => {
    setText('');
    hideModal();
  };

  const save = () => {
    if (editFolderData) {
      saveFolder(text.trim(), editFolderData.id);
    } else {
      saveFolder(text.trim());
    }
    setText('');
    hideModal();
  };

  useEffect(() => {
    if (editFolderData) {
      setText(editFolderData.label);
    }
  }, [editFolderData]);

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={closeModal}
          contentContainerStyle={styles.containerStyle}>
          <Text variant="titleLarge" style={styles.modal}>
            {editFolderData ? 'Редактировать' : 'Создать'}
          </Text>
          <TextInput
            label="Название"
            placeholder="Введите название папки"
            mode="outlined"
            value={text}
            onChangeText={val => setText(val)}
          />
          <View style={styles.footer}>
            <Button style={[styles.button]} onPress={() => closeModal()}>
              Отмена
            </Button>
            <Button style={[styles.button]} onPress={() => save()}>
              Сохранить
            </Button>
          </View>
        </Modal>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  modal: {
    borderRadius: 8,
    marginTop: 0,
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
    marginTop: 40,
  },
});
