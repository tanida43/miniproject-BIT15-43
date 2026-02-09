import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TweetItem, Tweet } from '../../components/TweetItem';

// ข้อมูลเริ่มต้น (Mock Data) ถ้ายังไม่มีในเครื่อง
const MOCK_DATA: Tweet[] = [
  {
    id: '999',
    user: {
      name: 'Admin',
      username: '@admin',
      avatar: 'https://reactnative.dev/img/tiny_logo.png'
    },
    content: 'ยินดีต้อนรับ! ลองกดปุ่ม + ด้านขวาล่างเพื่อเพิ่มโพสต์ หรือกด ... ที่โพสต์เพื่อลบ/แก้ไข',
    time: 'Pinned',
    stats: { replies: 0, retweets: 5, likeCount: 10, views: 100 },
  }
];

export default function ForYouScreen() {
  const router = useRouter();
  const [data, setData] = useState<Tweet[]>([]);

  // useFocusEffect จะทำงานทุกครั้งที่หน้านี้ถูกเปิด (เช่น กลับมาจากหน้าโพสต์)
  useFocusEffect(
    useCallback(() => {
      loadTweets();
    }, [])
  );

  const loadTweets = async () => {
    try {
      const storedTweets = await AsyncStorage.getItem('tweets');
      if (storedTweets) {
        setData(JSON.parse(storedTweets));
      } else {
        // ถ้าว่าง ให้ใส่ Mock Data แล้วบันทึก
        await AsyncStorage.setItem('tweets', JSON.stringify(MOCK_DATA));
        setData(MOCK_DATA);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // ฟังก์ชันลบข้อมูล
  const handleDelete = async (id: string) => {
    try {
      const newData = data.filter(item => item.id !== id); // กรองเอาตัวที่ id ตรงกันออก
      setData(newData); // อัปเดตหน้าจอ
      await AsyncStorage.setItem('tweets', JSON.stringify(newData)); // บันทึกลงเครื่อง
    } catch (e) {
      Alert.alert('Error', 'ลบข้อมูลไม่สำเร็จ');
    }
  };

  // ฟังก์ชันส่งไปหน้าแก้ไข
  const handleEdit = (item: Tweet) => {
    router.push({
      pathname: '/compose',
      params: {
        id: item.id,
        content: item.content,
        image: item.image
      }
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TweetItem 
            item={item} 
            onDelete={handleDelete} // ส่ง props ฟังก์ชันลบ
            onEdit={handleEdit}     // ส่ง props ฟังก์ชันแก้ไข
          />
        )}
        ListEmptyComponent={
            <View style={{ padding: 20, alignItems: 'center', marginTop: 50 }}>
                <Text style={{ color: 'gray' }}>ยังไม่มีโพสต์</Text>
            </View>
        }
      />
      
      {/* ปุ่ม Floating Action Button (FAB) */}
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => router.push('/compose')} // ไปหน้าโพสต์ใหม่
      >
        <Feather name="plus" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  fab: {
    position: 'absolute', bottom: 20, right: 20,
    backgroundColor: '#1d9bf0', width: 56, height: 56, borderRadius: 28,
    justifyContent: 'center', alignItems: 'center', elevation: 5,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84,
  },
});
