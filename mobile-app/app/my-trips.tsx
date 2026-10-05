import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function MyTripsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      <StatusBar style="dark" />
      <View className="px-5 pt-4 pb-2 flex-row items-center justify-between border-b border-surface-variant">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 -ml-2 items-center justify-center">
          <Text className="text-azure-blue font-label-md">←</Text>
        </TouchableOpacity>
        <Text className="font-headline-md text-xl text-on-background">My Trips</Text>
        <View className="w-10 h-10" />
      </View>

      <View className="px-5 py-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
          <TouchableOpacity className="h-10 px-6 rounded-full bg-primary items-center justify-center mr-3">
            <Text className="text-on-primary font-label-md">Upcoming</Text>
          </TouchableOpacity>
          <TouchableOpacity className="h-10 px-6 rounded-full bg-azure-blue/10 items-center justify-center mr-3">
            <Text className="text-azure-blue font-label-md">Past</Text>
          </TouchableOpacity>
          <TouchableOpacity className="h-10 px-6 rounded-full bg-azure-blue/10 items-center justify-center mr-3">
            <Text className="text-azure-blue font-label-md">Saved Drafts</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView className="flex-1 px-5 pt-2" showsVerticalScrollIndicator={false}>
        <View className="gap-6 pb-12">
          
          <TouchableOpacity 
            activeOpacity={0.9}
            onPress={() => router.push('/trip-details')}
            className="w-full bg-champagne-highlight rounded-xl shadow-md overflow-hidden border border-outline-variant/30"
          >
            <ImageBackground 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_Tjypzu4zBpHFik4_uBaz_qX-wtq8Mjslv0OIbLadXkIaRyioa6yH-UiXV0_fVp0FSPFJ-huGAmxnYL2zgEYtR9zHgmbfwtabF-IErrW377xzKKa8lpZD0sMYe2vZyZL7inzRM7v8hdDCjm6ieuAonmRifWJ1GIxrQffJ9tLDosmc855DXvN4F3VkEa9V16eILudNPP5CLAdc5TIc7nxQAYJOeluYTjNl3CGcmec9Y5C3zhJp_H1A' }}
              className="w-full h-32 bg-surface-container-high justify-end p-4"
            >
              <View className="absolute inset-0 bg-black/30" />
              <View className="flex-row items-center gap-2 mb-1">
                <Text className="font-headline-md text-xl text-white">Goa Bound</Text>
              </View>
              <Text className="font-label-sm text-white/90">2026-09-08 • 10 Days</Text>
            </ImageBackground>
            <View className="p-4 flex-row justify-between items-center">
              <View>
                <Text className="font-body-md text-sm text-on-surface-variant">Mumbai → Goa</Text>
                <Text className="font-label-md text-primary mt-1">₹24,920</Text>
              </View>
              <TouchableOpacity className="px-4 py-2 bg-azure-blue/10 rounded-full">
                <Text className="text-azure-blue font-label-sm">View Details</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
