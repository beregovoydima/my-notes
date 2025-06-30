// TabMenu.js
import {useTheme} from '@/assets/config/colors';
import {
  ExtendedScreenNavigationProp,
  MenuTab,
  PagesType,
} from '@/core/interfaces';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import {useTranslation} from '@/core/i18n';

interface Props {
  activePage: PagesType;
  changeActivePage: (page: PagesType) => void;
}

export const TabMenu = ({changeActivePage, activePage}: Props) => {
  const {t} = useTranslation();
  const [item] = useState<MenuTab[]>([
    {label: t('navigation.notes'), icon: 'note', name: 'Notes'},
    {label: t('navigation.calendar'), icon: 'calendar', name: 'Calendar'},
    {label: t('navigation.tasks'), icon: 'notebook', name: 'Tasks'},
    {label: t('navigation.search'), icon: 'magnifier', name: 'Search'},
    {label: t('navigation.more'), icon: 'menu', name: 'More'},
  ]);
  const {colors} = useTheme();

  const navigation: ExtendedScreenNavigationProp = useNavigation();

  const changePage = (page: PagesType) => {
    changeActivePage(page);
    navigation.navigate(page);
  };

  return (
    <View
      style={[
        styles.tabBar,
        {
          backgroundColor: colors.whiteColor,
          borderTopColor: colors.lineGreyColor,
        },
      ]}>
      {item.map(el => {
        return (
          <View key={el.icon} style={styles.item}>
            <SimpleIcon
              name={el.icon}
              color={activePage === el.name ? colors.primary : colors.greyColor}
              size={20}
              onPress={() => changePage(el.name)}
            />
            <Text
              style={[
                {
                  color:
                    activePage === el.name ? colors.primary : colors.greyColor,
                },
                styles.text,
              ]}>
              {el.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    display: 'flex',
    flexDirection: 'row',
    height: 55,
    borderTopWidth: 1,
    width: '100%',
    justifyContent: 'space-around',
    paddingTop: 6,
  },
  item: {
    display: 'flex',
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 13,
  },
});
