export interface ApiResponse<T> {
  data: T;
  request: {
    status: number;
    statusText: string;
  };
}

export type PagesType =
  | 'Notes'
  | 'Calendar'
  | 'Tasks'
  | 'Search'
  | 'Settings'
  | 'More';
