import {useTheme} from '@/assets/config/colors';
import {NotesFolderItem} from '@/core/interfaces';
import * as React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Avatar, Card} from 'react-native-paper';
import {FoldersMenu} from '../ui/menu/FoldersMenu';

interface Props {
  folders: NotesFolderItem[];
  editFolder: (id: number) => void;
  deleteFolder: (id: number) => void;
}

export const FoldersItem = ({folders, editFolder, deleteFolder}: Props) => {
  const {colors} = useTheme();

  const getLeftIcon = (props: any) => {
    return <Avatar.Icon {...props} icon="folder" />;
  };

  const getMoreIcon = (folder: NotesFolderItem) => {
    return (
      <FoldersMenu
        editFolder={editFolder}
        folder={folder}
        deleteFolder={deleteFolder}
      />
    );
  };

  const renderCardItem = ({item}: {item: NotesFolderItem}) => (
    <Card.Title
      title={item.label}
      style={[
        {
          borderColor: colors.greyColor,
          backgroundColor: colors.background,
        },
        styles.item,
      ]}
      left={getLeftIcon}
      right={() => getMoreIcon(item)}
    />
  );

  return (
    <FlatList
      data={folders}
      keyExtractor={item => item.id.toString()}
      renderItem={renderCardItem}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    marginTop: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
});
