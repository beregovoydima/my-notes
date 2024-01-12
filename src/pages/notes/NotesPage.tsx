import React, {useMemo, useState} from 'react';
import {FabButton} from '@/components/ui/FabButton';
import {StyleSheet, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {useTheme} from '@/assets/config/colors';
import {NotesSegmentedButtons} from '@/components/ui/buttons/NotesSegmentedButtons';
import {NotesFolderItem, NotesItemList, NotesPageType} from '@/core/interfaces';
import {NotesItem} from '@/components/notes/NotesItem';
import {FoldersItem} from '@/components/notes/FoldersItem';

export function NotesPage({route}: {route: any}) {
  const [page, setValue] = useState<NotesPageType>('notes');
  const [folders] = useState<NotesFolderItem[]>([
    {
      name: 'All',
      label: 'Все',
      isDeletable: false,
    },
    {
      name: 'Moя папка',
      label: 'Moя папка',
      isDeletable: false,
    },
  ]);
  const [notes] = useState<NotesItemList[]>([
    {
      id: Date.now(),
      type: 'note', // 'note, list'
      color: '', // need types
      folder: '',
      title: 'First', //string
      label: 'qweqweqe',
      files: [],
      fontWeight: 400, // font weight
      fontSize: 16, //font Size
      checked: false,
      children: [
        {
          id: 1,
          label: 'qwe1',
          checked: false,
        },
        {
          id: 2,
          label: 'qweq',
          checked: false,
        },
      ],
    },
  ]);
  const {colors} = useTheme();

  const changeValue = (val: string) => {
    if (val === 'folders' || val === 'notes' || val === 'list') {
      setValue(val);
    }
  };

  const activePage = useMemo(() => {
    if (page === 'folders') {
      return <FoldersItem folders={folders} />;
    }
    if (page === 'notes') {
      return <NotesItem notes={notes} />;
    }
    return <NotesItem notes={notes} />;
  }, [page, folders, notes]);

  return (
    <View style={styles.page}>
      <Appbar.Header style={{backgroundColor: colors.background}}>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title={route.name} />
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>
      <View style={styles.container}>
        <NotesSegmentedButtons page={page} changePageType={changeValue} />
        {activePage}
      </View>
      <FabButton />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flex: 1,
  },
  container: {
    padding: 10,
    flex: 1,
  },
});
