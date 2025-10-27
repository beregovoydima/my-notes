import React, {memo, useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton, Icon, Menu, Text} from 'react-native-paper';
import {useTranslation} from '@/core/i18n';
import {useTheme} from '@/assets/config/colors';

interface Props {
  deleteList: () => void;
  saveList: () => void;
}

export const ListEditMenu = memo(({deleteList}: Props) => {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  // const getSaveIcon = useCallback(
  //   () => <Icon source="check" size={22} color={colors.text} />,
  //   [colors.text],
  // );

  const getDeleteIcon = useCallback(
    () => <Icon source="delete" size={22} color={colors.text} />,
    [colors.text],
  );

  // const getSaveTitle = useCallback(
  //   () => <Text style={{color: colors.text}}>{t('common.save')}</Text>,
  //   [colors.text, t],
  // );

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
        {/* <Menu.Item
          onPress={() => {
            saveList();
          }}
          title={getSaveTitle()}
          leadingIcon={getSaveIcon}
          titleStyle={styles.titleStyle}
        /> */}
        <Menu.Item
          onPress={() => {
            deleteList();
          }}
          title={getDeleteTitle()}
          leadingIcon={getDeleteIcon}
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
