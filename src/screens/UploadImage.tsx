import React, {useState} from "react";
import {View, StyleSheet, TouchableOpacity, Text, Image} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {StackActions} from "@react-navigation/native";
import {useNavigation} from "@react-navigation/native";
import axios from "axios";
import * as Progress from "react-native-progress";
import {useLogIN} from "../../ContText";

const UploadImage = ({route}: any) => {
  const {setLog, profile, setProfile} = useLogIN();
  const {token} = route.params;
  const [profileImage, setProfileImage] = useState("");
  const [progress, setProgress] = useState(0);

  const [loading, isLoading] = useState();

  const navigation = useNavigation();

  const openImageLibrary = async () => {
    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });

      if (!response.canceled) {
        setProfileImage(response.assets[0].uri);
      }
    }
  };

  const uploadProfileImage = async () => {
    const formData = new FormData();
    formData.append("image", {
      name: new Date() + "_image",
      uri: profileImage,
      type: "image/jpg",
    });

    try {
      isLoading(true);

      const res = await axios.post(
        "http://10.0.2.2:2020/auth/upload",

        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            authorization: `JWT ${token}`,
          },
          onUploadProgress: ({loaded, total}) => {
            console.log(loaded / total);
            setProgress(loaded / total);
          },
        }
      );

      console.log(res.data);
      setProfile(res.data.mango);
      setProfile(res.data.post);
      console.log("====================================");
      console.log(res.data.post);
      console.log("====================================");

      isLoading(false);
      setProfileImage("");
      setProgress(0);

      navigation.dispatch(StackActions.replace("TabNav"));
    } catch (error) {
      console.log(error);
      isLoading(false);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 20,
            marginTop: 20,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20%",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              welcome
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              to
            </Text>

            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              Let's finish your account
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#fff",

                marginTop: 40,
              }}
            >
              {" "}
              please upload your profile image{" "}
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 40,
            }}
          >
            <TouchableOpacity
              onPress={openImageLibrary}
              style={styles.uploadBtnContainer}
            >
              {profileImage ? (
                <Image
                  source={{uri: profileImage}}
                  style={{width: "100%", height: "100%"}}
                />
              ) : (
                <Text style={styles.uploadBtn}>Upload Profile Image</Text>
              )}
            </TouchableOpacity>
            {profileImage ? (
              <TouchableOpacity
                onPress={uploadProfileImage}
                style={{
                  backgroundColor: "#fff",
                  width: "100%",
                  height: 50,
                  borderColor: " #7e22ce",
                  borderWidth: 3,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 8,
                  marginTop: 20,
                }}
              >
               
                  {loading ? (
                    <Progress.CircleSnail
                      color={["red", "green", "blue"]}
                      size={30}
                      thickness={5}
                      progress={progress}
                    />
                  ) : (
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                          color: "#7e22ce",
                        
                      }}
                    >
                      Upload Image
                    </Text>
                  )}
                
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#000",
  },
  uploadBtnContainer: {
    height: 130,
    width: 130,

    backgroundColor: "#fff",
    borderRadius: 130 / 2,
    borderColor:" #7e22ce",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#7e22ce",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,

    elevation: 5,

   
  

    borderWidth: 3,

    overflow: "hidden",
  },
  uploadBtn: {
    textAlign: "center",
    fontSize: 18,
    color: "#7e22ce",
    opacity: 0.3,
    fontWeight: "bold",
  },
  skip: {
    textAlign: "center",
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    opacity: 0.5,
  },
});

export default UploadImage;
