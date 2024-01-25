import {ListModalItem} from '@/components/notes/itemsList/ListModalItem';
import {NotesListItem} from '@/core/interfaces';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Modal, Portal, Text, Button} from 'react-native-paper';

interface Props {
  visible: boolean;
  hideModal: () => void;
  saveList: (val: string, id?: number) => void;
  editListData?: NotesListItem;
}

export const ListModal = ({
  visible,
  hideModal,
  // saveList,
  editListData,
}: Props) => {
  const [list, setList] = useState<NotesListItem>({
    id: Date.now(),
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
    // if (editListData) {
    //   saveList(text, editListData.id);
    // } else {
    //   saveList(text);
    // }
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
