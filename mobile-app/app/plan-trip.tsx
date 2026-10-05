import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function PlanTripScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    travelers: '1',
    budget: '25000',
    tripType: 'tour'
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else router.push('/results');
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      <StatusBar style="dark" />
      <View className="px-5 py-4 flex-row items-center justify-between border-b border-surface-variant">
        <TouchableOpacity onPress={() => step > 1 ? setStep(step - 1) : router.back()}>
          <Text className="text-azure-blue font-label-md">Back</Text>
        </TouchableOpacity>
        <Text className="font-headline-md text-lg text-on-background">Plan Your Trip</Text>
        <Text className="text-on-surface-variant font-label-sm">Step {step}/3</Text>
      </View>

      <ScrollView className="flex-1 px-5 py-6">
        {step === 1 && (
          <View className="gap-6 animate-fade-in">
            <View className="gap-2">
              <Text className="font-headline-md text-2xl text-on-background">Where to?</Text>
              <Text className="font-body-md text-on-surface-variant">Enter your origin and destination.</Text>
            </View>
            
            <View className="gap-4">
              <View className="gap-1.5">
                <Text className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest">Origin</Text>
                <TextInput 
                  className="w-full h-14 px-4 bg-surface-container-lowest border border-outline-variant rounded-xl font-body-md text-on-background"
                  placeholder="e.g. New York"
                  value={formData.origin}
                  onChangeText={(t) => setFormData({...formData, origin: t})}
                />
              </View>
              <View className="gap-1.5">
                <Text className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest">Destination</Text>
                <TextInput 
                  className="w-full h-14 px-4 bg-surface-container-lowest border border-outline-variant rounded-xl font-body-md text-on-background"
                  placeholder="e.g. Paris"
                  value={formData.destination}
                  onChangeText={(t) => setFormData({...formData, destination: t})}
                />
              </View>
              <View className="gap-1.5 mt-2">
                <Text className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest">Travelers</Text>
                <View className="flex-row gap-4">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <TouchableOpacity 
                      key={num}
                      onPress={() => setFormData({...formData, travelers: String(num)})}
                      className={`w-12 h-12 rounded-full items-center justify-center border ${formData.travelers === String(num) ? 'bg-azure-blue border-azure-blue' : 'bg-surface-container-lowest border-outline-variant'}`}
                    >
                      <Text className={`font-label-md ${formData.travelers === String(num) ? 'text-on-primary' : 'text-on-background'}`}>{num}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </View>
        )}

        {step === 2 && (
          <View className="gap-6 animate-fade-in">
            <View className="gap-2">
              <Text className="font-headline-md text-2xl text-on-background">Trip Style</Text>
              <Text className="font-body-md text-on-surface-variant">How do you prefer to travel?</Text>
            </View>
            
            <View className="gap-4">
              <TouchableOpacity 
                onPress={() => setFormData({...formData, tripType: 'tour'})}
                className={`p-5 rounded-2xl border ${formData.tripType === 'tour' ? 'border-azure-blue bg-azure-blue/5' : 'border-outline-variant bg-surface-container-lowest'}`}
              >
                <Text className={`font-headline-md text-lg ${formData.tripType === 'tour' ? 'text-azure-blue' : 'text-on-background'}`}>Guided Tour</Text>
                <Text className="font-body-md text-sm text-on-surface-variant mt-1">Include daily activities, sightseeing, and a structured itinerary.</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={() => setFormData({...formData, tripType: 'direct'})}
                className={`p-5 rounded-2xl border ${formData.tripType === 'direct' ? 'border-azure-blue bg-azure-blue/5' : 'border-outline-variant bg-surface-container-lowest'}`}
              >
                <Text className={`font-headline-md text-lg ${formData.tripType === 'direct' ? 'text-azure-blue' : 'text-on-background'}`}>Direct Travel</Text>
                <Text className="font-body-md text-sm text-on-surface-variant mt-1">Just book my transport and stay. I'll figure out the rest.</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {step === 3 && (
          <View className="gap-6 animate-fade-in">
            <View className="gap-2">
              <Text className="font-headline-md text-2xl text-on-background">Budget</Text>
              <Text className="font-body-md text-on-surface-variant">What is your total budget?</Text>
            </View>
            
            <View className="gap-4 mt-4 items-center">
              <Text className="font-headline-xl text-5xl text-azure-blue">${formData.budget}</Text>
              <Text className="font-body-md text-on-surface-variant">Per person</Text>
              
              <View className="w-full flex-row justify-between px-4 mt-8">
                <TouchableOpacity 
                  onPress={() => setFormData({...formData, budget: String(Math.max(500, parseInt(formData.budget) - 500))})}
                  className="w-16 h-16 rounded-full bg-surface-container-lowest border border-outline-variant items-center justify-center shadow-sm"
                >
                  <Text className="font-headline-md text-2xl text-on-background">-</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => setFormData({...formData, budget: String(parseInt(formData.budget) + 500)})}
                  className="w-16 h-16 rounded-full bg-surface-container-lowest border border-outline-variant items-center justify-center shadow-sm"
                >
                  <Text className="font-headline-md text-2xl text-on-background">+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      <View className="p-5 bg-background border-t border-surface-variant">
        <TouchableOpacity 
          onPress={handleNext}
          className="w-full h-14 bg-azure-blue rounded-lg items-center justify-center shadow-lg shadow-azure-blue/20"
        >
          <Text className="font-label-md text-sm text-on-primary font-bold">
            {step === 3 ? 'Generate Itinerary' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
