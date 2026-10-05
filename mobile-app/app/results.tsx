import React from 'react';
import { View, Text, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function ResultsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="px-5 pt-6 pb-4 gap-1">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 -ml-2 items-center justify-center">
            <Text className="text-azure-blue font-label-md">←</Text>
          </TouchableOpacity>
        </View>
        <Text className="font-headline-lg-mobile text-[28px] text-primary">Your Trip Options Are Ready</Text>
        <View className="flex-row items-center gap-2 mt-1">
          <Text className="text-on-surface-variant font-label-md">New York</Text>
          <Text className="text-on-surface-variant font-label-md">→</Text>
          <Text className="text-on-surface-variant font-label-md">Paris</Text>
        </View>
      </View>

      {/* Quick Filters */}
      <View className="w-full px-5 py-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row overflow-visible">
          <TouchableOpacity className="h-10 px-6 rounded-full bg-primary items-center justify-center mr-3 shadow-md">
            <Text className="text-on-primary font-label-md">Recommended</Text>
          </TouchableOpacity>
          <TouchableOpacity className="h-10 px-6 rounded-full bg-azure-blue/10 items-center justify-center mr-3">
            <Text className="text-azure-blue font-label-md">Cheapest</Text>
          </TouchableOpacity>
          <TouchableOpacity className="h-10 px-6 rounded-full bg-azure-blue/10 items-center justify-center mr-3">
            <Text className="text-azure-blue font-label-md">Fastest</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Results List */}
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        <View className="gap-6 pb-12">
          
          {/* Option 1 */}
          <TouchableOpacity 
            activeOpacity={0.9}
            onPress={() => router.push('/trip-details')}
            className="w-full bg-champagne-highlight rounded-xl shadow-lg overflow-hidden border border-outline-variant/30"
          >
            <ImageBackground 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9Y-4dtdcMyS4VnEWqqyjIKZXef12tBt35EzfC_PyjpnIHafbniXvSZXbb0AIUt7hmUYE2S4pVfJ4ngla5FWIPDJoVuYDAPkVSEFMpIYiHqgUlLz3wYtE-EePLkHW8dddwdK3AIIaycAryp65cEeHHB6QzM78I8yRVbGXTE2FWd3CN4vvA57ZQNp4bk6KvkAygjgePnXAvabwFjMMOUj-2xoAk8xzSoc_ILK9jlBBnDFAI6jBeyFzw' }}
              className="w-full h-32 bg-surface-container-high"
            >
              <View className="absolute top-3 left-3 bg-champagne-highlight/90 px-3 py-1 rounded-full flex-row items-center gap-1 shadow-sm">
                <Text className="text-sunset-orange text-xs font-bold">★</Text>
                <Text className="font-label-sm text-primary">Top Pick</Text>
              </View>
            </ImageBackground>

            <View className="p-4 gap-3">
              <View className="flex-row justify-between items-start">
                <View>
                  <Text className="font-headline-md text-xl text-primary">Direct Flight + Hotel</Text>
                  <Text className="font-body-md text-on-surface-variant text-sm">Comfort Choice</Text>
                </View>
                <View className="items-end">
                  <Text className="font-headline-md text-xl text-sunset-orange">$2,450</Text>
                  <Text className="font-label-sm text-on-surface-variant">per person</Text>
                </View>
              </View>

              <View className="flex-row items-center gap-4 mt-1">
                <Text className="text-primary font-label-sm">✈️ 7h 30m</Text>
                <Text className="text-primary font-label-sm">🏨 4 Nights</Text>
              </View>

              <View className="w-full h-[1px] bg-outline-variant/30 my-1" />

              <View className="flex-row justify-between items-center mt-1">
                <View className="flex-row gap-2">
                  <View className="px-2 py-1 bg-azure-blue/10 rounded-full">
                    <Text className="font-label-sm text-azure-blue text-[10px] uppercase tracking-wider">Direct</Text>
                  </View>
                  <View className="px-2 py-1 bg-azure-blue/10 rounded-full">
                    <Text className="font-label-sm text-azure-blue text-[10px] uppercase tracking-wider">Breakfast</Text>
                  </View>
                </View>
                <Text className="text-sunset-orange font-label-md">View Details →</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Option 2 */}
          <TouchableOpacity 
            activeOpacity={0.9}
            onPress={() => router.push('/trip-details')}
            className="w-full bg-champagne-highlight rounded-xl shadow-md overflow-hidden border border-outline-variant/30"
          >
            <ImageBackground 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXNjR1rFxOmgQJW8CGguzEIkWjCuBhoTadbXJDhAXOrZeC6GHUDcTSMl16DcT6rgm8RI-tTNyhH_JnlqTRubIdQEL_gKV7f9h6H5MWc_HYo0PEhbRZpR88vCVrPZhr8kqeilv-dn1LtNO-ZQf3PmOE2XBsgC8vaCjWJzkkGUvH6E0zalhawPV7CCB6UhXGLZxE7k9IryXNRehPqt4mfUf0iMWRsdSxWL8Ia8xOoXO8ojWDrjRjlSJP' }}
              className="w-full h-32 bg-surface-container-high"
            />
            <View className="p-4 gap-3">
              <View className="flex-row justify-between items-start">
                <View>
                  <Text className="font-headline-md text-xl text-primary">1-Stop Flight + Airbnb</Text>
                  <Text className="font-body-md text-on-surface-variant text-sm">Budget Saver</Text>
                </View>
                <View className="items-end">
                  <Text className="font-headline-md text-xl text-primary">$1,850</Text>
                  <Text className="font-label-sm text-on-surface-variant">per person</Text>
                </View>
              </View>

              <View className="flex-row items-center gap-4 mt-1">
                <Text className="text-primary font-label-sm">✈️ 11h 45m</Text>
                <Text className="text-primary font-label-sm">🏠 4 Nights</Text>
              </View>

              <View className="w-full h-[1px] bg-outline-variant/30 my-1" />

              <View className="flex-row justify-between items-center mt-1">
                <View className="flex-row gap-2">
                  <View className="px-2 py-1 bg-azure-blue/10 rounded-full">
                    <Text className="font-label-sm text-azure-blue text-[10px] uppercase tracking-wider">Kitchen</Text>
                  </View>
                </View>
                <Text className="text-sunset-orange font-label-md">View Details →</Text>
              </View>
            </View>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
