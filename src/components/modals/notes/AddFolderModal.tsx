import {notesService} from '@/core/services';
import {getUuid} from '@/core/utils';
import moment from 'moment';
import React, {useState} from 'react';
import {Dialog, Portal, TextInput, Button} from 'react-native-paper';
import {useTheme} from '@/assets/config/colors';
import {useTranslation} from '@/core/i18n';
import {StyleSheet} from 'react-native';

interface Props {
  visible: boolean;
  hideModal: () => void;
}

const MAX_FOLDER_NAME_LENGTH = 28;

export const AddFolderModal = ({visible, hideModal}: Props) => {
  const {t} = useTranslation();
  const [text, setText] = useState('');
  const {colors} = useTheme();
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
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={closeModal}
        style={[
          styles.dialog,
          {
            backgroundColor: colors.dialogBackgroundColor,
            borderColor: colors.background,
          },
        ]}>
        <Dialog.Title>{t('common.create')}</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label={t('common.name')}
            placeholder={t('folders.enterFolderName')}
            mode="outlined"
            value={text}
            onChangeText={val => setText(val)}
            maxLength={MAX_FOLDER_NAME_LENGTH}
            autoFocus
            activeOutlineColor={colors.accent}
            right={
              <TextInput.Affix
                text={`${text.length}/${MAX_FOLDER_NAME_LENGTH}`}
              />
            }
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button textColor={colors.accent} onPress={() => closeModal()}>
            {t('common.cancel')}
          </Button>
          <Button textColor={colors.accent} onPress={() => save()}>
            {t('common.save')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    borderWidth: 0.5,
  },
});
