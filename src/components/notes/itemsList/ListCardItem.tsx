import {useTheme} from '@/assets/config/colors';
import {ListMenu} from '@/components/ui/menu/ListMenu';
import {NotesListItem, NotesListItemChildren} from '@/core/interfaces';
import React, {useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Card, Text} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import {ListCardItemCildren} from './ListCardItemChildren';

interface Props {
  list: NotesListItem;
  changeList: (list: NotesListItem) => void;
  deleteList: (id: number) => void;
  editList: (list: NotesListItem) => void;
}

export const ListCardItem = ({
  list,
  changeList,
  deleteList,
  editList,
}: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const {colors} = useTheme();

  const getMoreIcon = (el: NotesListItem) => {
    return (
      <View style={styles.buttons}>
        <MaterialIcons
          name={isExpanded ? 'expand-less' : 'expand-more'}
          color={colors.greyColor}
          size={26}
          onPress={() => setIsExpanded(!isExpanded)}
          style={{}}
        />
        <ListMenu
          editList={() => editList(list)}
          deleteList={id => deleteList(id)}
          listId={el.id}
        />
      </View>
    );
  };

  const saveChildList = (val: NotesListItemChildren) => {
    const listItem: NotesListItem = {
      ...list,
      items: [
        ...list.items.map(el => {
          return el.id === val.id ? val : el;
        }),
      ],
    };
    changeList(listItem);
  };

  const getLeftIcon = (props: any) => {
    return <Avatar.Icon {...props} icon="clipboard-list" />;
  };

  const isChecked = useMemo(() => {
    return !!list.items.length && list.items.every(el => el.isChecked);
  }, [list]);

  return (
    <View>
      <Card style={[{backgroundColor: colors.whiteColor}]}>
        <Card.Title
          title={list.title}
          titleStyle={[
            isChecked && styles.checkedText,
            {color: isChecked ? colors.greyColor : colors.text},
          ]}
          left={getLeftIcon}
          right={() => getMoreIcon(list)}
        />
        <Card.Content>
          <Text variant="labelSmall" style={{color: colors.greyColor}}>
            {moment(list.updated ? list.updated : list.created).format(
              'YYYY-MM-DD HH:mm',
            )}
          </Text>
          {isExpanded ? (
            <>
              {list.items.map(child => {
                return (
                  <ListCardItemCildren
                    key={child.id}
                    listChild={child}
                    saveChildList={saveChildList}
                  />
                );
              })}
            </>
          ) : (
            <></>
          )}
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedText: {
    textDecorationLine: 'line-through',
  },
});
