/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {FabButton} from '@/components/ui/FabButton';
import {StyleSheet, View} from 'react-native';
import {Appbar, Chip} from 'react-native-paper';
import {useTheme} from '@/assets/config/colors';
import {NotesSegmentedButtons} from '@/components/ui/buttons/NotesSegmentedButtons';
import {
  NotesFolderItemKey,
  NotesPageType,
  NotesSortType,
  SortDirection,
} from '@/core/interfaces';
import {NotesItem} from '@/components/notes/NotesItem';
import {FoldersItem} from '@/components/notes/FoldersItem';
import {notesService} from '@/core/services';
import {ListItem} from '@/components/notes/ListItem';
import {SortedNotesMenu} from '@/components/ui/menu/SortedNotesMenu';
import {AllNotesItem} from '@/components/notes/AllNotesItem';
import {SortedTypeNotesMenu} from '@/components/ui/menu/SortedTypeNotesMenu';

export function NotesPage({}: {route: any; navigation: any}) {
  const [isFolderModalVisible, setVisibleFolderModal] = useState(false);
  const [page, setPage] = useState<NotesPageType>('notes');
  const [sortedType, setSortedType] = useState<NotesSortType>('created');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [filterFolder, setFilterFolder] = useState<NotesFolderItemKey | null>(
    null,
  );

  const showFolderModal = () => {
    setPage('folders');
    setVisibleFolderModal(true);
  };

  const hideModal = () => setVisibleFolderModal(false);

  const {colors} = useTheme();

  const changeValue = (val: string) => {
    if (
      val === 'folders' ||
      val === 'notes' ||
      val === 'list' ||
      val === 'all'
    ) {
      setPage(val);
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

  const setFilterFolderItem = (val: NotesFolderItemKey) => {
    setFilterFolder(val);
    setPage('all');
  };

  useEffect(() => {
    setNotesCollection();
    getAllList();
  }, []);

  return (
    <View style={styles.page}>
      <Appbar.Header
        style={[styles.header, {backgroundColor: colors.background}]}>
        {filterFolder ? (
          <Chip icon="folder" onPress={() => setFilterFolder(null)}>
            {filterFolder.name}
          </Chip>
        ) : null}
        <Appbar.Action
          icon={() => (
            <SortedTypeNotesMenu
              sortDirection={sortDirection}
              changeSort={setSortDirection}
            />
          )}
          onPress={() => {}}
        />
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
            <NotesItem sortedType={sortedType} sortDirection={sortDirection} />
          ) : page === 'list' ? (
            <ListItem sortedType={sortedType} sortDirection={sortDirection} />
          ) : page === 'all' ? (
            <AllNotesItem
              sortedType={sortedType}
              sortDirection={sortDirection}
              filterFolder={filterFolder}
            />
          ) : (
            <FoldersItem
              isModalVisible={isFolderModalVisible}
              hideModal={hideModal}
              setVisibleFolderModal={showFolderModal}
              setFilterFolder={setFilterFolderItem}
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
  header: {
    height: 50,
    justifyContent: 'flex-end',
  },
  container: {
    paddingTop: 4,
    paddingLeft: 4,
    paddingRight: 4,
    flex: 1,
  },
  list: {
    flex: 1,
    marginTop: 4,
    marginBottom: 4,
  },
});
