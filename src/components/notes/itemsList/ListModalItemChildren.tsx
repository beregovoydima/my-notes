/* eslint-disable react-native/no-inline-styles */
import {useTheme} from '@/assets/config/colors';
import {CheckBoxListTitle} from '@/components/ui/checkbox/CheckBoxListTitle';
import {EditableText} from '@/components/ui/list/EditableText';
import {
  NotesListItemChildren,
  NotesListItemChildrenItem,
} from '@/core/interfaces';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider, IconButton} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ListModalItemCildrenItem} from './ListModalItemChildrenItem';

interface Props {
  listChild: NotesListItemChildren;
  saveChildList: (val: NotesListItemChildren) => void;
  deleteListItem: (val: NotesListItemChildren) => void;
}

export const ListModalItemCildren = ({
  listChild,
  saveChildList,
  deleteListItem,
}: Props) => {
  const {colors} = useTheme();

  const [isExpanded, setIsExpanded] = useState(false);

  const getExpandIcon = () => {
    if (isExpanded) {
      <MaterialIcons name="expand-less" size={26} color={colors.greyColor} />;
    }
    return (
      <MaterialIcons name="expand-more" size={26} color={colors.greyColor} />
    );
  };

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const addItemList = () => {
    const child: NotesListItemChildren = {
      ...listChild,
      children: [
        ...listChild.children,
        {id: Date.now(), text: '', isChecked: false},
      ],
    };
    saveChildList(child);
    setIsExpanded(true);
  };

  const saveTitle = (val: string) => {
    const child: NotesListItemChildren = {
      ...listChild,
      text: val,
    };
    saveChildList(child);
  };

  const checkList = (isAllChecked: boolean) => {
    saveChildList({
      ...listChild,
      isChecked: !isAllChecked,
      children: listChild.children.map(el => {
        return {...el, isChecked: !isAllChecked};
      }),
    });
  };

  const deleteChildren = (children: NotesListItemChildrenItem) => {
    const child: NotesListItemChildren = {
      ...listChild,
      children: listChild.children.filter(el => el !== children),
    };
    saveChildList(child);
  };

  const saveChildren = (val: NotesListItemChildrenItem) => {
    const childrenItems = listChild.children.map(el =>
      el.id === val.id ? val : el,
    );
    const child: NotesListItemChildren = {
      ...listChild,
      isChecked: childrenItems.every(el => el.isChecked),
      children: childrenItems,
    };
    saveChildList(child);
  };

  return (
    <View style={styles.container}>
      <View style={styles.childContent}>
        <CheckBoxListTitle list={listChild} checkList={checkList} />
        <EditableText
          style={{color: colors.text, fontSize: 16}}
          label={listChild.text}
          isChecked={listChild.isChecked}
          saveText={val => saveTitle(val)}
        />
        <View style={styles.buttons}>
          {listChild.children.length ? (
            <IconButton
              icon={() => getExpandIcon()}
              iconColor={colors.primary}
              size={22}
              onPress={() => toggleExpansion()}
              style={styles.btn}
            />
          ) : (
            <></>
          )}

          <IconButton
            icon="plus"
            iconColor={colors.greyColor}
            size={22}
            style={styles.btn}
            onPress={() => addItemList()}
          />
          <IconButton
            icon="delete"
            iconColor={colors.greyColor}
            size={22}
            style={styles.btn}
            onPress={() => deleteListItem(listChild)}
          />
        </View>
      </View>

      {isExpanded ? (
        listChild.children.map(el => {
          return (
            <ListModalItemCildrenItem
              key={el.id}
              children={el}
              saveChildren={saveChildren}
              deleteChildren={deleteChildren}
            />
          );
        })
      ) : (
        <></>
      )}
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    minHeight: 50,
    marginLeft: 12,
    marginRight: 8,
  },
  childContent: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 8,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    margin: 0,
  },
});
