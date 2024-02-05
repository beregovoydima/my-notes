/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {FabButton} from '@/components/ui/FabButton';
import {StyleSheet, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {useTheme} from '@/assets/config/colors';
import {NotesSegmentedButtons} from '@/components/ui/buttons/NotesSegmentedButtons';
import {NotesListItem, NotesPageType, NotesSortType} from '@/core/interfaces';
import {NotesItem} from '@/components/notes/NotesItem';
import {FoldersItem} from '@/components/notes/FoldersItem';
import {notesService} from '@/core/services';
import {useSelector} from 'react-redux';
import {ListItem} from '@/components/notes/ListItem';
import {SortedNotesMenu} from '@/components/ui/menu/SortedNotesMenu';
import {ListModal} from '@/components/modals/notes/ListModal';

export function NotesPage({route}: {route: any}) {
  const [isFolderModalVisible, setVisibleFolderModal] = useState(false);
  const [fabVisible] = useState(true);
  const [isListModalVisible, setIsListModalVisible] = useState(false);
  const [page, setValue] = useState<NotesPageType>('notes');
  const [sortedType, setSortedType] = useState<NotesSortType>('created');
  const [editListData, setEditListData] = useState<NotesListItem | null>(null);
  const notes = useSelector(() => notesService.storeGetCollectionNote());

  const showFolderModal = () => {
    setValue('folders');
    setVisibleFolderModal(true);
  };

  const showListModal = () => {
    setValue('list');
    setIsListModalVisible(true);
  };

  const hideModal = () => setVisibleFolderModal(false);

  const {colors} = useTheme();

  const changeValue = (val: string) => {
    if (val === 'folders' || val === 'notes' || val === 'list') {
      setValue(val);
    }
  };

  const setNotesCollection = async () => {
    const notesCollection = await notesService.storageGetCollectionNote();
    if (notesCollection) {
      notesService.storeSetNotes(notesCollection);
    }

    const response = await notesService.storageGetFoldersCollection();
    if (response) {
      notesService.storeSetFolders(response);
    }
  };

  const hideListModal = () => {
    setIsListModalVisible(false);
    setEditListData(null);
  };

  const editList = (list: NotesListItem) => {
    setEditListData(list);
    setIsListModalVisible(true);
  };

  const getAllList = async () => {
    const response = await notesService.storageGetListCollection();

    if (response) {
      notesService.storeSetListCollection(response);
    }
  };

  useEffect(() => {
    setNotesCollection();
    getAllList();
  }, []);

  return (
    <View style={styles.page}>
      <Appbar.Header style={{backgroundColor: colors.background}}>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title={route.name} />
        <Appbar.Action
          icon={() => (
            <SortedNotesMenu sortType={sortedType} changeSort={setSortedType} />
          )}
          onPress={() => {}}
        />
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        {isListModalVisible ? (
          <ListModal
            editListData={editListData}
            hideModal={() => hideListModal()}
            visible={isListModalVisible}
          />
        ) : null}

        <NotesSegmentedButtons page={page} changePageType={changeValue} />
        <View style={styles.list}>
          {page === 'notes' ? (
            <NotesItem notes={notes} sortedType={sortedType} />
          ) : page === 'list' ? (
            <ListItem sortedType={sortedType} editList={editList} />
          ) : (
            <FoldersItem
              isModalVisible={isFolderModalVisible}
              hideModal={hideModal}
              setVisibleFolderModal={showFolderModal}
            />
          )}
        </View>
      </View>
      <FabButton
        showFolderModal={showFolderModal}
        fabVisible={fabVisible}
        showListModal={showListModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flex: 1,
  },
  container: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
  },
  list: {
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 50,
  },
});
