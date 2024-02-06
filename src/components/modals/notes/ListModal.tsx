import {ListModalItem} from '@/components/notes/list/ListModalItem';
import {NotesListItem} from '@/core/interfaces';
import {notesService} from '@/core/services';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Modal, Portal, Text, Button} from 'react-native-paper';
import uuid from 'react-native-uuid';

interface Props {
  visible: boolean;
  hideModal: () => void;
  editListData?: NotesListItem | null;
}

export const ListModal = ({visible, hideModal, editListData}: Props) => {
  const [list, setList] = useState<NotesListItem>({
    id: uuid.v4().toString(),
    title: '',
    type: 'list',
    folder: null,
    color: '',
    created: moment().format(),
    updated: null,
    items: [],
  });

  const closeModal = () => {
    hideModal();
  };

  const changeList = (val: NotesListItem) => {
    setList({...val});
  };

  const save = () => {
    if (editListData) {
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
      notesService.storageSetLists([
        ...lists,
        {
          ...list,
          title: list.title ? list.title : new Date().toDateString(),
          items: filterEmptyItems,
        },
      ]);
      notesService.storeAddList(list);
    }

    hideModal();
  };

  useEffect(() => {
    if (editListData) {
      setList({...editListData});
    }
  }, [editListData]);

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={closeModal}
          contentContainerStyle={styles.containerStyle}>
          <Text variant="titleLarge" style={styles.modal}>
            {editListData ? 'Редактировать' : 'Создать'}
          </Text>
          <ScrollView>
            <ListModalItem list={list} changeList={val => changeList(val)} />
          </ScrollView>
          <View style={styles.footer}>
            <Button style={[styles.button]} onPress={() => closeModal()}>
              Отмена
            </Button>
            <Button style={[styles.button]} onPress={() => save()}>
              Сохранить
            </Button>
          </View>
        </Modal>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
    // borderWidth: 1,
  },
  modal: {
    borderRadius: 8,
    marginTop: 0,
    marginBottom: 20,
  },
  button: {
    maxWidth: '40%',
    marginLeft: 20,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 40,
  },
});
