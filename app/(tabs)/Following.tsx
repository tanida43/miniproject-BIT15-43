import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { TweetItem, Tweet } from '../../components/TweetItem';

const FOLLOWING_TWEETS: Tweet[] = [
  {
    id: '11',
    user: {
    name: '¿?',
    username: '@NLH_00_',
    avatar: 'https://pbs.twimg.com/profile_images/1953405579877355520/0OLuSM19_400x400.jpg'
    },
    content: 'ﾁｪｷ風🎀',
    image: 'https://pbs.twimg.com/media/HAJCC3AakAAyWnw?format=jpg&name=large',
    imageAspectRatio: 4.5 / 6,
    time: '22h',
    stats: { replies: 0, retweets: 1100, likeCount: 9000, views: 67000 },
  },
  {
    id: '12',
    user: {
    name: 'h',
    username: '@kitsuruii',
    avatar: 'https://pbs.twimg.com/profile_images/1999578452396056576/liYJwyjY_400x400.jpg'
    },
    content: '#類司',
    image: 'https://pbs.twimg.com/media/HAF-OC6asAADQWj?format=jpg&name=4096x4096',
    imageAspectRatio: 4.5 / 6,
    time: 'Feb 2',
    stats: { replies: 0, retweets: 826, likeCount: 5700, views: 31000 },
  },
  {
    id: '13',
    user: {
    name: '供能不足',
    username: '@moyumozi1',
    avatar: 'https://pbs.twimg.com/profile_images/1952002814164824064/2T8epiKS_400x400.jpg'
    },
    content: '💜💛厨病激発ボーイ⚡⚡',
    image: 'https://pbs.twimg.com/media/HAEaCBEbgAAWf0o?format=jpg&name=large',
    imageAspectRatio: 15 / 6.5,
    time: 'Feb 1',
    stats: { replies: 0, retweets: 110, likeCount: 1600, views: 17000 },
  },
  {
    id: '14',
    user: {
    name: '🦈キタノニャ🧋',
    username: '@0707_ktn7',
    avatar: 'https://pbs.twimg.com/profile_images/2009893192481800192/4zXvVZTZ_400x400.png'
    },
    content: '願望．．．',
    image: 'https://pbs.twimg.com/media/HAJAOW5bcAAW58V?format=jpg&name=900x900',
    imageAspectRatio: 5 / 5,
    time: '22h',
    stats: { replies: 1, retweets: 248, likeCount: 2400, views: 42000 },
  },
  {
    id: '15',
    user: {
    name: '♧',
    username: '@shizu_MMJ',
    avatar: 'https://pbs.twimg.com/profile_images/2012980721992835072/vFGFhnu7_400x400.jpg'
    },
    content: '#しずまふ💧❄️',
    image: 'https://pbs.twimg.com/media/G9Hkxy6bgAQRVjF?format=jpg&name=large',
    imageAspectRatio: 5.4 / 5,
    time: 'Dec 27,2025',
    stats: { replies: 0, retweets: 984, likeCount: 5700, views: 64000 },
  },
];

export default function FollowingScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={FOLLOWING_TWEETS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TweetItem item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
});