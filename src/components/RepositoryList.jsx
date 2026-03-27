import React from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import {Picker} from '@react-native-picker/picker';
import { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "#e1e4e8"
  },
  container: {
    backgroundColor: '#e1e4e8',
    padding: 16,
  },
  searchbar: {
    borderRadius: 8,
    elevation: 5,
    backgroundColor : 'white'
  },
  input: {
    fontSize: 18,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SearchBar = ({searchQuery, setSearchQuery}) => {
  return (
    <View style={styles.container}>
    <Searchbar
      style={styles.searchbar}
      inputStyle={styles.input}
      iconColor="#6b6b6b"
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
      />
    </View>
  );
}

const ListSorter = ({ orderBy, orderDirection, setOrderBy, setOrderDirection }) => {
  return (
  <Picker style={{backgroundColor: "#e1e4e8"}}
    selectedValue={JSON.stringify({ orderBy, orderDirection })}
    onValueChange={(value) => {
      if (!value) return;

      const parsed = JSON.parse(value);
      setOrderBy(parsed.orderBy);
      setOrderDirection(parsed.orderDirection);
      }}>
    <Picker.Item label="Select an item..." value="" color="#999" enabled={false}/>
    <Picker.Item label="Latest repositories" 
    value={JSON.stringify({ orderBy: 'CREATED_AT', orderDirection: 'DESC' })} />
    <Picker.Item label="Highest rated repositories" 
    value={JSON.stringify({ orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' })} />
    <Picker.Item label="Lowest rated repositories" 
    value={JSON.stringify({ orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' })} />
  </Picker>
  );
}

const RepositoryListHeader = ({
  searchQuery,
  setSearchQuery,
  orderBy,
  orderDirection,
  setOrderBy,
  setOrderDirection,
}) => {
  return (
    <>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ListSorter
        orderBy={orderBy}
        orderDirection={orderDirection}
        setOrderBy={setOrderBy}
        setOrderDirection={setOrderDirection}
      />
    </>
  );
};

class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const {
      searchQuery,
      setSearchQuery,
      orderBy,
      orderDirection,
      setOrderBy,
      setOrderDirection,
    } = this.props;

    return (
      <RepositoryListHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        orderBy={orderBy}
        orderDirection={orderDirection}
        setOrderBy={setOrderBy}
        setOrderDirection={setOrderDirection}
      />
    );
  };

  render() {
    const { repositories, navigate, onEndReach } = this.props;

    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigate(`/${item.id}`)}>
            <RepositoryItem repository={item} />
          </Pressable>
        )}
        ListHeaderComponent={this.renderHeader}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}


const RepositoryList = () => {
  const navigate = useNavigate();

  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedValue] = useDebounce(searchQuery, 500);

  const { repositories, fetchMore } = useRepositories({orderBy, orderDirection, debouncedValue});

  const onEndReach = () => {
    fetchMore();
  };

  return <RepositoryListContainer 
        repositories={repositories} 
        onEndReach={onEndReach}
        navigate={navigate}
        orderBy={orderBy}
        orderDirection={orderDirection}
        setOrderBy={setOrderBy}
        setOrderDirection={setOrderDirection}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />;
};

export default RepositoryList;