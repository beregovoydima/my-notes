import React, {useMemo} from 'react';
import {NotesListItemChildren} from '@/core/interfaces';
import {Checkbox} from 'react-native-paper';

interface Props {
  list: NotesListItemChildren;
  checkList: (isChecked: boolean) => void;
  color?: string;
}

export const CheckBoxListTitle = ({list, checkList, color}: Props) => {
  const allChildChecked = useMemo(() => {
    if (list.children.length) {
      return list.children.every(el => el.isChecked);
    }
    return list.isChecked;
  }, [list.children, list.isChecked]);

  const childChecked = () => {
    if (list.children.length) {
      return list.children.every(el => el.isChecked);
    }
    return list.isChecked;
  };

  return (
    <Checkbox.Android
      color={color ? color : undefined}
      status={childChecked() ? 'checked' : 'unchecked'}
      onPress={() => checkList(allChildChecked)}
    />
  );
};
