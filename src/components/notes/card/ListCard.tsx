import {useTheme} from '@/assets/config/colors';
import {ListMenu} from '@/components/ui/menu/ListMenu';
import {NotesListItem, NotesListItemChildren} from '@/core/interfaces';
import React, {useMemo, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Avatar, Card, Icon, Text} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import {ListCardItemCildren} from '../list/ListCardItemChildren';

interface Props {
  list: NotesListItem;
  changeList: (list: NotesListItem) => void;
  deleteList: (id: number) => void;
  editList: (list: NotesListItem) => void;
}

export const ListCard = ({list, changeList, deleteList, editList}: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const {colors} = useTheme();

  const getMoreIcon = (el: NotesListItem) => {
    return (
      <View style={styles.buttons}>
        <MaterialIcons
          name={isExpanded ? 'expand-less' : 'expand-more'}
          color={colors.greyColor}
          size={26}
          onPress={() => setIsExpanded(!isExpanded)}
          style={{}}
        />
        <ListMenu
          editList={() => editList(list)}
          deleteList={id => deleteList(id)}
          listId={el.id}
        />
      </View>
    );
  };

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

  const getLeftIcon = (props: any) => {
    return <Avatar.Icon {...props} icon="clipboard-list" />;
  };

  const renderItem = ({item}: {item: NotesListItemChildren}) => {
    return (
      <ListCardItemCildren
        key={item.id}
        listChild={item}
        saveChildList={saveChildList}
      />
    );
  };
  const isChecked = useMemo(() => {
    return !!list.items.length && list.items.every(el => el.isChecked);
  }, [list]);

  return (
    <View>
      <Card style={[{backgroundColor: colors.whiteColor}]}>
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
            {list.updated ? (
              <Icon
                source="circle-edit-outline"
                size={12}
                color={colors.greyColor}
              />
            ) : (
              <></>
            )}
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
          {isExpanded ? (
            <FlatList
              data={list.items}
              keyExtractor={el => el.id.toString()}
              renderItem={renderItem}
              ListEmptyComponent={<></>}
            />
          ) : (
            <></>
          )}
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
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
    alignItems: 'center',
  },
});
