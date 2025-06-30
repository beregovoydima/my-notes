import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {notesService} from '@/core/services';
import {FolderModal} from '@/components/modals/notes/FolderModal';
import moment from 'moment';
import {RootState} from '@/framework/store/store';
import {useSelector} from 'react-redux';
import {NotesFolderItem, NotesFolderItemKey} from '@/core/interfaces';
import {FolderCard} from './card/FolderCard';
import uuid from 'react-native-uuid';
import {FlashList} from '@shopify/flash-list';
import {useTranslation} from '@/core/i18n';

const keyExtractor = (item: NotesFolderItem) => item?.id;
interface Props {
  isModalVisible: boolean;
  hideModal: () => void;
  setVisibleFolderModal: () => void;
  setFilterFolder: (folderId: NotesFolderItemKey) => void;
}

export const FoldersItem = ({
  isModalVisible,
  hideModal,
  setVisibleFolderModal,
  setFilterFolder,
}: Props) => {
  const folders = useSelector((state: RootState) => state.folders.folders);
  const [editFolderData, setEditFolder] = useState<NotesFolderItem | null>(
    null,
  );
  const {t} = useTranslation();

  const hideFollderModal = () => {
    setEditFolder(null);
    hideModal();
  };

  const saveFoldersInStorage = () => {
    const response = notesService.storeGetFoldersCollection();
    notesService.storageSetFolders(response);
  };

  const saveFolder = (val: string, id?: string) => {
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

      saveFoldersInStorage();
      setEditFolder(null);
    }
  };

  const getFolderCard = useCallback(
    (item: NotesFolderItem) => {
      const deleteFolder = (id: string) => {
        const isDeleteFolder = folders.find(el => el.id === id)?.isDeletable;
        if (isDeleteFolder) {
          notesService.storeSetFolders([...folders.filter(el => el.id !== id)]);
          saveFoldersInStorage();
        }
      };

      return (
        <FolderCard
          item={item}
          deleteFolder={deleteFolder}
          setEditFolder={setEditFolder}
          setFilterFolder={setFilterFolder}
        />
      );
    },
    [folders, setFilterFolder],
  );

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

      <FlashList
        data={folders}
        renderItem={({item}) => getFolderCard(item)}
        keyExtractor={keyExtractor}
        estimatedItemSize={113}
        ListEmptyComponent={
          <Text style={styles.emptyText}>{t('notes.emptyNotesList')}</Text>
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  emptyText: {
    textAlign: 'center',
    marginTop: 8,
  },
});
