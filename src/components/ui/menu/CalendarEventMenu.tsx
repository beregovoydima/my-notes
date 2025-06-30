import React, {memo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider, IconButton, Menu} from 'react-native-paper';
import {useTheme} from '@/assets/config/colors';
import {useTranslation} from '@/core/i18n';

interface Props {
  deleteEvent: () => void;
  saveEvent: () => void;
}

export const CalendarEventEditMenu = memo(({deleteEvent, saveEvent}: Props) => {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        contentStyle={[{backgroundColor: colors.whiteColor}, styles.content]}
        anchor={
          <IconButton
            size={24}
            icon="dots-vertical"
            iconColor={colors.greyIconColor}
            onPress={openMenu}
          />
        }>
        <Menu.Item
          onPress={() => {
            saveEvent();
          }}
          title={t('common.save')}
        />
        <Divider />
        <Menu.Item
          onPress={() => {
            deleteEvent();
          }}
          title={t('common.delete')}
        />
      </Menu>
    </View>
  );
});

const styles = StyleSheet.create({
  content: {
    top: 16,
    right: 16,
  },
});
