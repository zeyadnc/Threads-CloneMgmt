import {  ActivityIndicator,ScrollView,Image, Text, View, FlatList } from "react-native";
import { useEffect } from "react";

import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchPopularMovies, testFetch } from "@/services/api";

export default function Index() {
const router=useRouter();

const {data:movies,
  loading:moviesLoading,
  error:moviesError} = useFetch(() => fetchPopularMovies({
  query:''
}));

// Debug logging
console.log('Movies data:', movies);
console.log('Loading:', moviesLoading);
console.log('Error:', moviesError);

// Test basic fetch functionality
useEffect(() => {
  testFetch();
}, []);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full " />

      <ScrollView className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight:"100%" , 
          paddingBottom:10,
        }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-10 mx-auto " />

        {moviesLoading ? (
          <ActivityIndicator size="large" 
            color="#0000ff" 
            className="mt-10 self-center"
          />
        ) : moviesError ? (
          <Text className="text-red-500 text-center">
            Error: {moviesError?.message}</Text>
          ) : (
            <View className="flex-1 mt-5">
              <SearchBar
                onPress={()=>router.push("/search")}
                placeholder="Search for a movie"
              />  
              
              {movies && movies.length > 0 ? (
                <>
                  <Text className="text-white mt-5 mb-3 text-center text-2xl font-bold">
                    Latest Movies ({movies.length})
                  </Text>
                  
                  <FlatList
                    data={movies}
                    renderItem={({item})=>(
                      <View className="flex-1 items-center mb-4 p-2">
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
                      </View>
                    )}
                    keyExtractor={(item)=>item.id?.toString() || item.title}
                    numColumns={2}
                    columnWrapperStyle={{
                      justifyContent:"space-between",
                      gap:15,
                      marginBottom:10,
                    }}
                    className="mt-2 pb-32"
                    scrollEnabled={false}
                  />
                </>
              ) : (
                <Text className="text-white text-center mt-5">
                  {moviesLoading ? "Loading movies..." : "No movies found"}
                </Text>
              )}
            </View>
          )
        }
      </ScrollView>
    </View>
  );
}
