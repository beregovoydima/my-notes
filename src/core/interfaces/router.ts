import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  NoteEdit: undefined;
  Notes: undefined;
  Calendar: undefined;
  Tasks: undefined;
  Search: undefined;
  More: undefined;
  Settings: undefined;

  // Другие экраны
};

export type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'NoteEdit'
>;
