import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  StatusBar 
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// 1. Mock Data สำหรับ Trending Topics
const TRENDS = [
  { id: '1', category: 'Trending in Thailand', title: '#LisaXRockstar', posts: '2.5M posts' },
  { id: '2', category: 'Music · Trending', title: 'NewJeans', posts: '540K posts' },
  { id: '3', category: 'Technology · Trending', title: 'iPhone 16', posts: '120K posts' },
  { id: '4', category: 'Entertainment · Trending', title: '#GenshinImpact', posts: '89K posts' },
  { id: '5', category: 'Only on X · Trending', title: 'VS Code', posts: '50K posts' },
];

export default function SearchScreen() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back(); // ถ้าย้อนได้ ก็ย้อนปกติ
    } else {
      router.replace('/'); // ถ้าย้อนไม่ได้ (เช่น กด reload มา) ให้บังคับกลับไปหน้า Home
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {/* --- Search Header --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#536471" style={{ marginRight: 10 }} />
          <TextInput
            placeholder="ค้นหา X"
            placeholderTextColor="#536471"
            style={styles.input}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <TouchableOpacity>
           <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* --- Trending List --- */}
      <FlatList
        data={TRENDS}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
            <Text style={styles.sectionTitle}>Trends for you</Text>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.trendItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.trendCategory}>{item.category}</Text>
              <Text style={styles.trendTitle}>{item.title}</Text>
              <Text style={styles.trendPosts}>{item.posts}</Text>
            </View>
            <Feather name="more-horizontal" size={16} color="gray" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
    gap: 10
  },
  backButton: { padding: 5 },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#202327',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 36,
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 15,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 15,
    paddingBottom: 5,
  },
  trendItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333', // เส้นขีดคั่นบางๆ แบบเดิม แต่จางลงหน่อยก็ได้
  },
  trendCategory: { color: '#536471', fontSize: 13, marginBottom: 2 },
  trendTitle: { color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 2 },
  trendPosts: { color: '#536471', fontSize: 13 },
});