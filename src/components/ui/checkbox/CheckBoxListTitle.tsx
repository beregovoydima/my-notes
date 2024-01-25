import React, {useMemo} from 'react';
import {NotesListItemChildren} from '@/core/interfaces';
import {Checkbox} from 'react-native-paper';

interface Props {
  list: NotesListItemChildren;
  checkList: (isChecked: boolean) => void;
}

export const CheckBoxListTitle = ({list, checkList}: Props) => {
  const allChildChecked = useMemo(() => {
    if (list.children.length) {
      return list.children.every(el => el.isChecked);
    }
    return list.isChecked;
  }, [list.children, list.isChecked]);

  return (
    <Checkbox.Android
      status={allChildChecked ? 'checked' : 'unchecked'}
      onPress={() => checkList(allChildChecked)}
    />
  );
};
