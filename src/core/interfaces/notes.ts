import {FontWeightSize, FontWeightType} from './styles';

export type NotesPageType = 'notes' | 'folders' | 'list';

export type NoteType = 'note' | 'list';

export interface NotesItems {
  id: number;
  created: Date | string | null;
  updated: Date | string | null;
  type: NoteType; // 'note, list'
  color: string | null; // need types
  folder: string | null;
  title: string; //string
  label: string;
  files: [];
  fontWeight: FontWeightType; // font weight
  fontSize: FontWeightSize; //font Size
}

export interface NotesFolderItem {
  id: number;
  name: string;
  label: string;
  isDeletable: boolean;
  created: Date | string;
  updated: Date | string | null;
}

export interface NotesListItem {
  id: number;
  type: NoteType;
  title: string;
  color: string | null; // need types
  folder: string | null;
  created: Date | string;
  updated: Date | string | null;
  items: NotesListItemChildren[];
}

export interface NotesListItemChildren {
  id: number;
  text: string;
  isChecked: boolean;
  children: NotesListItemChildrenItem[];
}

export interface NotesListItemChildrenItem {
  id: number;
  text: string;
  isChecked: boolean;
}
