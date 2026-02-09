import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; 

const { Navigator } = createMaterialTopTabNavigator();
const MaterialTopTabs = withLayoutContext(Navigator);

export default function TabLayout() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Custom Header */}
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://pbs.twimg.com/profile_images/1938801529026412544/vX8IhCj3_400x400.png' }} 
          style={styles.headerAvatar} 
        />
        <Text style={styles.logo}>𝕏</Text>
        <View style={{ flexDirection: 'row', gap: 15 }}>
          <TouchableOpacity onPress={() => router.push('/search')}>
             <Ionicons name="search" size={24} color="white" />
          </TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="white" />
        </View>
      </View>

      <MaterialTopTabs
        screenOptions={{
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: '#71767b',
          tabBarLabelStyle: { fontSize: 15, fontWeight: 'bold', textTransform: 'none' },
          tabBarIndicatorStyle: {
            backgroundColor: '#1d9bf0', height: 3, borderRadius: 3, width: '40%', left: '30%', 
          },
          tabBarStyle: { backgroundColor: '#000', borderBottomWidth: 0.5, borderBottomColor: '#333' },
        }}
      >
        <MaterialTopTabs.Screen name="index" options={{ title: 'สำหรับคุณ' }} />
        <MaterialTopTabs.Screen name="Following" options={{ title: 'กำลังติดตาม' }} />
      </MaterialTopTabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 15, paddingVertical: 10, backgroundColor: '#000',
  },
  headerAvatar: { width: 32, height: 32, borderRadius: 16 },
  logo: { fontSize: 24, color: 'white', fontWeight: 'bold' },
});