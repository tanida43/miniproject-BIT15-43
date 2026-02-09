import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function ComposeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams(); 

  // State สำหรับเก็บข้อมูล input
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // ตรวจสอบว่ามี ID ส่งมาไหม? ถ้ามีแสดงว่ากำลัง "แก้ไข"
  const isEditing = !!params.id;

  useEffect(() => {
    if (isEditing) {
      setContent(params.content as string);
      setImageUrl(params.image as string || '');
    }
  }, [params]);

  const handleSave = async () => {
    if (!content.trim()) {
      Alert.alert('แจ้งเตือน', 'กรุณาใส่ข้อความก่อนโพสต์');
      return;
    }

    try {
      // 1. ดึงข้อมูลเก่าจากเครื่อง
      const existingData = await AsyncStorage.getItem('tweets');
      let tweets = existingData ? JSON.parse(existingData) : [];

      if (isEditing) {
        // --- กรณีแก้ไข (Update) ---
        tweets = tweets.map((t: any) => 
          t.id === params.id 
            ? { ...t, content, image: imageUrl } // อัปเดตข้อมูลใหม่
            : t
        );
      } else {
        // --- กรณีเพิ่มใหม่ (Create) ---
        const newTweet = {
          id: Date.now().toString(), // ใช้เวลาปัจจุบันเป็น ID
          user: {
            name: 'Me', 
            username: '@my_account',
            avatar: 'https://pbs.twimg.com/profile_images/1938801529026412544/vX8IhCj3_400x400.png'
          },
          content: content,
          image: imageUrl,
          time: 'Now',
          stats: { replies: 0, retweets: 0, likeCount: 0, views: 0 },
        };
        tweets.unshift(newTweet); // ใส่ไว้บนสุด
      }

      // 2. บันทึกกลับลงเครื่อง
      await AsyncStorage.setItem('tweets', JSON.stringify(tweets));
      
      router.back(); // ปิดหน้านี้
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'บันทึกข้อมูลไม่สำเร็จ');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.cancelText}>ยกเลิก</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postButton} onPress={handleSave}>
          <Text style={styles.postButtonText}>{isEditing ? 'แก้ไข' : 'โพสต์'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Image 
          source={{ uri: 'https://pbs.twimg.com/profile_images/1938801529026412544/vX8IhCj3_400x400.png' }} 
          style={styles.avatar} 
        />
        <View style={{ flex: 1 }}>
            <TextInput
                style={styles.input}
                placeholder="มีอะไรเกิดขึ้นบ้าง?"
                placeholderTextColor="#536471"
                multiline
                autoFocus
                value={content}
                onChangeText={setContent}
            />
            {/* Input สำหรับใส่ Link รูปภาพ */}
            <TextInput
                style={styles.linkInput}
                placeholder="วางลิงก์รูปภาพ (Optional)"
                placeholderTextColor="#536471"
                value={imageUrl}
                onChangeText={setImageUrl}
            />
            {imageUrl ? (
                <Image source={{ uri: imageUrl }} style={styles.previewImage} />
            ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', paddingTop: 20 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333'
  },
  cancelText: { color: 'white', fontSize: 16 },
  postButton: {
    backgroundColor: '#1d9bf0',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 20,
  },
  postButtonText: { color: 'white', fontWeight: 'bold' },
  inputContainer: { flexDirection: 'row', padding: 15 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  input: { color: 'white', fontSize: 18, textAlignVertical: 'top', marginBottom: 10 },
  linkInput: { color: '#1d9bf0', fontSize: 14, paddingVertical: 5 },
  previewImage: { width: '100%', height: 200, borderRadius: 10, marginTop: 10, resizeMode: 'cover' }
});