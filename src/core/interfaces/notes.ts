import {FontWeightSize, FontWeightType} from './styles';

export type NotesPageType = 'notes' | 'folders' | 'list';

export type NoteType = 'note' | 'list';

export interface NotesItemList {
  id: number;
  type: NoteType; // 'note, list'
  color: string; // need types
  folder: string;
  title: string; //string
  label: string;
  files: [];
  fontWeight: FontWeightType; // font weight
  fontSize: FontWeightSize; //font Size
  checked: boolean;
  children: NotesItemChildren[];
}

export interface NotesItemChildren {
  id: number;
  label: string;
  checked: boolean;
}

export interface NotesFolderItem {
  name: string;
  label: string;
  isDeletable: boolean;
}
