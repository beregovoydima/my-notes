import React, {useEffect, useState} from 'react';
import {FabButton} from '@/components/ui/FabButton';
import {StyleSheet, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {useTheme} from '@/assets/config/colors';
import {NotesSegmentedButtons} from '@/components/ui/buttons/NotesSegmentedButtons';
import {NotesFolderItem, NotesItemList, NotesPageType} from '@/core/interfaces';
import {NotesItem} from '@/components/notes/NotesItem';
import {FoldersItem} from '@/components/notes/FoldersItem';
import {FolderModal} from '@/components/modals/FolderModal';

export function NotesPage({route}: {route: any}) {
  const [isFolderModalVisible, setVisibleFolderModal] = useState(false);
  const [page, setValue] = useState<NotesPageType>('notes');
  const [editFolder, setEditFolder] = useState<NotesFolderItem | null>(null);
  const [folders, setFolders] = useState<NotesFolderItem[]>([
    {
      id: Date.now(),
      name: 'All',
      label: 'Все',
      isDeletable: false,
    },
    {
      id: Date.now() + 1,
      name: 'Moя папка',
      label: 'Moя папка1',
      isDeletable: true,
    },
    {
      id: Date.now() + 2,
      name: 'Moя папка',
      label: 'Moя папка2',
      isDeletable: true,
    },
    {
      id: Date.now() + 3,
      name: 'Moя папка',
      label: 'Moя папка3',
      isDeletable: true,
    },
    {
      id: Date.now() + 4,
      name: 'Moя папка',
      label: 'Moя папка4',
      isDeletable: true,
    },
    {
      id: Date.now() + 5,
      name: 'Moя папка',
      label: 'Moя папка5',
      isDeletable: true,
    },
    {
      id: Date.now() + 6,
      name: 'Moя папка',
      label: 'Moя папка6',
      isDeletable: true,
    },
    {
      id: Date.now() + 7,
      name: 'Moя папка',
      label: 'Moя папка7',
      isDeletable: true,
    },
    {
      id: Date.now() + 8,
      name: 'Moя папка',
      label: 'Moя папка8',
      isDeletable: true,
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

  const showFolderModal = () => setVisibleFolderModal(true);
  const hideModal = () => {
    setVisibleFolderModal(false);
  };
  const addFolder = (val: string, id?: number) => {
    if (id) {
      const folder = folders.find(el => el.id === id);
      if (folder) {
        folder.label = val;
        folder.name = val;
        setFolders([...folders]);
      }
    } else {
      setFolders([
        ...folders,
        {label: val, name: val, isDeletable: true, id: Date.now()},
      ]);
    }
  };

  useEffect(() => {
    if (!isFolderModalVisible) {
      setEditFolder(null);
    }
  }, [isFolderModalVisible]);

  useEffect(() => {
    if (editFolder) {
      setVisibleFolderModal(true);
    }
  }, [editFolder]);

  const openEditFolder = (id: number) => {
    const findFolderbyId = folders.find(el => el.id === id);
    if (findFolderbyId) {
      setEditFolder(findFolderbyId);
    }
  };

  const deleteFolder = (id: number) => {
    const isDeleteFolder = folders.find(el => el.id === id)?.isDeletable;
    if (isDeleteFolder) {
      setFolders([...folders.filter(el => el.id !== id)]);
    }
  };

  const [fabVisible] = useState(true);

  return (
    <View style={styles.page}>
      <Appbar.Header style={{backgroundColor: colors.background}}>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title={route.name} />
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>
      <NotesSegmentedButtons page={page} changePageType={changeValue} />
      <View style={styles.container}>
        <View style={styles.list}>
          {page === 'folders' ? (
            <FoldersItem
              folders={folders}
              editFolder={openEditFolder}
              deleteFolder={deleteFolder}
            />
          ) : page === 'notes' ? (
            <NotesItem notes={notes} />
          ) : (
            <></>
          )}
        </View>
      </View>
      <FolderModal
        visible={isFolderModalVisible}
        hideModal={hideModal}
        saveFolder={addFolder}
        editFolder={editFolder}
      />
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
    // borderWidth: 1,
    padding: 10,
    // paddingBottom: 20,
    flex: 1,
  },
  list: {
    paddingRight: 10,
    paddingLeft: 10,
  },
});
