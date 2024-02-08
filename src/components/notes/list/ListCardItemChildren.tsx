import {useTheme} from '@/assets/config/colors';
import {CheckBoxListTitle} from '@/components/ui/checkbox/CheckBoxListTitle';
import {
  NotesListItemChildren,
  NotesListItemChildrenItem,
} from '@/core/interfaces';
import React, {useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider, IconButton, Text} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ListCardItemCildrenItem} from './ListCardItemChildrenItem';

interface Props {
  listChild: NotesListItemChildren;
  saveChildList: (val: NotesListItemChildren) => void;
  color?: string;
}

export const ListCardItemCildren = ({
  listChild,
  saveChildList,
  color,
}: Props) => {
  const {colors} = useTheme();

  const [isExpanded, setIsExpanded] = useState(false);

  const getExpandIcon = useMemo(() => {
    if (isExpanded) {
      return (
        <MaterialIcons name="expand-less" size={26} color={colors.greyColor} />
      );
    }
    return (
      <MaterialIcons name="expand-more" size={26} color={colors.greyColor} />
    );
  }, [isExpanded, colors.greyColor]);

  const checkList = (isAllChecked: boolean) => {
    saveChildList({
      ...listChild,
      isChecked: !isAllChecked,
      children: listChild.children.map(el => {
        return {...el, isChecked: !isAllChecked};
      }),
    });
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
        <CheckBoxListTitle
          color={color}
          list={listChild}
          checkList={val => {
            checkList(val);
          }}
        />
        <Text
          variant="bodyLarge"
          numberOfLines={1}
          style={[
            styles.text,
            listChild.isChecked && styles.checkedText,
            {color: listChild.isChecked ? colors.greyColor : colors.text},
          ]}>
          {listChild.text}
        </Text>
        <View style={styles.buttons}>
          {listChild.children.length ? (
            <IconButton
              icon={() => getExpandIcon}
              iconColor={colors.primary}
              size={22}
              onPress={() => setIsExpanded(!isExpanded)}
              style={styles.btn}
            />
          ) : (
            <></>
          )}
        </View>
      </View>

      {isExpanded
        ? listChild.children.map(el => {
            return (
              <ListCardItemCildrenItem
                key={el.id}
                saveChildren={saveChildren}
                children={el}
                color={color}
              />
            );
          })
        : null}
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
  text: {
    display: 'flex',
    flex: 1,
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
  checkedText: {
    textDecorationLine: 'line-through',
  },
});
