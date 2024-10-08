
import { View, Text, SafeAreaView, Dimensions, Image } from 'react-native'
import React from 'react'
import TabViewExample from './TabViewExample';
import { useLogIN } from '../../../ContText';

const Settings = () => {
  const {profile} = useLogIN();
  const {width} = Dimensions.get("window");
  const {height} = Dimensions.get("window");
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#000",
      }}
    >
      <View
        style={{
          width: width,

          backgroundColor: "#7e22ce",
          height: height / 4,
          justifyContent: "center",
          alignItems: "center",
          borderBottomRightRadius: width / 1.3,
          borderBottomStartRadius: width / 1.3,
          transform: [{scaleX: 1.2}],
        }}
      >
        {
          // image profile
        }
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: height / 6,
          }}
        >
          <Image
            source={{
              uri: profile.image.url,
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,

              borderWidth: 2,
              borderColor: "#fff",
            }}
            resizeMode="contain"
          />
          <Text
            style={{
              color: "#fff",
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            {profile.name}
          </Text>
          {
            // email profile
          }
          <Text
            style={{
              color: "#fff",
              fontSize: 15,
              marginTop: 5,
            }}
          >
            {profile.email}
          </Text>
          {
            // phone profile
          }
        </View>
      </View>

      <TabViewExample />
    </SafeAreaView>
  );
};

export default Settings;

