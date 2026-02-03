import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

// Interface
export interface Tweet {
  id: string;
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  image?: string;
  imageAspectRatio?: number;
  time: string;
  stats: {
    replies: number;
    retweets: number;
    likeCount: number;
    views: number;
  };
}

export const TweetItem = ({ item }: { item: Tweet }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(item.stats.likeCount);
  const [isReposted, setIsReposted] = useState(false);
  const [repostCount, setRepostCount] = useState(item.stats.retweets);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
      setIsLiked(false);
    } else {
      setLikeCount(prev => prev + 1);
      setIsLiked(true);
    }
  };

  const handleRepost = () => {
    if (isReposted) {
      setRepostCount(prev => prev - 1);
      setIsReposted(false);
    } else {
      setRepostCount(prev => prev + 1);
      setIsReposted(true);
    }
  };

  const formatCount = (count: number) => {
    return count > 1000 ? (count / 1000).toFixed(1) + 'k' : count;
  };

  return (
    <View style={styles.tweetContainer}>
      <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
      <View style={styles.contentContainer}>
        <View style={styles.tweetHeader}>
          <Text style={styles.name} numberOfLines={1}>{item.user.name}</Text>
          <Text style={styles.username} numberOfLines={1}> {item.user.username} · {item.time}</Text>
          <TouchableOpacity style={{ marginLeft: 'auto' }}>
            <Feather name="more-horizontal" size={16} color="gray" />
          </TouchableOpacity>
        </View>

        <Text style={styles.tweetText}>{item.content}</Text>
        {item.image && (
            <Image source={{ uri: item.image }}
             style={[styles.tweetImage,{ aspectRatio: item.imageAspectRatio || 1.77 }]}
            />
        )}

        <View style={styles.actionsContainer}>
          <ActionIcon icon="message-circle" count={item.stats.replies} />
          
          <TouchableOpacity onPress={handleRepost} style={styles.actionButton}>
            <Feather name="repeat" size={16} color={isReposted ? "#00ba7c" : "gray"} />
            <Text style={[styles.actionText, { color: isReposted ? "#00ba7c" : "gray" }]}>
              {formatCount(repostCount)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
            <Ionicons name={isLiked ? "heart" : "heart-outline"} size={18} color={isLiked ? "#f91880" : "gray"} />
            <Text style={[styles.actionText, { color: isLiked ? "#f91880" : "gray" }]}>
              {formatCount(likeCount)}
            </Text>
          </TouchableOpacity>

          <ActionIcon icon="bar-chart-2" count={item.stats.views} />
          <Feather name="share" size={16} color="gray" />
        </View>
      </View>
    </View>
  );
};

const ActionIcon = ({ icon, count }: { icon: any, count: number }) => (
  <View style={styles.actionButton}>
    <Feather name={icon} size={16} color="gray" />
    <Text style={styles.actionText}>{count > 1000 ? (count/1000).toFixed(1) + 'k' : count}</Text>
  </View>
);

const styles = StyleSheet.create({
  tweetContainer: { flexDirection: 'row', padding: 12, borderBottomWidth: 0.5, borderBottomColor: '#333' },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  contentContainer: { flex: 1 },
  tweetHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  name: { color: 'white', fontWeight: 'bold', fontSize: 15 },
  username: { color: 'gray', fontSize: 15 },
  tweetText: { color: 'white', fontSize: 15, lineHeight: 20, marginBottom: 10 },
  tweetImage: { width: '100%', borderRadius: 15, marginTop: 5, marginBottom: 10, resizeMode: 'cover' },
  actionsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginRight: 20 },
  actionButton: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  actionText: { color: 'gray', fontSize: 12 },
});