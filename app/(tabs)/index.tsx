import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TweetItem, Tweet } from '../../components/TweetItem';

// เปลี่ยนชื่อ Key เพื่อบังคับให้แอปโหลดข้อมูลใหม่ (แก้ปัญหาข้อมูลเก่าค้าง)
const STORAGE_KEY = 'tweets_data_v5'; 

const MOCK_DATA: Tweet[] = [
  {
    id: '1',
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
  },
  {
    id: '2',
    user: {
    name: '菊102',
    username: '@kiku_102',
    avatar: 'https://pbs.twimg.com/profile_images/2006572380093820928/1p3gRGTS_400x400.jpg'
    },
    content: '●リクエスト 寧々&えむ(惜別衣装)',
    image: 'https://pbs.twimg.com/media/G_hMA2dakAA1dal?format=jpg&name=large',
    imageAspectRatio: 12 / 9,
    time: '21h',
    stats: { replies: 1, retweets: 828, likeCount: 8700, views: 70000 },
  },
  {
    id: '3',
    user: {
    name: 'I drink till im drunk',
    username: '@drarry_175',
    avatar: 'https://pbs.twimg.com/profile_images/1939541423302344704/8p1f9kw-_400x400.jpg'
    },
    content: 'แม่เคะ=ขี้วีน\nแม่เมะ=แอบรักลูกสะใภ้',
    time: '5h',
    stats: { replies: 4, retweets: 3000, likeCount: 2300, views: 100000 },
  },
  {
    id: '4',
    user: {
    name: '夏里🐧',
    username: '@rk_prpr',
    avatar: 'https://pbs.twimg.com/profile_images/1905912587583418368/oWh8pYvB_400x400.jpg'
    },
    content: '盗み食い🍫´-',
    image: 'https://pbs.twimg.com/media/G__3Zw8awAAWGbv?format=jpg&name=large',
    imageAspectRatio: 4.5 / 6,
    time: 'Jan 31',
    stats: { replies: 3, retweets: 1799, likeCount: 12999, views: 114000 },
  },
  {
    id: '5',
    user: {
    name: 'มิลค์เศษใจ',
    username: '@mimilkss',
    avatar: 'https://pbs.twimg.com/profile_images/1688620631359893504/mO9pfqxT_400x400.jpg'
    },
    content: '/me',
    image: 'https://pbs.twimg.com/media/G_f022gbcAA5Ion?format=jpg&name=large',
    imageAspectRatio: 10 / 9,
    time: 'Jan 25',
    stats: { replies: 6, retweets: 42000, likeCount: 36000, views: 845000 },
  },
];

export default function ForYouScreen() {
  const router = useRouter();
  const [data, setData] = useState<Tweet[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadTweets();
    }, [])
  );

  const loadTweets = async () => {
    try {
      const storedTweets = await AsyncStorage.getItem(STORAGE_KEY);
       if (storedTweets) {
        const parsedData = JSON.parse(storedTweets);
        if (parsedData.length === 0) {
            setData(MOCK_DATA);
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_DATA));
        } else {
            setData(parsedData);
        }
      } else {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_DATA));
        setData(MOCK_DATA);
      }
    } catch (e) {
      console.error('Error loading tweets:', e);
      setData(MOCK_DATA);
    }
  };

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
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
          }
        }
      ]
    );
  };

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
             <TouchableOpacity 
                onPress={async () => {
                    await AsyncStorage.removeItem(STORAGE_KEY);
                    loadTweets();
                }}
                style={{ marginTop: 10, padding: 10, backgroundColor: '#333', borderRadius: 5 }}
             >
                <Text style={{ color: 'white' }}>รีเซ็ตข้อมูลตัวอย่าง</Text>
             </TouchableOpacity>
           </View>
        }
      />
      
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