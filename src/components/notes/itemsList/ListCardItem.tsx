import {useTheme} from '@/assets/config/colors';
import {ListMenu} from '@/components/ui/menu/ListMenu';
import {NotesListItem, NotesListItemChildren} from '@/core/interfaces';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Card, Text} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import {ListCardItemCildren} from './ListCardItemChildren';

interface Props {
  list: NotesListItem;
  changeList: (list: NotesListItem) => void;
}

export const ListCardItem = ({list, changeList}: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const {colors} = useTheme();

  // const addList = () => {
  //   const listItem: NotesListItem = {
  //     ...list,
  //     items: [
  //       ...list.items,
  //       {id: Date.now(), isChecked: false, text: '', children: []},
  //     ],
  //   };
  //   changeList(listItem);
  // };

  const addChildList = (val: NotesListItemChildren) => {
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

  const getMoreIcon = (el: NotesListItem) => {
    return (
      <View style={styles.buttons}>
        <MaterialIcons
          name={isExpanded ? 'expand-more' : 'expand-less'}
          color={colors.greyColor}
          size={26}
          onPress={() => setIsExpanded(!isExpanded)}
          style={{}}
        />
        <ListMenu
          editList={id => {
            console.log(id);
          }}
          deleteList={id => {
            console.log(id);
          }}
          listId={el.id}
        />
      </View>
    );
  };

  const getLeftIcon = (props: any) => {
    return <Avatar.Icon {...props} icon="clipboard-list" />;
  };

  return (
    <View style={styles.item}>
      <Card style={[{backgroundColor: colors.whiteColor}]}>
        <Card.Title
          title={list.title}
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
              {/* <Divider /> */}
              {list.items.map(child => {
                return (
                  <ListCardItemCildren
                    key={child.id}
                    listChild={child}
                    addChildList={addChildList}
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
  item: {
    // margin: 5,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
