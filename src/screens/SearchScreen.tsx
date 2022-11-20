import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from "react-native";
import React from "react";
import {SPACING} from "../configs/styling";
import {useNavigation} from "@react-navigation/native";

import ListProductSearch from "../components/ListProductSearch";
import { useProduct } from "../hooks/useProduct";
import {AntDesign} from "@expo/vector-icons";
import TabViewExample from "../components/TabViewScreen/TabViewExample";
const SearchScreen = () => {
  const [products, isLoading, fetchProductList, resetList] = useProduct();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isSearching, setIsSearching] = React.useState(false);
  const navigation = useNavigation();

  const resetSearch = () => {
    setSearchTerm("");
    //@ts-ignore
    resetList();
  };

  const onChangeText = (text: any[] | React.SetStateAction<string>) => {
    if (text.length === 0) {
      resetSearch();
    } else {
      //@ts-ignore
      setSearchTerm(text);
      //@ts-ignore
      fetchProductList(0, text);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#000",
        marginTop: SPACING * 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: SPACING * 3,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            marginLeft: -SPACING * 8,

            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            color: "#fff",
            fontSize: 25,
            fontWeight: "bold",
            marginLeft: SPACING * 6,
          }}
        >
          Search
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: SPACING * 2,
        }}
      >
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.searchTerm}>
            <TextInput
              value={searchTerm}
              onChangeText={onChangeText}
              style={styles.input}
              placeholder="Search for products  "
              placeholderTextColor="#000"
            />
          </View>
          {
            // if not searching show image and delet after search
          }

          {isLoading ? (
            <View>
              <ActivityIndicator />
            </View>
          ) : //@ts-ignore
          products.length > 0 ? (
            <ListProductSearch
              onCancelSearch={resetSearch}
              products={products}
            />
          ) : (
            <>
              {searchTerm.length > 0 && (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: SPACING * 2,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 20,

                      fontWeight: "bold",
                      margin: SPACING * 2,
                    }}
                  >
                    No results found
                  </Text>
                  <AntDesign name="frowno" size={24} color="white" />
                </View>
              )}
            </>
          )}
       
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  searchTerm: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 80,
    borderWidth: 3,
    borderColor: "#7e22ce",
    marginVertical: SPACING,
  },
  input: {
    flex: 1,
    paddingLeft: 15,
    color: "#000",
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollView: {
    flex: 1,
  },
  flexView: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: SPACING,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
  },
  imageButton: {
    width: 36,
    height: 36,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  middle: {
    flex: 1,
    marginTop: "10%",
    flexDirection: "row",
    justifyContent: "center",
  },
});
