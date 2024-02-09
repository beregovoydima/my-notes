/* eslint-disable react-native/no-inline-styles */
import {useTheme} from '@/assets/config/colors';
import {NotesListItem, NotesListItemChildren} from '@/core/interfaces';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Divider} from 'react-native-paper';
import {ListModalItemCildren} from './ListModalItemChildren';
import {getUuid} from '@/core/utils';

interface Props {
  list: NotesListItem;
  changeList: (list: NotesListItem) => void;
}

export const ListModalItem = ({list, changeList}: Props) => {
  const {colors} = useTheme();

  const addList = () => {
    const listItem: NotesListItem = {
      ...list,
      items: [
        ...list.items,
        {id: getUuid(), isChecked: false, text: '', children: []},
      ],
    };
    changeList(listItem);
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

  const deleteListItem = (val: NotesListItemChildren) => {
    const listItem: NotesListItem = {
      ...list,
      items: list.items.filter(el => el !== val),
    };
    changeList(listItem);
  };

  return (
    <View style={[styles.card, {backgroundColor: colors.whiteColor}]}>
      <Divider />
      {list.items.map((child, i) => {
        return (
          <ListModalItemCildren
            key={child.id}
            listChild={child}
            lastItem={i === list.items.length - 1}
            color={list.color ? list.color : undefined}
            saveChildList={saveChildList}
            deleteListItem={deleteListItem}
            addList={addList}
          />
        );
      })}
      <Divider />
      <Button
        style={{margin: 10}}
        textColor={list.color ? list.color : colors.primary}
        icon="plus"
        onPress={() => addList()}>
        Добавить
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 4,
  },
  card: {
    borderRadius: 4,
  },
  content: {
    display: 'flex',
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
  },
  childContent: {
    display: 'flex',
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    marginLeft: 30,
  },
  textContainer: {
    marginLeft: 8,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    margin: 0,
  },
});
