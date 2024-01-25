import {useTheme} from '@/assets/config/colors';
import {CheckBoxListTitle} from '@/components/ui/checkbox/CheckBoxListTitle';
import {NotesListItemChildren} from '@/core/interfaces';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider, IconButton, Text} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ListCardItemCildrenItem} from './ListCardItemChildrenItem';

interface Props {
  listChild: NotesListItemChildren;
  addChildList: (val: NotesListItemChildren) => void;
}

export const ListCardItemCildren = ({listChild}: Props) => {
  const {colors} = useTheme();

  const [isExpanded, setIsExpanded] = useState(false);

  const getExpandIcon = () => {
    if (isExpanded) {
      return (
        <MaterialIcons name="expand-less" size={26} color={colors.greyColor} />
      );
    }
    return (
      <MaterialIcons name="expand-more" size={26} color={colors.greyColor} />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.childContent}>
        <CheckBoxListTitle list={listChild} checkList={() => {}} />
        <Text variant="bodyLarge" style={styles.text}>
          {listChild.text}
        </Text>
        <View style={styles.buttons}>
          {listChild.children.length ? (
            <IconButton
              icon={() => getExpandIcon()}
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

      {isExpanded ? (
        listChild.children.map(el => {
          return <ListCardItemCildrenItem key={el.id} children={el} />;
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
    minHeight: 60,
    marginLeft: 12,
    marginRight: 8,
  },
  text: {
    display: 'flex',
    flex: 1,
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
