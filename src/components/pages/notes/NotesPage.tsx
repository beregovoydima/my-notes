import React, {useEffect, useMemo, useRef, useState} from 'react';
import {FabButton} from '@/components/ui/FabButton';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Appbar} from 'react-native-paper';
import {useTheme} from '@/assets/config/colors';
import {NotesSegmentedButtons} from '@/components/ui/buttons/NotesSegmentedButtons';
import {NotesPageType} from '@/core/interfaces';
import {NotesItem} from '@/components/notes/NotesItem';
import {FoldersItem} from '@/components/notes/FoldersItem';
import {notesService} from '@/core/services';
import {useSelector} from 'react-redux';
import {cloneDeep} from 'lodash-es';
import moment from 'moment';
import {ListItem} from '@/components/notes/ListItem';

export function NotesPage({route}: {route: any}) {
  const [isFolderModalVisible, setVisibleFolderModal] = useState(false);
  const [isListModalVisible, setIsListModalVisible] = useState(false);
  const [page, setValue] = useState<NotesPageType>('notes');
  const notes = useSelector(() => notesService.storeGetCollectionNote());

  const scrollViewRef = useRef<ScrollView | null>(null);

  const handleScrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true});
    }
  };

  const showFolderModal = () => {
    setValue('folders');
    setVisibleFolderModal(true);
  };

  const showListModal = () => {
    setValue('list');
    setIsListModalVisible(true);
  };

  const hideListModal = () => setIsListModalVisible(false);

  const hideModal = () => setVisibleFolderModal(false);

  const {colors} = useTheme();

  const changeValue = (val: string) => {
    if (val === 'folders' || val === 'notes' || val === 'list') {
      setValue(val);
      handleScrollToTop();
    }
  };

  const sortedNotes = useMemo(() => {
    const cloneNotes = cloneDeep(notes);
    return cloneNotes.sort((a, b) =>
      moment(b.updated ? b.updated : b.created) >
      moment(a.updated ? a.updated : a.created)
        ? 1
        : -1,
    );
  }, [notes]);

  const setNotesCollection = async () => {
    const notesCollection = await notesService.storageGetCollectionNote();
    if (notesCollection) {
      notesService.storeSetNotes([...notesCollection]);
    }
  };

  const setFolders = async () => {
    const response = await notesService.storageGetFoldersCollection();
    if (response) {
      notesService.storeSetFolders(response);
    }
  };

  useEffect(() => {
    setNotesCollection();
    setFolders();
  }, []);

  const renderPage = useMemo(() => {
    if (page === 'folders') {
      return (
        <FoldersItem
          isModalVisible={isFolderModalVisible}
          hideModal={hideModal}
          setVisibleFolderModal={showFolderModal}
        />
      );
    }
    if (page === 'notes') {
      return <NotesItem notes={sortedNotes} />;
    }
    if (page === 'list') {
      return (
        <ListItem
          listModalVisible={isListModalVisible}
          hideListModal={hideListModal}
          openListModal={showListModal}
        />
      );
    }
    return <></>;
  }, [isFolderModalVisible, page, sortedNotes, isListModalVisible]);

  const [fabVisible] = useState(true);

  return (
    <View style={styles.page}>
      <Appbar.Header style={{backgroundColor: colors.background}}>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title={route.name} />
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <NotesSegmentedButtons page={page} changePageType={changeValue} />
        <ScrollView ref={scrollViewRef} style={styles.list}>
          {renderPage}
        </ScrollView>
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
  },
});
