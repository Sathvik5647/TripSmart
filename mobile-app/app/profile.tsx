import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      <StatusBar style="dark" />
      <View className="px-5 pt-4 pb-2 flex-row items-center justify-between border-b border-surface-variant">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 -ml-2 items-center justify-center">
          <Text className="text-azure-blue font-label-md">←</Text>
        </TouchableOpacity>
        <Text className="font-headline-md text-xl text-on-background">Profile</Text>
        <View className="w-10 h-10" />
      </View>

      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
        <View className="items-center mb-8">
          <View className="w-24 h-24 rounded-full bg-azure-blue/20 items-center justify-center mb-4">
            <Text className="text-4xl">👤</Text>
          </View>
          <Text className="font-headline-md text-2xl text-on-background">Jane Doe</Text>
          <Text className="font-body-md text-on-surface-variant mt-1">jane.doe@example.com</Text>
        </View>

        <View className="gap-4">
          <Text className="font-label-sm text-on-surface-variant uppercase tracking-widest ml-2">Account Settings</Text>
          
          <View className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 overflow-hidden shadow-sm">
            <TouchableOpacity className="p-4 flex-row justify-between items-center border-b border-outline-variant/20">
              <Text className="font-body-md text-on-background">Personal Information</Text>
              <Text className="text-on-surface-variant text-lg">›</Text>
            </TouchableOpacity>
            <TouchableOpacity className="p-4 flex-row justify-between items-center border-b border-outline-variant/20">
              <Text className="font-body-md text-on-background">Travel Preferences</Text>
              <Text className="text-on-surface-variant text-lg">›</Text>
            </TouchableOpacity>
            <TouchableOpacity className="p-4 flex-row justify-between items-center">
              <Text className="font-body-md text-on-background">Payment Methods</Text>
              <Text className="text-on-surface-variant text-lg">›</Text>
            </TouchableOpacity>
          </View>

          <Text className="font-label-sm text-on-surface-variant uppercase tracking-widest ml-2 mt-4">Support</Text>
          
          <View className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 overflow-hidden shadow-sm">
            <TouchableOpacity className="p-4 flex-row justify-between items-center border-b border-outline-variant/20">
              <Text className="font-body-md text-on-background">Help Center</Text>
              <Text className="text-on-surface-variant text-lg">›</Text>
            </TouchableOpacity>
            <TouchableOpacity className="p-4 flex-row justify-between items-center">
              <Text className="font-body-md text-on-background">Contact Us</Text>
              <Text className="text-on-surface-variant text-lg">›</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity className="mt-8 p-4 bg-error-container rounded-xl items-center justify-center shadow-sm">
            <Text className="font-label-md text-on-error-container font-bold">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
