import {styleColorArr} from '@/core/utils';
import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Modal, Portal} from 'react-native-paper';

interface Props {
  visible: boolean;
  hideModal: () => void;
  changeColor: (color: string) => void;
}

export const ColorPicker = ({visible, hideModal, changeColor}: Props) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.containerStyle}>
        {styleColorArr.map(el => {
          return (
            <TouchableOpacity
              key={el}
              style={[
                styles.color,
                {
                  backgroundColor: el,
                },
              ]}
              onPress={() => changeColor(el)}>
              <View
                style={[
                  {
                    backgroundColor: el,
                  },
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    width: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
  },
  color: {
    margin: 4,
    width: '33%',
    maxWidth: 80,
    height: 80,
  },
});
