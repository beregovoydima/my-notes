import {notesService} from '@/core/services';
import {getUuid} from '@/core/utils';
import moment from 'moment';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Modal, Portal, Text, TextInput, Button} from 'react-native-paper';
import {useTranslation} from '@/core/i18n';

interface Props {
  visible: boolean;
  hideModal: () => void;
}

const MAX_FOLDER_NAME_LENGTH = 28;

export const AddFolderModal = ({visible, hideModal}: Props) => {
  const {t} = useTranslation();
  const [text, setText] = useState('');

  const closeModal = () => {
    setText('');
    hideModal();
  };

  const save = () => {
    notesService.storeSetFolder({
      id: getUuid(),
      label: text.trim(),
      name: text.trim(),
      isDeletable: true,
      created: moment().format(),
      updated: null,
    });

    const response = notesService.storeGetFoldersCollection();
    notesService.storageSetFolders(response);

    setText('');
    hideModal();
  };

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={closeModal}
          contentContainerStyle={styles.containerStyle}>
          <Text variant="titleLarge" style={styles.modal}>
            {t('common.create')}
          </Text>
          <TextInput
            label={t('common.name')}
            placeholder={t('folders.enterFolderName')}
            mode="outlined"
            value={text}
            onChangeText={val => setText(val)}
            maxLength={MAX_FOLDER_NAME_LENGTH}
            right={
              <TextInput.Affix
                text={`${text.length}/${MAX_FOLDER_NAME_LENGTH}`}
              />
            }
          />
          <View style={styles.footer}>
            <Button style={[styles.button]} onPress={() => closeModal()}>
              {t('common.cancel')}
            </Button>
            <Button style={[styles.button]} onPress={() => save()}>
              {t('common.save')}
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
