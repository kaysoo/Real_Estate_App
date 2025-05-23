import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import React, { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { getPropertiesById } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { facilities } from "@/constants/data";

const Property = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const windowHeight = Dimensions.get("window").height;

  const {
    data: propertyDetails,
    loading,
    refetch,
  } = useAppwrite({
    fn: getPropertiesById,
    params: {
      id: id!,
    },
  });

  console.log(propertyDetails?.image, typeof propertyDetails, "ididid");
  return (
    <View className="flex-1">
      <ScrollView
        contentContainerClassName=" pb-32"
        showsVerticalScrollIndicator={false}
        className="bg-white"

        // bounces={false}
      >
        <View className="w-full relative" style={{ height: windowHeight / 2 }}>
          <Image
            source={{ uri: propertyDetails?.image }}
            className="size-full "
            resizeMode="cover"
          />
          <Image
            source={images.whiteGradient}
            className="absolute top-0 w-full z-40"
          />
          <View
            className={`${
              Platform.OS === "ios" ? "top-[70px]" : "top-[20px]"
            } absolute inset-x-7 flex flex-row items-center justify-between z-50`}
          >
            <TouchableOpacity
              // onPress={() => router.back()}
              className="size-11 bg-accent-100/50 rounded-full flex flex-row items-center justify-center"
              onPress={() => {
                router.back();
                console.log("first");
              }}
            >
              <Image source={icons.backArrow} className="size-7" />
            </TouchableOpacity>
            <View className="flex flex-row items-center gap-5">
              <TouchableOpacity className="size-11 bg-accent-100/50 rounded-full flex flex-row items-center justify-center">
                <Image source={icons.heart} className="size-7 " />
              </TouchableOpacity>

              <TouchableOpacity className="size-11 bg-accent-100/50 rounded-full flex flex-row items-center justify-center">
                <Image source={icons.send} className="size-7" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="flex flex-col px-5 mt-5 gap-5">
          {/* property details side  */}
          <View className="flex flex-col gap-3">
            <Text className="text-2xl font-rubik-bold text-black-300">
              {propertyDetails?.name}
            </Text>
            <View className="ml-3 flex flex-row items-center justify-start gap-4">
              <Text className="text-primary-300 font-rubik-medium">
                {propertyDetails?.type}
              </Text>
              <View className="flex flex-row items-center justify-start gap-2">
                <Image source={icons.star} className="size-5" />
                <Text className="font-rubik-medium text-black-200">
                  {`${propertyDetails?.rating} (${propertyDetails?.reviews.length} reviews)`}
                </Text>
              </View>
            </View>
            <View className=" ml-3 flex flex-row items-center justify-between ">
              <View className="flex flex-row items-center gap-4">
                <Image source={icons.bed} className="size-5" />
                <Text className="font-rubik-semibold text-medium">
                  {propertyDetails?.bedrooms} rooms
                </Text>
              </View>
              <View className="flex flex-row items-center gap-4">
                <Image source={icons.bath} className="size-5" />
                <Text className="font-rubik-semibold text-medium">
                  {propertyDetails?.bathrooms} bath(s)
                </Text>
              </View>
              <View className="flex flex-row items-center gap-4">
                <Image source={icons.area} className="size-5" />
                <Text className="font-rubik-semibold text-medium">
                  {propertyDetails?.area} sqft
                </Text>
              </View>
            </View>
          </View>
          {/* agent side  */}
          <View className="flex flex-col gap-3 border-t border-primary-200">
            <Text className="text-2xl font-rubik-semibold  text-black-300">
              Agent
            </Text>
            <View className="ml-3 flex flex-row justify-between items-center">
              <View className="flex flex-row items-center justify-start gap-3">
                <Image
                  source={{ uri: propertyDetails?.agent.avatar }}
                  className="size-12 rounded-full"
                />
                <View>
                  <Text className="font-rubik-bold text-xl text-black-300">
                    {propertyDetails?.agent.name}
                  </Text>
                  <Text className="font-rubik-medium text-black-200">
                    Owner
                  </Text>
                </View>
              </View>
              <View className="flex flex-row gap-5">
                <Image source={icons.chat} className="size-7" />
                <Image source={icons.phone} className="size-7" />
              </View>
            </View>
          </View>
          {/* overview side  */}
          <View className="flex flex-col gap-3 border-t border-primary-200">
            <Text className="text-2xl font-rubik-semibold  text-black-300">
              Overview
            </Text>
            <Text className="font-rubik text-black-200">
              {propertyDetails?.description}
            </Text>
          </View>
          {/* facilities side  */}
          <View className="flex flex-col gap-3 border-t border-primary-200">
            <Text className="text-2xl font-rubik-semibold  text-black-300">
              Facilities
            </Text>
            <View className="flex flex-row items-center justify-between gap-3 flex-wrap ">
              {propertyDetails?.facilities.map(
                (item: string, index: number) => {
                  const facility = facilities.find(
                    (facility) =>
                      facility.title.toLowerCase() === item.toLowerCase()
                  );
                  return (
                    <View
                      key={index}
                      className="flex flex-col items-center justify-center rounded-full p-2 gap-1"
                    >
                      <View className="bg-primary-100 rounded-full p-2">
                        <Image source={facility?.icon} className="size-10  " />
                      </View>
                      <Text className="font-rubik">{facility?.title}</Text>
                    </View>
                  );
                }
              )}
            </View>
          </View>
        </View>
        {/* </View> */}
      </ScrollView>
    </View>
  );
};

export default Property;
