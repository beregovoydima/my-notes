/* eslint-disable react-native/no-inline-styles */
import {useTheme} from '@/assets/config/colors';
import {EditableText} from '@/components/ui/list/EditableText';
import {NotesListItem, NotesListItemChildren} from '@/core/interfaces';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Divider} from 'react-native-paper';
import moment from 'moment';
import {ListModalItemCildren} from './ListModalItemChildren';
import uuid from 'react-native-uuid';

interface Props {
  list: NotesListItem;
  changeList: (list: NotesListItem) => void;
}

export const ListModalItem = ({list, changeList}: Props) => {
  const {colors} = useTheme();

  const saveTitleText = (text: string) => {
    const listItem = {...list, title: text, updated: moment().format()};
    changeList(listItem);
  };

  const addList = () => {
    const listItem: NotesListItem = {
      ...list,
      items: [
        ...list.items,
        {id: uuid.v4().toString(), isChecked: false, text: '', children: []},
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
      <View style={styles.content}>
        <EditableText
          style={{fontSize: 20, fontWeight: '500'}}
          label={list.title}
          isChecked={
            !!list.items.length && list.items.every(el => el.isChecked)
          }
          saveText={val => saveTitleText(val)}
        />
      </View>

      <Divider />
      {list.items.map(child => {
        return (
          <ListModalItemCildren
            key={child.id}
            listChild={child}
            saveChildList={saveChildList}
            deleteListItem={deleteListItem}
          />
        );
      })}
      <Divider />
      <Button icon="plus" onPress={() => addList()}>
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
