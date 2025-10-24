/* eslint-disable react-native/no-inline-styles */
import {EditableText} from '@/components/ui/list/EditableText';
import {
  ListEditScreenRouteProp,
  NotesFolderItem,
  NotesListItem,
  ScreenNavigationProp,
} from '@/core/interfaces';
import {notesService} from '@/core/services';
import moment from 'moment';
import React, {useCallback, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  BackHandler,
  TouchableOpacity,
  AppState,
  AppStateStatus,
} from 'react-native';
import {Button, Chip, Divider} from 'react-native-paper';
import {useTheme} from '@/assets/config/colors';
import {ListModalItem} from '@/components/notes/list/ListModalItem';
import {useNavigation} from '@react-navigation/native';
import {getUuid, handleShare, hex2rgba, parseList} from '@/core/utils';
import {useSelector} from 'react-redux';
import {ColorMenu} from '@/components/ui/menu/ColorMenu';
import {ListEditMenu} from '@/components/ui/menu/ListEditMenu';
import {AddFolderModal} from '@/components/modals/notes/AddFolderModal';
import {useTranslation} from '@/core/i18n';

export const ListEditPage = ({route}: {route: ListEditScreenRouteProp}) => {
  const {colors} = useTheme();
  const navigation: ScreenNavigationProp = useNavigation();
  const {t} = useTranslation();

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [list, setList] = useState<NotesListItem>({
    id: getUuid(),
    title: '',
    type: 'list',
    folder: null,
    color: '',
    created: moment().format(),
    updated: null,
    items: [],
  });
  const folders = useSelector(() => notesService.storeGetFoldersCollection());
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const response = notesService.storeGetListCollection();
    if (response.length && route.params?.listId) {
      const findList = response.find(el => el.id === route.params.listId);
      if (findList) {
        setList({...findList});
      }
    }
  }, [colors.secondary, route.params.listId]);

  const changeList = (val: NotesListItem) => {
    setList({...val});
  };

  const saveTitleText = (text: string) => {
    const listItem = {...list, title: text, updated: moment().format()};
    changeList(listItem);
  };

  const save = useCallback(() => {
    if (!list.title && !list.items.length) {
      return;
    }
    if (route.params.listId) {
      const listCollection = [...notesService.storeGetListCollection()].map(
        el => {
          if (el.id === list.id) {
            const filterEmptyItems = list.items
              .map(item => ({
                ...item,
                children: item.children.filter(child => child.text),
              }))
              .filter(item => {
                return !!item.children.length || item.text;
              });

            return {
              ...list,
              title: list.title,
              items: filterEmptyItems,
              updated: moment().format(),
            };
          }

          return el;
        },
      );
      notesService.storageSetLists(listCollection);
      notesService.storeSetListCollection(listCollection);
    } else {
      const filterEmptyItems = list.items
        .map(item => ({
          ...item,
          children: item.children.filter(child => child.text),
        }))
        .filter(item => {
          return !!item.children.length || item.text;
        });

      const lists = notesService.storeGetListCollection();
      notesService.storageSetLists([
        ...lists,
        {
          ...list,
          items: filterEmptyItems,
        },
      ]);
      notesService.storeAddList(list);
    }
  }, [list, route.params.listId]);

  const backSave = useCallback(() => {
    save();

    return false;
  }, [save]);

  const handleFolderSet = (folder: NotesFolderItem) => {
    if (folder.id === list.folder?.id) {
      setList({
        ...list,
        folder: null,
      });
    } else {
      setList({
        ...list,
        folder: {id: folder.id, name: folder.name},
      });
    }
  };

  const changeColor = (color: string) => {
    setList({...list, color: color});
    setShowColorPicker(false);
  };

  const handleSave = () => {
    save();
    navigation.navigate('Notes');
  };

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'background') {
        backSave();
        if (list.title || list.items.length) {
          navigation.navigate('ListEdit', {listId: list.id});
        }
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, [backSave, list.id, navigation, list.title, list.items.length]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backSave,
    );

    return () => {
      backHandler.remove();
    };
  }, [backSave, list]);

  const deleteList = async () => {
    const filterListCollection = [
      ...notesService.storeGetListCollection(),
    ].filter(el => el.id !== list.id);

    notesService.storageSetLists(filterListCollection);
    notesService.storeSetListCollection(filterListCollection);
    navigation.navigate('Notes');
  };

  const shareList = () => {
    handleShare({
      title: list.title,
      message: parseList(list),
    });
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <AddFolderModal visible={visible} hideModal={() => setVisible(false)} />
      <View
        style={[
          styles.view,
          {
            backgroundColor: hex2rgba(
              list.color ? list.color : colors.primary,
              0.04,
            ),
          },
        ]}>
        <View
          style={[
            styles.content,
            {
              backgroundColor: hex2rgba(
                list.color ? list.color : colors.primary,
                0.15,
              ),
            },
          ]}>
          <EditableText
            style={styles.header}
            label={list.title}
            customText={t('lists.enterListTitle')}
            isChecked={
              !!list.items.length && list.items.every(el => el.isChecked)
            }
            saveText={val => saveTitleText(val)}
            autofocus={!route.params.listId}
          />
          <ColorMenu
            visible={showColorPicker}
            onDismiss={() => setShowColorPicker(false)}
            onSelectColor={changeColor}
            anchorComponent={
              <TouchableOpacity onPress={() => setShowColorPicker(true)}>
                <View
                  style={[
                    {
                      backgroundColor: list.color ? list.color : colors.primary,
                    },
                    styles.colorPicker,
                  ]}
                />
              </TouchableOpacity>
            }
          />
          <View>
            <Icon
              name="share-variant"
              size={24}
              color={colors.greyIconColor}
              style={styles.ml10}
              onPress={shareList}
            />
          </View>

          <ListEditMenu
            deleteList={() => deleteList()}
            saveList={() => handleSave()}
          />
        </View>
        <ScrollView>
          <ListModalItem list={list} changeList={val => changeList(val)} />
        </ScrollView>
        <View
          style={{
            backgroundColor: hex2rgba(
              list.color ? list.color : colors.primary,
              0.04,
            ),
            padding: 4,
          }}>
          <ScrollView horizontal>
            <View style={styles.chipsList}>
              {folders.map(el => {
                return (
                  <Chip
                    key={el.id}
                    mode="outlined"
                    selected={el.id === list.folder?.id ? true : false}
                    style={{
                      marginRight: 4,
                      backgroundColor: colors.whiteColor,
                      height: 34,
                    }}
                    onPress={() => handleFolderSet(el)}>
                    {el.label.length > 10
                      ? el.label.slice(0, 10) + '...'
                      : el.label + ' '}
                  </Chip>
                );
              })}
              <View>
                <Button mode="text" onPress={() => setVisible(true)}>
                  {folders.length === 0 ? (
                    t('folders.createFolder')
                  ) : (
                    <Icon name="plus" size={16} />
                  )}
                </Button>
              </View>
            </View>
          </ScrollView>
        </View>
        <Divider />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  view: {
    display: 'flex',
    flex: 1,
  },
  addBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 5,
    paddingLeft: 5,
  },
  content: {
    minHeight: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorPicker: {
    width: 40,
    height: 40,
    marginRight: 20,
    marginLeft: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: '500',
  },
  button: {
    maxWidth: '40%',
    marginLeft: 20,
  },
  ml10: {
    marginLeft: 10,
  },
  chips: {
    maxHeight: 40,
    minHeight: 40,
    padding: 4,
    marginBottom: 10,
  },
  chipsList: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    maxHeight: 40,
  },
});
