import React, {useCallback} from 'react';
import {Menu, Text} from 'react-native-paper';
import {useTheme} from '@/assets/config/colors';
import {useTranslation} from '@/core/i18n';
import {StyleSheet, View} from 'react-native';
import {IconButton, Icon} from 'react-native-paper';
import {memo, useState} from 'react';

interface Props {
  deleteNote: () => void;
}

export const NotesEditMenu = memo(({deleteNote}: Props) => {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const getDeleteIcon = useCallback(
    () => <Icon source="delete-outline" size={22} color={colors.text} />,
    [colors.text],
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
            size={24}
            icon="dots-vertical"
            iconColor={colors.greyIconColor}
            onPress={openMenu}
          />
        }>
        <Menu.Item
          leadingIcon={getDeleteIcon}
          onPress={() => {
            deleteNote();
          }}
          title={getDeleteTitle()}
          titleStyle={styles.titleStyle}
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
  menuPadding: {
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  titleStyle: {
    lineHeight: 18,
  },
});
