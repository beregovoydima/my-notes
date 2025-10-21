import React from 'react';
import {Portal, Text, Dialog, Button} from 'react-native-paper';
import {useTranslation} from '@/core/i18n';

export const AcceptDialog = ({
  visible,
  cancel,
  apply,
  exitWithoutSaving,
  content,
}: {
  visible: boolean;
  cancel: () => void;
  apply: () => void;
  exitWithoutSaving?: () => void;
  content?: string;
}) => {
  const {t} = useTranslation();

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={cancel}>
        <Dialog.Content>
          <Text variant="titleSmall">
            {content ? content : t('common.cancel') + '?'}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={exitWithoutSaving}>
            {t('common.exitWithoutSaving')}
          </Button>
          <Button onPress={apply}>{t('common.save')}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
