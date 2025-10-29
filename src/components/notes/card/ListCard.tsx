import {useTheme} from '@/assets/config/colors';
import {ListMenu} from '@/components/ui/menu/ListMenu';
import {
  NotesListItem,
  NotesListItemChildren,
  ScreenNavigationProp,
} from '@/core/interfaces';
import {
  getHighlightedParts,
  handleShare,
  hex2rgba,
  parseList,
} from '@/core/utils';
import React, {memo, useCallback, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Card, Icon, Text} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import {ListCardItemCildren} from '../list/ListCardItemChildren';
import {notesService} from '@/core/services';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from '@/core/i18n';
import {useCardBackground} from '@/core/hooks';
import {useThemeMode} from '@/components/context/ThemeContext';

interface Props {
  list: NotesListItem;
  searchQuery?: string;
}

export const ListCard = memo(({list, searchQuery}: Props) => {
  const {colors} = useTheme();
  const {isDarkMode} = useThemeMode();
  const [isExpanded, setIsExpanded] = useState(false);
  const {t} = useTranslation();
  const navigation: ScreenNavigationProp = useNavigation();
  const showCardBackground = useCardBackground();

  // Получаем название папки по ID
  const getFolderName = useCallback(() => {
    if (!list.folder?.id) {
      return '';
    }

    const folders = notesService.storeGetFoldersCollection();
    const folder = folders.find(f => f.id === list.folder?.id);
    return folder?.label || '';
  }, [list.folder?.id]);

  const getLeftIcon = (props: any) => {
    return (
      <Avatar.Icon
        color={colors.whiteColor}
        style={{
          backgroundColor: list.color ? list.color : colors.primary,
        }}
        {...props}
        icon="clipboard-list"
      />
    );
  };

  const deleteList = async (id: string) => {
    const filterListCollection = [
      ...notesService.storeGetListCollection(),
    ].filter(el => el.id !== id);

    notesService.storageSetLists(filterListCollection);
    notesService.storeSetListCollection(filterListCollection);
  };

  const editList = (id: string) => {
    navigation.navigate('ListEdit', {listId: id});
  };

  const shareListFunc = () => {
    handleShare({
      title: list.title,
      message: parseList(list),
    });
  };

  const cardBackgroundColor = (color: string | undefined | null) => {
    if (isDarkMode) {
      return colors.cardBackgroundColor;
    }

    return hex2rgba(color || colors.primary, 0.08);
  };

  const getMoreIcon = (el: NotesListItem) => {
    return (
      <View style={styles.buttons}>
        {list.items.length ? (
          <MaterialIcons
            name={isExpanded ? 'expand-less' : 'expand-more'}
            color={colors.greyColor}
            size={26}
            onPress={() => setIsExpanded(!isExpanded)}
            style={{}}
          />
        ) : null}

        <ListMenu
          editList={() => editList(list.id)}
          deleteList={id => deleteList(id)}
          shareList={shareListFunc}
          listId={el.id}
        />
      </View>
    );
  };

  const changeList = (val: NotesListItem) => {
    notesService.updateStoreListItems({...val, updated: moment().format()});
    notesService.storageSetLists(notesService.storeGetListCollection());
  };

  const renderItem = useCallback(
    (item: NotesListItemChildren) => {
      const saveChildList = (val: NotesListItemChildren) => {
        const listItem: NotesListItem = {
          ...list,
          items: [
            ...list.items.map(el => {
              return el.id === val.id ? val : el;
            }),
          ],
        };
        changeList(listItem);
      };
      return (
        <ListCardItemCildren
          color={list.color ? list.color : undefined}
          key={item.id}
          listChild={item}
          saveChildList={saveChildList}
        />
      );
    },
    [list],
  );
  const isChecked = useMemo(() => {
    return !!list.items.length && list.items.every(el => el.isChecked);
  }, [list]);

  return (
    <View style={[styles.container]}>
      <Card onPress={() => editList(list.id)}>
        <Card.Title
          style={[
            showCardBackground && {
              backgroundColor: cardBackgroundColor(list.color),
              borderBottomColor: cardBackgroundColor(list.color),
            },
            !showCardBackground && {
              backgroundColor: colors.cardBackgroundColor,
              borderBottomColor: colors.cardBackgroundColor,
            },
            styles.topBorder,
          ]}
          title={
            searchQuery ? (
              <Text>
                {getHighlightedParts(list.title, searchQuery).map(
                  (part, index) => (
                    <Text
                      key={index}
                      style={
                        part.highlight
                          ? {backgroundColor: colors.selectedTextColor}
                          : {}
                      }>
                      {part.text}
                    </Text>
                  ),
                )}
              </Text>
            ) : (
              list.title || t('lists.noTitle')
            )
          }
          titleStyle={[
            isChecked && styles.checkedText,
            {color: isChecked ? colors.greyColor : colors.text},
          ]}
          left={getLeftIcon}
          right={() => getMoreIcon(list)}
        />
        <Card.Content
          style={[
            showCardBackground && {
              backgroundColor: cardBackgroundColor(list.color),
            },
            !showCardBackground && {
              backgroundColor: colors.cardBackgroundColor,
              borderTopColor: colors.cardBackgroundColor,
            },
            styles.bottomBorder,
          ]}>
          <View style={styles.footer}>
            <View style={styles.footer}>
              {list.updated ? (
                <Icon
                  source="circle-edit-outline"
                  size={12}
                  color={colors.greyColor}
                />
              ) : null}
              <Text
                variant="labelSmall"
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  color: colors.greyColor,
                  marginLeft: list.updated ? 4 : 0,
                }}>
                {moment(list.updated ? list.updated : list.created).format(
                  'YYYY-MM-DD HH:mm',
                )}
              </Text>
            </View>

            <View style={styles.footer}>
              {getFolderName() ? (
                <Icon
                  source="folder-outline"
                  size={12}
                  color={colors.greyColor}
                />
              ) : null}
              <Text
                variant="labelSmall"
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  color: colors.greyColor,
                  marginLeft: getFolderName() ? 4 : 0,
                }}>
                {getFolderName()}
              </Text>
            </View>
          </View>
          {isExpanded
            ? list.items.map(el => {
                return renderItem(el);
              })
            : null}
        </Card.Content>
      </Card>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedText: {
    textDecorationLine: 'line-through',
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topBorder: {
    borderTopEndRadius: 12,
    borderTopLeftRadius: 12,
  },
  bottomBorder: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
});
