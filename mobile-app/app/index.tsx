import React from 'react';
import { View, Text, ScrollView, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function LandingScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="light" />
      <ScrollView className="flex-1" bounces={false} showsVerticalScrollIndicator={false}>
        
        {/* Hero Section */}
        <ImageBackground 
          source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4_0IMEa7wrHDycrcP2b8m7sUguAk7e6aQrwDD59QifaEGMLUrUjaKeOjCV3uNe2uQ1D6YHFqX19TVeLlkUQ9dAjmq4tcVmm2aFkxvLzKeBwio-8o_9rzsxSwI7k-Q6_RZlrPTwRATok9MKqPzLC7AU6APR8wTB2SPy3egDRGVkBz9Hs7U1C-U60MYQQIQQ-Y9jBAlp8P1zW9RiAJ4YIvSItzgtJRHkhy4v4KRbkwPcVNzBxL3aA93' }}
          className="w-full h-[600px] justify-end"
        >
          <View className="absolute inset-0 bg-deep-midnight/60" />
          
          <SafeAreaView edges={['top']} className="absolute top-0 w-full z-50">
            <View className="h-16 px-5 flex-row items-center justify-between">
              <Text className="font-headline-md text-2xl text-primary tracking-tight bg-white/80 px-2 py-1 rounded">TRIPSMART</Text>
            </View>
          </SafeAreaView>

          <View className="p-5 z-10 gap-6 pb-12">
            <View className="gap-1">
              <Text className="font-label-sm text-xs tracking-widest uppercase text-tertiary-fixed-dim">Your Personal Concierge</Text>
              <Text className="font-headline-xl text-[40px] text-on-primary leading-tight">
                Plan Smarter.{'\n'}
                <Text className="text-champagne-highlight italic font-light">Travel Better.</Text>
              </Text>
            </View>
            <Text className="font-body-md text-base text-inverse-primary max-w-[280px]">
              Curated itineraries tailored to your taste, generated in seconds.
            </Text>
            
            <View className="gap-3 mt-2">
              <TouchableOpacity 
                onPress={() => router.push('/plan-trip')}
                className="w-full h-14 bg-azure-blue rounded-lg items-center justify-center shadow-lg shadow-azure-blue/20"
              >
                <Text className="font-label-md text-sm text-on-primary font-bold">Start Planning</Text>
              </TouchableOpacity>
              <TouchableOpacity className="w-full h-14 bg-transparent border-[1.5px] border-surface-container-high rounded-lg items-center justify-center">
                <Text className="font-label-md text-sm text-on-primary font-bold">How it works</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        {/* The Process */}
        <View className="w-full px-5 py-12 gap-6 bg-warm-sand">
          <View className="items-center text-center gap-1 mb-4">
            <Text className="font-label-sm text-xs text-sunset-orange tracking-widest uppercase">The Process</Text>
            <Text className="font-headline-md text-2xl text-on-background">Effortless Journeys</Text>
          </View>
          
          <View className="gap-6 relative">
            <View className="absolute left-6 top-8 bottom-8 w-[2px] bg-surface-variant z-0" />
            
            {[
              { num: '01', title: 'Tell us where', desc: 'Input your destination, dates, and travel style. We handle the complex logistics.', active: false },
              { num: '02', title: 'We plan in seconds', desc: 'Our intelligence engine cross-references millions of data points to craft the perfect route.', active: false },
              { num: '03', title: 'Refine and go', desc: 'Tweak the details, book seamlessly, and enjoy a beautifully formatted itinerary.', active: true },
            ].map((step, idx) => (
              <View key={idx} className="flex-row gap-4 items-start z-10">
                <View className={`w-12 h-12 rounded-full items-center justify-center border ${step.active ? 'bg-azure-blue border-azure-blue' : 'bg-champagne-highlight border-surface-variant'}`}>
                  <Text className={`font-headline-md text-lg ${step.active ? 'text-on-primary' : 'text-azure-blue'}`}>{step.num}</Text>
                </View>
                <View className="flex-1 pt-1">
                  <Text className={`font-label-md text-sm font-bold ${step.active ? 'text-azure-blue' : 'text-on-background'}`}>{step.title}</Text>
                  <Text className="font-body-md text-sm text-on-surface-variant mt-1 leading-5">{step.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Popular Journeys */}
        <View className="w-full px-5 py-12 gap-6 bg-champagne-highlight rounded-t-3xl -mt-6">
          <View className="flex-row justify-between items-end mb-2">
            <View className="gap-1">
              <Text className="font-label-sm text-xs text-sunset-orange tracking-widest uppercase">Inspiration</Text>
              <Text className="font-headline-md text-2xl text-on-background">Popular Journeys</Text>
            </View>
            <TouchableOpacity>
              <Text className="font-label-sm text-sm text-sunset-orange font-bold">View All</Text>
            </TouchableOpacity>
          </View>

          <View className="gap-6">
            <View className="w-full rounded-2xl bg-surface-container-lowest overflow-hidden shadow-sm">
              <ImageBackground 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_tOF30H5LWsNP79ncC8wJ_TU_BkbG0vfM9T349v3meCt_fkkisPFrY9QoCWtuXwgxGMP30Y3poHYCsCavZhzwn4FGWLgqVv7ZBkETn1BfHqI6tvuoSsRPCnpMA-ClSv1PAeSsTQnGK_t4-eaFdlqmLPy9eAAJ7Te76HhZ1hyO7vv7HPZ6A7kmveyspt_SpFo8V5m0qc0azg22sooqWccq-PHn2XZytOa_5-mhVCM-kVvPpUNknLmx' }}
                className="w-full h-48"
              >
                <View className="absolute top-4 right-4 bg-white/90 px-3 py-1.5 rounded-full flex-row items-center gap-1">
                  <Text className="text-sunset-orange text-xs font-bold">★ 4.9</Text>
                </View>
              </ImageBackground>
              <View className="p-4 gap-3">
                <View className="flex-row justify-between items-start">
                  <View>
                    <Text className="font-headline-md text-xl text-on-background">Ubud Retreat</Text>
                    <Text className="font-body-md text-sm text-on-surface-variant">Bali, Indonesia</Text>
                  </View>
                  <Text className="font-label-md text-sm text-azure-blue font-bold">$1,250</Text>
                </View>
              </View>
            </View>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}
