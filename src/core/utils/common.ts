import uuid from 'react-native-uuid';

export const getUuid = () => {
  return uuid.v4().toString();
};
