import {useTheme} from '@/assets/config/colors';
import {FoldersMenu} from '@/components/ui/menu/FoldersMenu';
import {NotesFolderItem, NotesFolderItemKey} from '@/core/interfaces';
import {notesService} from '@/core/services';
import React, {useCallback, useMemo} from 'react';
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

    // Используем useMemo для вычисления количества элементов
    const itemsCount = useMemo(() => {
      const notes = notesService.storeGetCollectionNote();
      const lists = notesService.storeGetListCollection();
      const notesInFolder = notes.filter(
        note => note.folder && note.folder.id === item.id,
      ).length;

      const listsInFolder = lists.filter(
        list => list.folder && list.folder.id === item.id,
      ).length;

      return {
        notes: notesInFolder,
        lists: listsInFolder,
      };
    }, [item.id]);

    const getLeftIcon = (props: any) => {
      return <Avatar.Icon {...props} icon="folder" />;
    };

    const getMoreIcon = useCallback(() => {
      return (
        <FoldersMenu
          editFolder={() => setEditFolder(item)}
          folder={item}
          deleteFolder={() => deleteFolder(item.id)}
        />
      );
    }, [deleteFolder, setEditFolder, item]);

    const getRightContent = useCallback(() => {
      return (
        <View style={styles.titleRightContainer}>
          {/* Счетчик заметок и списков */}
          <View style={styles.countContainer}>
            <View style={styles.countItem}>
              <Icon source="note-outline" size={14} color={colors.secondary} />
              <Text
                variant="labelSmall"
                style={[styles.countText, {color: colors.secondary}]}>
                {itemsCount.notes}
              </Text>
            </View>
            <View style={styles.countItem}>
              <Icon
                source="format-list-bulleted"
                size={14}
                color={colors.secondary}
              />
              <Text
                variant="labelSmall"
                style={[styles.countText, {color: colors.secondary}]}>
                {itemsCount.lists}
              </Text>
            </View>
          </View>
          {getMoreIcon()}
        </View>
      );
    }, [itemsCount, colors, getMoreIcon]);

    return (
      <View style={[styles.item]}>
        <Card
          onPress={() => setFilterFolder({id: item.id, name: item.label})}
          style={{
            backgroundColor: colors.cardBackgroundColor,
            borderBottomColor: colors.cardBackgroundColor,
          }}>
          <Card.Title
            title={item.label}
            left={getLeftIcon}
            right={getRightContent}
          />
        </Card>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  item: {
    margin: 5,
  },
  titleRightContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  countContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  countItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  countText: {
    fontWeight: '600',
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
