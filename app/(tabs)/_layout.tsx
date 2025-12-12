import { useColorScheme } from '@/hooks/use-color-scheme';
import { Tabs } from 'expo-router';
import Navbar from '../components/navbar';

export default function TabsLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false, 
          tabBarStyle: { display: 'none' }, 
        }}
      >
        <Tabs.Screen name="index" />
      </Tabs>

      <Navbar />
    </>
  );
} 