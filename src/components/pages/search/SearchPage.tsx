import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Searchbar, Text, Chip} from 'react-native-paper';
import {useTheme} from '@/assets/config/colors';
import {useSelector} from 'react-redux';
import {RootState} from '@/framework/store/store';
import {
  CalendarEventTaskType,
  NotesItems,
  NotesListItem,
} from '@/core/interfaces';
import {NoteCard} from '../../notes/card/NoteCard';
import {ListCard} from '../../notes/card/ListCard';
import {CalendarEventCard} from '../../calendar/CalendarEventCard';

type SearchResult =
  | {type: 'note'; item: NotesItems}
  | {type: 'list'; item: NotesListItem}
  | {type: 'event'; item: CalendarEventTaskType};

type FilterType = 'note' | 'list' | 'event';

export function SearchPage() {
  const {colors} = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [activeFilters, setActiveFilters] = useState<FilterType[]>([]);
  const [visibleTypes, setVisibleTypes] = useState<Set<FilterType>>(new Set());

  const notes = useSelector((state: RootState) => state.notes.notes);
  const lists = useSelector((state: RootState) => state.list.list);
  const events = useSelector((state: RootState) => state.calendarEvents.events);

  const toggleFilter = (filter: FilterType) => {
    setActiveFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter],
    );
  };

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      setVisibleTypes(new Set());
      return;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();

    const filteredNotes = notes
      .filter(note => note.title.toLowerCase().includes(lowerCaseQuery))
      .map(note => ({item: note, type: 'note' as const}));

    const filteredLists = lists
      .filter(
        list =>
          list.title.toLowerCase().includes(lowerCaseQuery) ||
          list.items.some(
            item =>
              item.text.toLowerCase().includes(lowerCaseQuery) ||
              item.children.some(child =>
                child.text.toLowerCase().includes(lowerCaseQuery),
              ),
          ),
      )
      .map(list => ({item: list, type: 'list' as const}));

    const filteredEvents = events
      .filter(
        event =>
          event.title.toLowerCase().includes(lowerCaseQuery) ||
          event.info.toLowerCase().includes(lowerCaseQuery),
      )
      .map(event => ({item: event, type: 'event' as const}));

    const allResults = [...filteredNotes, ...filteredLists, ...filteredEvents];
    setVisibleTypes(new Set(allResults.map(r => r.type)));

    const sortedResults = allResults.sort((a, b) => {
      const dateA = new Date(a.item.updated || a.item.created).getTime();
      const dateB = new Date(b.item.updated || b.item.created).getTime();
      return dateB - dateA;
    });

    const filteredAndSortedResults =
      activeFilters.length > 0
        ? sortedResults.filter(result => activeFilters.includes(result.type))
        : sortedResults;

    setSearchResults(filteredAndSortedResults);
  }, [searchQuery, notes, lists, events, activeFilters]);

  return (
    <>
      <View style={[styles.page, {backgroundColor: colors.background}]}>
        {/* <Appbar.Header
          style={[styles.header, {backgroundColor: colors.background}]}>
          <Appbar.Content title={'Поиск'} />
        </Appbar.Header> */}

        <Searchbar
          style={styles.searchbar}
          placeholder="Поиск"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        {visibleTypes.size > 1 && (
          <View style={styles.filterContainer}>
            <Chip
              icon="note"
              style={[
                styles.chip,
                styles.activeChip,
                {
                  backgroundColor: activeFilters.includes('note')
                    ? colors.secondaryContainer
                    : colors.whiteColor,
                  borderColor: activeFilters.includes('note')
                    ? colors.secondaryContainer
                    : colors.greyColor,
                },
              ]}
              onPress={() => toggleFilter('note')}>
              Заметки
            </Chip>
            <Chip
              icon="clipboard-list"
              style={[
                styles.chip,
                styles.activeChip,
                {
                  backgroundColor: activeFilters.includes('list')
                    ? colors.secondaryContainer
                    : colors.whiteColor,
                  borderColor: activeFilters.includes('list')
                    ? colors.secondaryContainer
                    : colors.greyColor,
                },
              ]}
              onPress={() => toggleFilter('list')}>
              Списки
            </Chip>
            <Chip
              icon="calendar"
              style={[
                styles.chip,
                styles.activeChip,
                {
                  backgroundColor: activeFilters.includes('event')
                    ? colors.secondaryContainer
                    : colors.whiteColor,
                  borderColor: activeFilters.includes('event')
                    ? colors.secondaryContainer
                    : colors.greyColor,
                },
              ]}
              onPress={() => toggleFilter('event')}>
              События
            </Chip>
          </View>
        )}
        <ScrollView style={styles.container}>
          {searchResults.map(result => {
            if (result.type === 'note') {
              return (
                <NoteCard
                  key={result.item.id}
                  item={result.item}
                  searchQuery={searchQuery}
                />
              );
            }
            if (result.type === 'list') {
              return (
                <ListCard
                  key={result.item.id}
                  list={result.item}
                  searchQuery={searchQuery}
                />
              );
            }
            if (result.type === 'event') {
              return (
                <CalendarEventCard
                  key={result.item.id}
                  item={result.item}
                  searchQuery={searchQuery}
                />
              );
            }
            return null;
          })}
          {searchQuery.length > 0 && searchResults.length === 0 ? (
            <View style={styles.noResults}>
              <Text>Нет результатов</Text>
            </View>
          ) : null}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flex: 1,
  },
  header: {
    height: 50,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  chip: {
    marginHorizontal: 4,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  container: {
    paddingTop: 4,
    paddingLeft: 4,
    paddingRight: 4,
    flex: 1,
  },
  list: {
    flex: 1,
    marginTop: 4,
    marginBottom: 4,
  },
  noResults: {
    alignItems: 'center',
    marginTop: 20,
  },
  searchbar: {
    margin: 4,
    marginTop: 8,
  },
  activeChip: {
    borderWidth: 1,
  },
});
