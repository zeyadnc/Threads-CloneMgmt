import { View, Text, TextInput, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';
import { fetchPopularMovies } from '@/services/api';

const Search = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Search movies function
  const searchMovies = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await fetchPopularMovies({ query: query.trim() });
      setSearchResults(results || []);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchMovies(searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const renderMovieItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      className="flex-1 items-center mb-4 p-2"
      onPress={() => router.push(`/(movies)/${item.id}`)}
    >
      {item.poster_path ? (
        <Image 
          source={{ 
            uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` 
          }}
          className="w-32 h-48 rounded-lg mb-2"
          resizeMode="cover"
        />
      ) : (
        <View className="w-32 h-48 bg-gray-700 rounded-lg mb-2 items-center justify-center">
          <Text className="text-gray-400 text-xs text-center px-2">
            No Image
          </Text>
        </View>
      )}
      <Text className="text-white text-center text-sm font-semibold px-2">
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full" />
      
      <View className="flex-1 px-5 pt-12">
        {/* Header */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity onPress={() => router.back()}>
            <Image source={icons.arrow} className="w-6 h-6" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold ml-4">Search Movies</Text>
        </View>

        {/* Search Input */}
        <View className="bg-white/10 rounded-full px-4 py-3 mb-6 flex-row items-center">
          <Image source={icons.search} className="w-5 h-5 mr-3" />
          <TextInput
            placeholder="Search for movies..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 text-white text-base"
            autoFocus
          />
        </View>

        {/* Search Results */}
        {loading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#ffffff" />
            <Text className="text-white mt-4">Searching...</Text>
          </View>
        ) : error ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-red-400 text-center text-lg">
              Error: {error}
            </Text>
          </View>
        ) : searchQuery.trim() ? (
          searchResults.length > 0 ? (
            <>
              <Text className="text-white text-lg font-semibold mb-4">
                Found {searchResults.length} movies
              </Text>
              <FlatList
                data={searchResults}
                renderItem={renderMovieItem}
                keyExtractor={(item) => item.id?.toString() || item.title}
                numColumns={2}
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                  gap: 15,
                  marginBottom: 10,
                }}
                showsVerticalScrollIndicator={false}
              />
            </>
          ) : (
            <View className="flex-1 items-center justify-center">
              <Text className="text-white text-center text-lg">
                No movies found for &quot;{searchQuery}&quot;
              </Text>
              <Text className="text-gray-400 text-center mt-2">
                Try a different search term
              </Text>
            </View>
          )
        ) : (
          <View className="flex-1 items-center justify-center">
            <Image source={icons.search} className="w-20 h-20 opacity-50 mb-4" />
            <Text className="text-white text-center text-lg">
              Start typing to search movies
            </Text>
            <Text className="text-gray-400 text-center mt-2">
              Search by title, genre, or keyword
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Search;