import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// รูปโปรไฟล์ของเรา (Mock)
const MY_AVATAR = 'https://pbs.twimg.com/profile_images/1938801529026412544/vX8IhCj3_400x400.png';

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
      // ถ้าเป็นการแก้ไข ให้ดึงข้อมูลเดิมมาแสดง
      setContent(params.content as string || '');
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
        // ค้นหาโพสต์เดิมแล้วอัปเดตข้อมูล
        tweets = tweets.map((t: any) => 
          t.id === params.id 
            ? { ...t, content: content, image: imageUrl } // อัปเดตเนื้อหาและรูป
            : t
        );
      } else {
        // --- กรณีเพิ่มใหม่ (Create) ---
        const newTweet = {
          id: Date.now().toString(), // ใช้เวลาปัจจุบันเป็น ID
          user: {
            name: 'Me', 
            username: '@my_account',
            avatar: MY_AVATAR
          },
          content: content,
          image: imageUrl,
          time: 'Now',
          stats: { replies: 0, retweets: 0, likeCount: 0, views: 0 },
          
          // *** สำคัญ: ระบุว่าเป็นโพสต์ของเรา เพื่อให้ลบได้ ***
          isMyPost: true 
        };
        
        // ใส่โพสต์ใหม่ไว้บนสุด
        tweets.unshift(newTweet); 
      }

      // 2. บันทึกกลับลงเครื่อง
      await AsyncStorage.setItem('tweets', JSON.stringify(tweets));
      
      // 3. ปิดหน้านี้
      router.back(); 
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'บันทึกข้อมูลไม่สำเร็จ');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header (ปุ่มยกเลิก และ ปุ่มโพสต์) */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.cancelText}>ยกเลิก</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.postButton, !content.trim() && styles.disabledButton]} 
          onPress={handleSave}
          disabled={!content.trim()}
        >
          <Text style={styles.postButtonText}>
            {isEditing ? 'แก้ไข' : 'โพสต์'}
          </Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.contentContainer}>
            <View style={styles.inputWrapper}>
                {/* รูปโปรไฟล์ */}
                <Image source={{ uri: MY_AVATAR }} style={styles.avatar} />
                
                <View style={{ flex: 1 }}>
                    {/* ช่องพิมพ์ข้อความ */}
                    <TextInput
                        style={styles.input}
                        placeholder="มีอะไรเกิดขึ้นบ้าง?"
                        placeholderTextColor="#536471"
                        multiline
                        autoFocus
                        value={content}
                        onChangeText={setContent}
                    />
                    
                    {/* ช่องใส่ลิงก์รูปภาพ */}
                    <TextInput
                        style={styles.linkInput}
                        placeholder="วางลิงก์รูปภาพ (Optional)"
                        placeholderTextColor="#536471"
                        value={imageUrl}
                        onChangeText={setImageUrl}
                        autoCapitalize="none"
                    />

                    {/* แสดงตัวอย่างรูปภาพ (ถ้ามี) */}
                    {imageUrl ? (
                        <Image 
                            source={{ uri: imageUrl }} 
                            style={styles.previewImage} 
                            resizeMode="cover"
                        />
                    ) : null}
                </View>
            </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', paddingTop: 40 }, // เพิ่ม Top ให้พ้น Status Bar
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333'
  },
  cancelText: { color: 'white', fontSize: 16 },
  postButton: {
    backgroundColor: '#1d9bf0',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  disabledButton: {
    backgroundColor: '#0f4e78', // สีจางลงเมื่อไม่มีข้อความ
  },
  postButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  
  contentContainer: { flex: 1 },
  inputWrapper: { flexDirection: 'row', padding: 15 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  
  input: { 
    color: 'white', 
    fontSize: 18, 
    textAlignVertical: 'top', 
    marginBottom: 15,
    minHeight: 100
  },
  linkInput: { 
    color: '#1d9bf0', 
    fontSize: 14, 
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
    marginBottom: 10
  },
  previewImage: { 
    width: '100%', 
    height: 200, 
    borderRadius: 12, 
    marginTop: 10,
    backgroundColor: '#111' 
  }
});