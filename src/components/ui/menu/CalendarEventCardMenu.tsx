import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton, Icon, Menu, Text} from 'react-native-paper';
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

  const getEditIcon = useCallback(
    () => <Icon source="pencil-outline" size={22} color={colors.text} />,
    [colors.text],
  );

  const getDeleteIcon = useCallback(
    () => <Icon source="delete-outline" size={22} color={colors.text} />,
    [colors.text],
  );

  const getEditTitle = useCallback(
    () => <Text style={{color: colors.text}}>{t('common.edit')}</Text>,
    [colors.text, t],
  );

  const getDeleteTitle = useCallback(
    () => <Text style={{color: colors.text}}>{t('common.delete')}</Text>,
    [colors.text, t],
  );
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
          leadingIcon={getEditIcon}
          onPress={handleEdit}
          title={getEditTitle()}
          titleStyle={styles.titleStyle}
        />
        <Menu.Item
          leadingIcon={getDeleteIcon}
          onPress={handleDelete}
          title={getDeleteTitle()}
          titleStyle={styles.titleStyle}
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
  titleStyle: {
    lineHeight: 18,
  },
});
