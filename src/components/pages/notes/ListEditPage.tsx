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
import {Chip, Divider} from 'react-native-paper';
import {useTheme} from '@/assets/config/colors';
import {ListModalItem} from '@/components/notes/list/ListModalItem';
import {useNavigation} from '@react-navigation/native';
import {getUuid, handleShare, hex2rgba, parseList} from '@/core/utils';
import {useSelector} from 'react-redux';
import {ColorPicker} from '@/components/modals/ui/ColorPicker';
import {ListEditMenu} from '@/components/ui/menu/ListEditMenu';

export const ListEditPage = ({route}: {route: ListEditScreenRouteProp}) => {
  const {colors} = useTheme();
  const navigation: ScreenNavigationProp = useNavigation();

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
              title: list.title ? list.title : new Date().toDateString(),
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
      list.title = list.title ? list.title : moment().format('YYYY-MM-DD');
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
        navigation.navigate('ListEdit', {listId: list.id});
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, [backSave, list.id, navigation]);

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
      <ColorPicker
        visible={showColorPicker}
        hideModal={() => setShowColorPicker(false)}
        changeColor={changeColor}
      />
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
            customText="Введите название списка"
            isChecked={
              !!list.items.length && list.items.every(el => el.isChecked)
            }
            saveText={val => saveTitleText(val)}
          />
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
        <ScrollView horizontal style={[styles.chips]}>
          {folders.map(el => {
            return (
              <Chip
                key={el.id}
                mode="outlined"
                selected={el.id === list.folder?.id ? true : false}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{marginRight: 4, backgroundColor: colors.whiteColor}}
                onPress={() => handleFolderSet(el)}>
                {el.label}
              </Chip>
            );
          })}
        </ScrollView>
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
});
