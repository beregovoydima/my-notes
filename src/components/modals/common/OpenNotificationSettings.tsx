/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Portal, Text, Dialog, Button} from 'react-native-paper';
import {useTranslation} from '@/core/i18n';

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
  const {t} = useTranslation();

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={cancel}>
        {/* <Dialog.Icon icon="information-outline" size={30} /> */}
        <Dialog.Content style={{marginTop: 30}}>
          <Text variant="titleSmall">
            {content ? content : t('notifications.permissionRequired')}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={cancel}>{t('common.cancel')}</Button>
          <Button onPress={apply}>{t('common.goTo')}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
