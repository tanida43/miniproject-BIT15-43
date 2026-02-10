import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TweetItem, Tweet } from '../../components/TweetItem';

// ข้อมูลตัวอย่าง (ผมใส่ isMyPost: true ที่อันแรกให้แล้ว เพื่อทดสอบ)
const MOCK_DATA: Tweet[] = [
  {
    id: '1',
    user: {
      name: 'Me',
      username: '@my_account',
      avatar: 'https://pbs.twimg.com/profile_images/1913228608434475008/Fh97RG-v_400x400.jpg'
    },
    content: 'นี่คือโพสต์ของฉัน ทดสอบการลบและแก้ไข! 🚀',
    time: 'Now',
    stats: { replies: 0, retweets: 0, likeCount: 0, views: 0 },
    isMyPost: true, // <--- อันนี้คือโพสต์ของเรา
  },
  {
    id: '2',
    user: {
      name: '雪兎❄',
      username: '@yukiusagi_52',
      avatar: 'https://pbs.twimg.com/profile_images/1913228608434475008/Fh97RG-v_400x400.jpg'
    },
    content: '#朝比奈まふゆ誕生祭2026\nまふゆおめでとうーー！！！🎉🎉',
    image: 'https://pbs.twimg.com/media/G_mRKAFaUAAyk1H?format=jpg&name=4096x4096',
    imageAspectRatio: 4.5 / 6,
    time: '16h',
    stats: { replies: 3, retweets: 1200, likeCount: 7100, views: 59000 },
    isMyPost: false,
  },
];

// *** สำคัญ: ต้องมี export default ***
export default function ForYouScreen() {
  const router = useRouter();
  const [data, setData] = useState<Tweet[]>([]);

  // โหลดข้อมูลทุกครั้งที่เข้าหน้านี้
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
        await AsyncStorage.setItem('tweets', JSON.stringify(MOCK_DATA));
        setData(MOCK_DATA);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // ฟังก์ชันลบ
  const handleDelete = async (id: string) => {
    const postToDelete = data.find(item => item.id === id);
    if (!postToDelete) return;

    if (!postToDelete.isMyPost) {
      Alert.alert('แจ้งเตือน', 'ลบโพสต์คนอื่นไม่ได้ครับ');
      return; 
    }

    Alert.alert(
      'ยืนยันการลบ',
      'ต้องการลบโพสต์นี้จริงหรือไม่?',
      [
        { text: 'ยกเลิก', style: 'cancel' },
        {
          text: 'ลบ',
          style: 'destructive',
          onPress: async () => {
            const newData = data.filter(item => item.id !== id);
            setData(newData);
            await AsyncStorage.setItem('tweets', JSON.stringify(newData));
          }
        }
      ]
    );
  };

  // ฟังก์ชันแก้ไข
  const handleEdit = (item: Tweet) => {
    if (!item.isMyPost) {
      Alert.alert('แจ้งเตือน', 'แก้ไขโพสต์คนอื่นไม่ได้ครับ');
      return;
    }

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
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
        ListEmptyComponent={
           <View style={{ padding: 20, alignItems: 'center' }}>
             <Text style={{ color: 'gray' }}>ไม่มีข้อมูล</Text>
           </View>
        }
      />
      
      {/* ปุ่มบวก (+) */}
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => router.push('/compose')}
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
