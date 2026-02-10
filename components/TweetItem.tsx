import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

// 1. ประกาศ Interface (รวม isMyPost แล้ว)
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
  isMyPost?: boolean;
}

// 2. ตัว Component หลัก
export const TweetItem = ({ 
  item, 
  onDelete, 
  onEdit 
}: { 
  item: Tweet, 
  onDelete?: (id: string) => void, 
  onEdit?: (item: Tweet) => void 
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(item.stats.likeCount);
  const [isReposted, setIsReposted] = useState(false);
  const [repostCount, setRepostCount] = useState(item.stats.retweets);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleRepost = () => {
    setIsReposted(!isReposted);
    setRepostCount(prev => isReposted ? prev - 1 : prev + 1);
  };

  // ฟังก์ชันจัดการเมนู (จุด 3 จุด)
  const handleOptions = () => {
    if (item.isMyPost) {
      // เมนูสำหรับโพสต์ของเรา
      Alert.alert(
        "จัดการโพสต์",
        "เลือกรายการที่ต้องการ",
        [
          { text: "ยกเลิก", style: "cancel" },
          { text: "แก้ไข", onPress: () => onEdit && onEdit(item) },
          { text: "ลบ", style: "destructive", onPress: () => onDelete && onDelete(item.id) }
        ]
      );
    } else {
      // เมนูสำหรับโพสต์คนอื่น
      Alert.alert(
        "ตัวเลือก",
        `โพสต์ของ ${item.user.username}`,
        [
          { text: "ยกเลิก", style: "cancel" },
          { text: "รายงาน", onPress: () => console.log('Reported') },
          { text: "บล็อก", onPress: () => console.log('Blocked') }
        ]
      );
    }
  };

  return (
    <View style={styles.tweetContainer}>
      <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
      <View style={styles.contentContainer}>
        
        {/* Header */}
        <View style={styles.tweetHeader}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
             <Text style={styles.name} numberOfLines={1}>{item.user.name}</Text>
             <Text style={styles.username} numberOfLines={1}> {item.user.username} · {item.time}</Text>
          </View>
          <TouchableOpacity style={{ padding: 4 }} onPress={handleOptions}>
            <Feather name="more-horizontal" size={16} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <Text style={styles.tweetText}>{item.content}</Text>
        
        {/* Image */}
        {item.image ? (
            <Image 
              source={{ uri: item.image }}
              style={[styles.tweetImage, { aspectRatio: item.imageAspectRatio || 1.77 }]}
            />
        ) : null}

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <ActionIcon icon="message-circle" count={item.stats.replies} />
          
          <TouchableOpacity onPress={handleRepost} style={styles.actionButton}>
            <Feather name="repeat" size={16} color={isReposted ? "#00ba7c" : "gray"} />
            <Text style={[styles.actionText, { color: isReposted ? "#00ba7c" : "gray" }]}>{repostCount}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
            <Ionicons name={isLiked ? "heart" : "heart-outline"} size={18} color={isLiked ? "#f91880" : "gray"} />
            <Text style={[styles.actionText, { color: isLiked ? "#f91880" : "gray" }]}>{likeCount}</Text>
          </TouchableOpacity>

          <ActionIcon icon="bar-chart-2" count={item.stats.views} />
          <Feather name="share" size={16} color="gray" />
        </View>
      </View>
    </View>
  );
};

// Component ย่อยสำหรับไอคอน
const ActionIcon = ({ icon, count }: { icon: any, count: number }) => (
  <View style={styles.actionButton}>
    <Feather name={icon} size={16} color="gray" />
    <Text style={styles.actionText}>{count}</Text>
  </View>
);

const styles = StyleSheet.create({
  tweetContainer: { flexDirection: 'row', padding: 12, borderBottomWidth: 0.5, borderBottomColor: '#333', backgroundColor: '#000' },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  contentContainer: { flex: 1 },
  tweetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  name: { color: 'white', fontWeight: 'bold', fontSize: 15, flexShrink: 1 },
  username: { color: 'gray', fontSize: 15, flexShrink: 1 },
  tweetText: { color: 'white', fontSize: 15, lineHeight: 20, marginBottom: 10 },
  tweetImage: { width: '100%', borderRadius: 15, marginTop: 5, marginBottom: 10, resizeMode: 'cover', backgroundColor: '#111' },
  actionsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginRight: 20, marginTop: 5 },
  actionButton: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  actionText: { color: 'gray', fontSize: 12 },
});