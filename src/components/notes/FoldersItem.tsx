import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {notesService} from '@/core/services';
import {FolderModal} from '@/components/modals/notes/FolderModal';
import moment from 'moment';
import {RootState} from '@/framework/store/store';
import {useSelector} from 'react-redux';
import {NotesFolderItem} from '@/core/interfaces';
import {FolderCard} from './card/FolderCard';
import uuid from 'react-native-uuid';

interface Props {
  isModalVisible: boolean;
  hideModal: () => void;
  setVisibleFolderModal: () => void;
}

export const FoldersItem = ({
  isModalVisible,
  hideModal,
  setVisibleFolderModal,
}: Props) => {
  const folders = useSelector((state: RootState) => state.folders.folders);
  const [editFolderData, setEditFolder] = useState<NotesFolderItem | null>(
    null,
  );

  const hideFollderModal = () => {
    setEditFolder(null);
    hideModal();
  };

  const saveFoldersInStorage = async () => {
    const response = notesService.storeGetFoldersCollection();
    await notesService.storageSetFolders(response);
  };

  const saveFolder = async (val: string, id?: string) => {
    if (val) {
      if (id) {
        notesService.storeSetFolders([
          ...folders.map(el => {
            return el.id === editFolderData?.id
              ? {...el, updated: moment().format(), label: val, name: val}
              : el;
          }),
        ]);
      } else {
        notesService.storeSetFolders([
          ...folders,
          {
            id: uuid.v4().toString(),
            label: val,
            name: val,
            isDeletable: true,
            created: moment().format(),
            updated: null,
          },
        ]);
      }

      await saveFoldersInStorage();
      setEditFolder(null);
    }
  };

  const deleteFolder = (id: string) => {
    const isDeleteFolder = folders.find(el => el.id === id)?.isDeletable;
    if (isDeleteFolder) {
      notesService.storeSetFolders([...folders.filter(el => el.id !== id)]);
      saveFoldersInStorage();
    }
  };

  const getFolderCard = (item: NotesFolderItem) => {
    return (
      <FolderCard
        item={item}
        deleteFolder={deleteFolder}
        setEditFolder={setEditFolder}
      />
    );
  };

  useEffect(() => {
    if (editFolderData) {
      setVisibleFolderModal();
    }
  }, [editFolderData, setVisibleFolderModal]);

  return (
    <>
      <FolderModal
        visible={isModalVisible}
        hideModal={hideFollderModal}
        saveFolder={saveFolder}
        editFolderData={editFolderData}
      />

      <FlatList
        data={folders}
        renderItem={({item}) => getFolderCard(item)}
        keyExtractor={item => item.id}
        ListEmptyComponent={<></>}
      />
    </>
  );
};
