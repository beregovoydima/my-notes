import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {NotesListItem} from '@/core/interfaces';
import {ListCard} from './card/ListCard';
import {ListModal} from '../modals/list/ListModal';
import {useSelector} from 'react-redux';
import {notesService} from '@/core/services';
import moment from 'moment';

interface Props {
  listModalVisible: boolean;
  hideListModal: () => void;
  openListModal: () => void;
}

export const ListItem = ({
  listModalVisible,
  hideListModal,
  openListModal,
}: Props) => {
  const allList = useSelector(() => notesService.storeGetListCollection());
  const [editListData, setEditListData] = useState<NotesListItem | null>(null);

  const changeList = async (val: NotesListItem) => {
    notesService.storeSetListCollection([
      ...allList.map(el =>
        el.id === val.id ? {...val, updated: moment().format()} : el,
      ),
    ]);
    await notesService.storageSetLists(notesService.storeGetListCollection());
  };

  const getAllList = async () => {
    const response = await notesService.storageGetListCollection();

    if (response) {
      notesService.storeSetListCollection(response);
    }
  };

  const deleteList = async (id: number) => {
    const filterListCollection = [
      ...notesService.storeGetListCollection(),
    ].filter(el => el.id !== id);

    await notesService.storageSetLists(filterListCollection);
    notesService.storeSetListCollection(filterListCollection);
  };

  const editList = (list: NotesListItem) => {
    setEditListData(list);
    openListModal();
  };

  const hideModal = () => {
    hideListModal();
    setEditListData(null);
  };

  useEffect(() => {
    getAllList();
  }, []);

  const renderItem = ({item}: {item: NotesListItem}) => {
    return (
      <View style={styles.container}>
        <ListCard
          list={item}
          changeList={val => changeList(val)}
          deleteList={deleteList}
          editList={editList}
        />
      </View>
    );
  };

  return (
    <>
      <>
        {listModalVisible ? (
          <ListModal
            editListData={editListData}
            hideModal={() => hideModal()}
            visible={listModalVisible}
          />
        ) : (
          <></>
        )}
      </>

      <FlatList
        data={allList}
        keyExtractor={el => el.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<></>}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
});
