import React from 'react';
import {NotesListItem, NotesListItemChildren} from '@/core/interfaces';
import {Checkbox} from 'react-native-paper';

interface Props {
  listItem: NotesListItem;
  listID: number;
  checkListItem: (list: NotesListItemChildren) => void;
}

export const CheckBoxListItem = ({listItem, checkListItem, listID}: Props) => {
  return (
    <Checkbox.Android
      status={listItem.isChecked ? 'checked' : 'unchecked'}
      onPress={() => checkListItem(listItem)}
    />
  );
};
