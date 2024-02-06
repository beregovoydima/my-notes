/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {FabButton} from '@/components/ui/FabButton';
import {StyleSheet, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {useTheme} from '@/assets/config/colors';
import {NotesSegmentedButtons} from '@/components/ui/buttons/NotesSegmentedButtons';
import {NotesPageType, NotesSortType} from '@/core/interfaces';
import {NotesItem} from '@/components/notes/NotesItem';
import {FoldersItem} from '@/components/notes/FoldersItem';
import {notesService} from '@/core/services';
import {useSelector} from 'react-redux';
import {ListItem} from '@/components/notes/ListItem';
import {SortedNotesMenu} from '@/components/ui/menu/SortedNotesMenu';

export function NotesPage({route}: {route: any; navigation: any}) {
  const [isFolderModalVisible, setVisibleFolderModal] = useState(false);
  const [page, setValue] = useState<NotesPageType>('notes');
  const [sortedType, setSortedType] = useState<NotesSortType>('created');
  const notes = useSelector(() => notesService.storeGetCollectionNote());

  const showFolderModal = () => {
    setValue('folders');
    setVisibleFolderModal(true);
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
        <NotesSegmentedButtons page={page} changePageType={changeValue} />
        <View style={styles.list}>
          {page === 'notes' ? (
            <NotesItem notes={notes} sortedType={sortedType} />
          ) : page === 'list' ? (
            <ListItem sortedType={sortedType} />
          ) : (
            <FoldersItem
              isModalVisible={isFolderModalVisible}
              hideModal={hideModal}
              setVisibleFolderModal={showFolderModal}
            />
          )}
        </View>
      </View>
      <FabButton showFolderModal={showFolderModal} />
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
    paddingLeft: 4,
    paddingRight: 4,
    flex: 1,
  },
  list: {
    marginTop: 8,
    marginBottom: 50,
  },
});
