import React from 'react';
import { View, Text, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function TripDetailsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="h-14 px-5 flex-row items-center gap-4 bg-warm-sand/90 border-b border-outline-variant/20">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 -ml-2 items-center justify-center">
          <Text className="text-primary font-label-md">←</Text>
        </TouchableOpacity>
        <Text className="font-headline-md text-xl text-primary">Trip Detail</Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-5 py-6 gap-6">
          
          {/* Trip Header Section */}
          <View className="gap-4">
            <View className="flex-row items-center justify-between">
              <View>
                <View className="flex-row items-center gap-2 mb-1">
                  <Text className="font-headline-xl text-[32px] text-on-background">Goa Bound</Text>
                </View>
                <View className="flex-row items-center gap-2 text-on-surface-variant font-label-md">
                  <Text>📍 Mumbai → Goa</Text>
                </View>
              </View>
              <View className="items-end">
                <Text className="font-headline-lg text-2xl text-primary">₹24,920</Text>
                <Text className="font-label-sm text-on-surface-variant">Total cost</Text>
              </View>
            </View>

            {/* Quick Stats */}
            <View className="flex-row gap-4 mb-2">
              <Text className="text-on-surface-variant font-label-sm">⏱️ 10 days</Text>
              <Text className="text-on-surface-variant font-label-sm">👤 1 traveler</Text>
            </View>

            {/* Action Buttons */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row overflow-visible pb-2">
              <TouchableOpacity className="h-10 px-4 rounded-full bg-champagne-highlight border border-primary/10 flex-row items-center gap-2 mr-3 shadow-sm">
                <Text className="text-primary font-label-md">Share</Text>
              </TouchableOpacity>
              <TouchableOpacity className="h-10 px-4 rounded-full bg-champagne-highlight border border-primary/10 flex-row items-center gap-2 mr-3 shadow-sm">
                <Text className="text-primary font-label-md">Export</Text>
              </TouchableOpacity>
              <TouchableOpacity className="h-10 px-4 rounded-full bg-champagne-highlight border border-primary/10 flex-row items-center gap-2 mr-3 shadow-sm">
                <Text className="text-primary font-label-md">Customize</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* Map Preview */}
          <View className="w-full h-48 rounded-xl overflow-hidden shadow-md relative">
            <ImageBackground 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_Tjypzu4zBpHFik4_uBaz_qX-wtq8Mjslv0OIbLadXkIaRyioa6yH-UiXV0_fVp0FSPFJ-huGAmxnYL2zgEYtR9zHgmbfwtabF-IErrW377xzKKa8lpZD0sMYe2vZyZL7inzRM7v8hdDCjm6ieuAonmRifWJ1GIxrQffJ9tLDosmc855DXvN4F3VkEa9V16eILudNPP5CLAdc5TIc7nxQAYJOeluYTjNl3CGcmec9Y5C3zhJp_H1A' }}
              className="w-full h-full bg-cover bg-center"
            >
              <View className="absolute inset-0 bg-black/20" />
              <View className="absolute bottom-3 left-3 flex-row items-center gap-1 drop-shadow-md">
                <Text className="text-white font-label-md font-bold">🗺️ View Route</Text>
              </View>
            </ImageBackground>
          </View>

          {/* Day Navigation */}
          <View className="py-2">
            <Text className="font-headline-md text-xl text-on-background mb-3">Itinerary</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
              {['Day 1', 'Day 2', 'Day 3', 'Day 4'].map((day, idx) => (
                <TouchableOpacity 
                  key={idx}
                  className={`h-10 px-5 rounded-full items-center justify-center mr-2 ${idx === 1 ? 'bg-primary' : 'bg-surface-container-high'}`}
                >
                  <Text className={`font-label-md ${idx === 1 ? 'text-on-primary' : 'text-on-surface-variant'}`}>{day}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Timeline Content */}
          <View className="relative">
            <View className="absolute left-[23px] top-2 bottom-4 w-px bg-primary/10" />
            
            <View className="mb-6">
              <Text className="font-headline-lg-mobile text-[22px] text-on-background">Day 2 — Explore Goa</Text>
              <Text className="font-body-md text-on-surface-variant mt-1">2026-09-08</Text>
            </View>

            <View className="gap-6">
              {/* Timeline Item 1 */}
              <View className="flex-row gap-4">
                <View className="w-12 h-12 rounded-full bg-champagne-highlight border border-primary/20 items-center justify-center shadow-sm mt-1 z-10">
                  <Text className="text-primary text-lg">🍳</Text>
                </View>
                <View className="flex-1 bg-champagne-highlight/80 rounded-xl p-4 shadow-sm border border-primary/5">
                  <View className="flex-row justify-between items-start mb-1">
                    <Text className="font-headline-md text-[18px] text-on-background flex-1">Breakfast at hotel</Text>
                    <View className="items-end">
                      <Text className="font-label-sm text-on-surface-variant">08:00</Text>
                      <Text className="font-label-md text-primary mt-0.5">₹0</Text>
                    </View>
                  </View>
                  <Text className="font-body-md text-on-surface-variant text-[14px]">Included in stay.</Text>
                </View>
              </View>

              {/* Timeline Item 2 */}
              <View className="flex-row gap-4">
                <View className="w-12 h-12 rounded-full bg-champagne-highlight border border-primary/20 items-center justify-center shadow-sm mt-1 z-10">
                  <Text className="text-primary text-lg">📸</Text>
                </View>
                <View className="flex-1 bg-champagne-highlight/80 rounded-xl p-4 shadow-sm border border-primary/5">
                  <View className="flex-row justify-between items-start mb-1">
                    <View className="flex-1">
                      <Text className="font-headline-md text-[18px] text-on-background">Local sightseeing</Text>
                      <View className="self-start bg-surface-container-high px-2 py-0.5 rounded-full mt-1">
                        <Text className="text-on-surface-variant font-label-sm text-[10px]">Free entry</Text>
                      </View>
                    </View>
                    <View className="items-end">
                      <Text className="font-label-sm text-on-surface-variant">09:00 - 12:00</Text>
                      <Text className="font-label-md text-primary mt-0.5">₹0</Text>
                    </View>
                  </View>
                  <Text className="font-body-md text-on-surface-variant text-[14px] mt-2">Visit Aguada Fort and surrounding beaches.</Text>
                  <ImageBackground 
                    source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0HeQJ__n-ad08isZsMDhVvbkanY7SLP0EhXAeuc4NWfwzHSp8Rcwu01D0nSM_0FcfxCNqd_RQZ3XEqm5eDiR3UZxWTrCo8xeXhFFgGzZJnK2LsV0QtIO0EHquI5-LZdxLprfD9oqgIWaqSd4IztVxIqgAJ_5uhJonjiAHcNGctqp-JGWBvFAFxS23mJWJYYLgjbeUl1jNdjWKWNX22JF3xsRS1oEAYOlxsvo-nbWoILV0nMv0ZcoY' }}
                    className="w-full h-24 rounded-lg mt-3 overflow-hidden bg-surface-container-high"
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Price Breakdown Card */}
          <View className="mt-8 mb-8 bg-champagne-highlight rounded-2xl p-5 shadow-sm border border-primary/5">
            <Text className="font-headline-md text-lg text-on-background mb-6">Price Breakdown</Text>
            
            <View className="gap-5">
              <View>
                <View className="flex-row justify-between items-end mb-1">
                  <Text className="font-label-md text-on-background">Transport</Text>
                  <Text className="font-label-md text-on-background">₹530</Text>
                </View>
                <View className="w-full bg-surface-container-high rounded-full h-2 overflow-hidden">
                  <View className="bg-primary h-full rounded-full" style={{ width: '2%' }} />
                </View>
                <Text className="font-label-sm text-on-surface-variant mt-1 block">2% of total</Text>
              </View>

              <View>
                <View className="flex-row justify-between items-end mb-1">
                  <Text className="font-label-md text-on-background">Accommodation</Text>
                  <Text className="font-label-md text-on-background">₹18,540</Text>
                </View>
                <View className="w-full bg-surface-container-high rounded-full h-2 overflow-hidden">
                  <View className="bg-sunset-orange h-full rounded-full" style={{ width: '74%' }} />
                </View>
                <Text className="font-label-sm text-on-surface-variant mt-1 block">74% of total</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
