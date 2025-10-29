import {NotesFolderItem} from '@/core/interfaces';
import React, {useEffect, useState} from 'react';
import {Dialog, Portal, TextInput, Button} from 'react-native-paper';
import {useTranslation} from '@/core/i18n';
import {useTheme} from '@/assets/config/colors';

interface Props {
  visible: boolean;
  hideModal: () => void;
  saveFolder: (val: string, id?: string) => void;
  editFolderData: NotesFolderItem | null;
}

const MAX_FOLDER_NAME_LENGTH = 28;

export const FolderModal = ({
  visible,
  hideModal,
  saveFolder,
  editFolderData,
}: Props) => {
  const {t} = useTranslation();
  const [text, setText] = useState('');
  const {colors} = useTheme();
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
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={closeModal}
        style={{backgroundColor: colors.dialogBackgroundColor}}>
        <Dialog.Title>
          {editFolderData ? t('common.edit') : t('common.create')}
        </Dialog.Title>
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
