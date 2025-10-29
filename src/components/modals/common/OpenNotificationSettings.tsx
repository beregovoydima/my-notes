/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Portal, Text, Dialog, Button} from 'react-native-paper';
import {useTheme} from '@/assets/config/colors';
import {useTranslation} from '@/core/i18n';
import {StyleSheet} from 'react-native';

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
  const {colors} = useTheme();
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={cancel}
        style={[
          styles.dialog,
          {
            backgroundColor: colors.dialogBackgroundColor,
            borderColor: colors.background,
          },
        ]}>
        {/* <Dialog.Icon icon="information-outline" size={30} /> */}
        <Dialog.Content style={{marginTop: 30}}>
          <Text variant="titleSmall">
            {content ? content : t('notifications.permissionRequired')}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button textColor={colors.accent} onPress={cancel}>
            {t('common.cancel')}
          </Button>
          <Button textColor={colors.accent} onPress={apply}>
            {t('common.goTo')}
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
