import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider, IconButton, Menu} from 'react-native-paper';
import {useTheme} from '@/assets/config/colors';
import {useTranslation} from '@/core/i18n';

interface CalendarEventCardMenuProps {
  eventId: string;
  editEvent: (id: string) => void;
  deleteEvent: (id: string) => void;
}

export const CalendarEventCardMenu = ({
  eventId,
  editEvent,
  deleteEvent,
}: CalendarEventCardMenuProps) => {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleEdit = () => {
    closeMenu();
    editEvent(eventId);
  };

  const handleDelete = () => {
    deleteEvent(eventId);
    closeMenu();
  };

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        contentStyle={[
          {backgroundColor: colors.whiteColor},
          styles.content,
          styles.menuPadding,
        ]}
        anchor={
          <IconButton
            style={styles.icon}
            size={24}
            icon="dots-vertical"
            iconColor={colors.greyColor}
            onPress={openMenu}
          />
        }>
        <Menu.Item
          leadingIcon="pencil-outline"
          onPress={handleEdit}
          title={t('common.edit')}
        />
        <Divider />
        <Menu.Item
          leadingIcon="delete-outline"
          onPress={handleDelete}
          title={t('common.delete')}
        />
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    top: 16,
    right: 16,
  },
  icon: {
    margin: 0,
  },
  menuPadding: {
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});
