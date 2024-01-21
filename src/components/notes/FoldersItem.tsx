import {useTheme} from '@/assets/config/colors';
import {NotesFolderItem} from '@/core/interfaces';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Card} from 'react-native-paper';
import {FoldersMenu} from '../ui/menu/FoldersMenu';
import {notesService} from '@/core/services';
import {FolderModal} from '@/components/modals/FolderModal';
import moment from 'moment';
import {RootState} from '@/framework/store/store';
import {useSelector} from 'react-redux';

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

  const {colors} = useTheme();

  const [editFolderData, setEditFolder] = useState<NotesFolderItem | null>(
    null,
  );

  const getLeftIcon = (props: any) => {
    return <Avatar.Icon {...props} icon="folder" />;
  };

  const setFolders = async () => {
    const response = await notesService.getFoldersCollectionFromStorage();
    if (response) {
      notesService.setFolders(response);
    }
  };

  const hideFollderModal = () => {
    setEditFolder(null);
    hideModal();
  };

  const saveFoldersInStorage = async () => {
    const response = notesService.getFoldersCollection();

    await notesService.setFoldersInStorage(response);
  };

  const saveFolder = async (val: string, id?: number) => {
    if (val) {
      if (id) {
        notesService.setFolders([
          ...folders.map(el => {
            return el.id === editFolderData?.id
              ? {...el, updated: moment().format(), label: val, name: val}
              : el;
          }),
        ]);
      } else {
        notesService.setFolders([
          ...folders,
          {
            id: Date.now(),
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

  const deleteFolder = (id: number) => {
    const isDeleteFolder = folders.find(el => el.id === id)?.isDeletable;
    if (isDeleteFolder) {
      notesService.setFolders([...folders.filter(el => el.id !== id)]);
      saveFoldersInStorage();
    }
  };

  useEffect(() => {
    if (editFolderData) {
      setVisibleFolderModal();
    }
  }, [editFolderData, setVisibleFolderModal]);

  useEffect(() => {
    setFolders();
  }, []);

  const getMoreIcon = (folder: NotesFolderItem) => {
    return (
      <FoldersMenu
        editFolder={() => setEditFolder(folder)}
        folder={folder}
        deleteFolder={deleteFolder}
      />
    );
  };

  return (
    <>
      <FolderModal
        visible={isModalVisible}
        hideModal={hideFollderModal}
        saveFolder={saveFolder}
        editFolderData={editFolderData}
      />

      {folders.map(el => {
        return (
          <View style={styles.item}>
            <Card
              key={el.id}
              style={[
                {
                  backgroundColor: colors.whiteColor,
                },
              ]}>
              <Card.Title
                title={el.label}
                left={getLeftIcon}
                right={() => getMoreIcon(el)}
              />
            </Card>
          </View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    margin: 5,
  },
});
