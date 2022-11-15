import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import ListProductOrder from '../components/ListProductOrder';
import { useLogIN } from '../../ContText';
import LoderCart from '../configs/LoderCart';
import { SPACING } from '../configs/styling';
import { AntDesign } from '@expo/vector-icons';
import {LogBox} from "react-native";

const sumTotal = (products: any[]) => {

  return products.reduce((sum, item) => {
    return (
      sum +
      parseFloat(item.pricePerKg.replace("£", "")) * parseFloat(item.quantity)
    );
  }, 0);
};

const CartScreen = () => {
   LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);

  const navigation = useNavigation();
  const {products} = useLogIN();
  const totalPrice = (sumTotal(products) + 2.44).toFixed(2);
  return (
    // if the cart empty show you cart empty

    products.length === 0 ? (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000",
        }}
      >
        <LoderCart />
      </View>
    ) : (
      <SafeAreaView style={styles.container}>
        <View style={styles.flexView}>
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
              Order
            </Text>
          </View>

          <ScrollView style={styles.scrollView}>
            <Text style={styles.title}>Your order</Text>
            <ListProductOrder products={products} />
          </ScrollView>
          <View style={styles.line1} />
          <View style={{paddingHorizontal: 16}}>
            <View style={styles.row}>
              <Text style={styles.text1}>Delivery</Text>
                <Text style={styles.text1}>
                  £1.50
              </Text>
            </View>
            <View style={styles.line} />
            <View style={styles.row}>
              <Text style={styles.text2}>TOTAL</Text>
                <Text style={styles.text2}>
                £{totalPrice}</Text>
            </View>
            <TouchableOpacity style={styles.btnCheckout}>
              <Text style={styles.txtCheckout}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    )
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  line1: {
    height: 14,

    width: "100%",
    marginBottom: 20,
  },
  btnCheckout: {
    backgroundColor: "#7e22ce",
    padding: 14,
    alignItems: "center",
    marginTop: 20,
    borderRadius: 10,
  },
  txtCheckout: {
    fontSize: 15,
    color: "#FFFFFF",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text1: {
    fontSize: 11,
    color: "#959595",
  },
  text2: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  line: {
    width: "100%",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#fff",
    marginVertical: 20,
  },

  container: {
    flex: 1,
    marginTop: 22,

    backgroundColor: "#000",
  },

  flexView: {
    flex: 1,
  },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  imageButton: {
    width: 36,
    height: 36,
  },
  headerText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  middle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#7e22ce",
    marginTop: 27,
  },

  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
