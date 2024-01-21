import React, {useEffect, useState} from 'react';
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

export function NotesPage({route}: {route: any}) {
  const [isFolderModalVisible, setVisibleFolderModal] = useState(false);
  const [page, setValue] = useState<NotesPageType>('notes');
  const notes = useSelector(() => notesService.getCollectionNote());

  const showFolderModal = () => setVisibleFolderModal(true);
  const hideModal = () => setVisibleFolderModal(false);

  const {colors} = useTheme();

  const changeValue = (val: string) => {
    if (val === 'folders' || val === 'notes' || val === 'list') {
      setValue(val);
    }
  };

  const setNotesCollection = async () => {
    const notesCollection = await notesService.getCollectionNoteFromStorage();
    if (notesCollection) {
      notesService.setNotesInStore([...notesCollection]);
    }
  };

  useEffect(() => {
    setNotesCollection();
  }, []);

  const [fabVisible] = useState(true);

  return (
    <View style={styles.page}>
      <Appbar.Header style={{backgroundColor: colors.background}}>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title={route.name} />
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>
      <View style={styles.container}>
        <NotesSegmentedButtons page={page} changePageType={changeValue} />
        <ScrollView style={styles.list}>
          {page === 'folders' ? (
            <FoldersItem
              isModalVisible={isFolderModalVisible}
              hideModal={hideModal}
              setVisibleFolderModal={showFolderModal}
            />
          ) : page === 'notes' ? (
            <NotesItem notes={notes} />
          ) : (
            <></>
          )}
        </ScrollView>
      </View>
      <FabButton showFolderModal={showFolderModal} fabVisible={fabVisible} />
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
