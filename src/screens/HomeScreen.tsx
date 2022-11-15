import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,

  TouchableOpacity,
} from 'react-native';
import React from 'react';
import AppHeader from '../components/AppHeader';
import HeroBanner from '../components/HeroBanner';
import ListCategory from '../components/ListCategory';
import ListBestSeller from '../components/ListBestSeller';
import {useProduct} from '../hooks/useProduct';
import {useCategory} from '../hooks/useCategory';
import {useNavigation} from '@react-navigation/native';
import LoderApp from '../configs/LoderApp';
import {AntDesign} from "@expo/vector-icons";
const HomeScreen = () => {
  const [products, isLoading, fetchProducts] = useProduct();
  const categoryList = useCategory();
  const [type, setType] = React.useState(1);
  const navigation = useNavigation();

  React.useEffect(() => {
    //@ts-ignore
    fetchProducts(type);
  }, [type, fetchProducts]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <AppHeader />
        <TouchableOpacity
          style={styles.searchContainer}
          onPress={() => navigation.navigate("SearchScreen")}
        >
          <AntDesign name="search1" size={24} color="black" />

          <Text style={styles.searchText}>
            Search for products, brands and more..
          </Text>
        </TouchableOpacity>
        <HeroBanner />
        {categoryList.length > 0 && (
          <ListCategory
            categories={categoryList}
            onChange={setType}
            currentType={type}
          />
        )}
        {isLoading ? (
          <View style={styles.loading}>
            <LoderApp />
          </View>
        ) : (
          <ListBestSeller
            //@ts-ignore
            products={products}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  searchText: {
    fontSize: 12,
    color: "#7e22ce",
    marginLeft: 6,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f8f8f8",
    borderRadius: 100,
    marginVertical: 14,
  },
  scrollView: {
    padding: 14,
  },
  loading: {
    margin: 18,
  },
});
