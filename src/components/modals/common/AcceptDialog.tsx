import React from 'react';
import {Portal, Text, Dialog, Button} from 'react-native-paper';

export const AcceptDialog = ({
  visible,
  cancel,
  apply,
  content,
}: {
  visible: boolean;
  cancel: () => void;
  apply: () => void;
  content?: string;
}) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={cancel}>
        <Dialog.Content>
          <Text variant="titleSmall">{content ? content : 'Отменить?'}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={apply}>Выйти</Button>
          <Button onPress={cancel}>Продолжить</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
