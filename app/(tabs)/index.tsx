import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { TweetItem, Tweet } from '../../components/TweetItem'; // Import จากไฟล์ที่สร้างใหม่

// ข้อมูลตัวอย่าง (Mock Data)
const TWEETS: Tweet[] = [
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
  return (
    <View style={styles.container}>
      <FlatList
        data={TWEETS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TweetItem item={item} />}
      />
      
      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
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
  },
});
