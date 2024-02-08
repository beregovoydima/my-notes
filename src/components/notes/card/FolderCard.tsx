import {useTheme} from '@/assets/config/colors';
import {FoldersMenu} from '@/components/ui/menu/FoldersMenu';
import {NotesFolderItem, NotesFolderItemKey} from '@/core/interfaces';
import moment from 'moment';
import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Card, Icon, Text} from 'react-native-paper';

interface Props {
  item: NotesFolderItem;
  deleteFolder: (id: string) => void;
  setEditFolder: (folder: NotesFolderItem) => void;
  setFilterFolder: (folderId: NotesFolderItemKey) => void;
}

export const FolderCard = React.memo(
  ({item, deleteFolder, setEditFolder, setFilterFolder}: Props) => {
    const {colors} = useTheme();

    const getLeftIcon = (props: any) => {
      return <Avatar.Icon {...props} icon="folder" />;
    };

    const getMoreIcon = useCallback(
      (folder: NotesFolderItem) => {
        return (
          <FoldersMenu
            editFolder={() => setEditFolder(folder)}
            folder={folder}
            deleteFolder={() => deleteFolder(folder.id)}
          />
        );
      },
      [deleteFolder, setEditFolder],
    );

    return (
      <View style={[styles.item]}>
        <Card
          style={[
            {
              backgroundColor: colors.whiteColor,
            },
          ]}
          onPress={() => setFilterFolder({id: item.id, name: item.label})}>
          <Card.Title
            title={item.label}
            left={getLeftIcon}
            right={() => getMoreIcon(item)}
          />
          <Card.Content>
            <View style={styles.footer}>
              {item.updated ? (
                <Icon
                  source="circle-edit-outline"
                  size={12}
                  color={colors.greyColor}
                />
              ) : null}
              <Text
                variant="labelSmall"
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  color: colors.greyColor,
                  marginLeft: item.updated ? 4 : 0,
                }}>
                {moment(item.updated ? item.updated : item.created).format(
                  'YYYY-MM-DD HH:mm',
                )}
              </Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  item: {
    margin: 5,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
