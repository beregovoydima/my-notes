import moment from 'moment';
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {NotesListItem} from '@/core/interfaces';
import {ListCardItem} from './itemsList/ListCardItem';
import {ListModal} from '../modals/list/ListModal';

interface Props {
  listModalVisible: boolean;
  hideListModal: () => void;
}

export const ListItem = ({listModalVisible, hideListModal}: Props) => {
  const [allList, setList] = useState<NotesListItem[]>([
    {
      id: Date.now(),
      title: 'Список',
      type: 'list',
      color: '',
      folder: '',
      created: moment().format(),
      updated: null,
      items: [
        {
          id: Date.now() + 1,
          text: 'Молоко',
          isChecked: false,
          children: [],
        },
        {
          id: Date.now() + 2,
          text: 'Хлеб',
          isChecked: false,
          children: [],
        },
      ],
    },
  ]);

  const changeList = (val: NotesListItem) => {
    setList([...allList.filter(el => el.id !== val.id), {...val}]);
  };

  return (
    <>
      <ListModal
        saveList={() => {}}
        hideModal={() => hideListModal()}
        visible={listModalVisible}
      />
      {allList.map(el => {
        return (
          <View key={el.id} style={styles.container}>
            <ListCardItem list={el} changeList={val => changeList(val)} />
          </View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
});
