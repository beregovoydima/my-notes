/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Portal, Text, Dialog, Button} from 'react-native-paper';

export const OpenNotificationSettings = ({
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
        {/* <Dialog.Icon icon="information-outline" size={30} /> */}
        <Dialog.Content style={{marginTop: 30}}>
          <Text variant="titleSmall">
            {content
              ? content
              : 'Для работы уведомлений необходимо разрешить их в настройках приложения. Перейти в настройки?'}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={cancel}>Отмена</Button>
          <Button onPress={apply}>Перейти</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
