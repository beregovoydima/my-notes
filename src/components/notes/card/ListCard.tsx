import {useTheme} from '@/assets/config/colors';
import {ListMenu} from '@/components/ui/menu/ListMenu';
import {
  NotesListItem,
  NotesListItemChildren,
  ScreenNavigationProp,
} from '@/core/interfaces';
import React, {memo, useCallback, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Card, Icon, Text} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import {ListCardItemCildren} from '../list/ListCardItemChildren';
import {notesService} from '@/core/services';
import {useNavigation} from '@react-navigation/native';
interface Props {
  list: NotesListItem;
}

export const ListCard = memo(({list}: Props) => {
  const {colors} = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const navigation: ScreenNavigationProp = useNavigation();

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
    <View style={styles.container}>
      <Card
        style={[{backgroundColor: colors.whiteColor}]}
        onPress={() => editList(list.id)}>
        <Card.Title
          title={list.title}
          titleStyle={[
            isChecked && styles.checkedText,
            {color: isChecked ? colors.greyColor : colors.text},
          ]}
          left={getLeftIcon}
          right={() => getMoreIcon(list)}
        />
        <Card.Content>
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

            <Text
              variant="labelSmall"
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                color: colors.greyColor,
                marginLeft: list.updated ? 4 : 0,
              }}>
              {list.folder?.name}
            </Text>
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
});
