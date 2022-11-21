import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, {useEffect, useState} from "react";
import {useLogIN} from "../../ContText";
import {AntDesign} from "@expo/vector-icons";
import {LogBox} from "react-native";
import Toast from "react-native-simple-toast";

const ProductItem = (props: {
  index?: any;
  img?: any;
  name?: any;
  categoryName?: any;
  pricePerKg?: any;
  id?: any;
}): JSX.Element => {
  const window = useWindowDimensions();
  /* *|CURSOR_MARCADOR|* */
  const ITEM_SIZE =
    /* Calculating the width of a div. */
    (window.width - 2 * 15 - 15 - 10) / 2;
  const PADDING_INNER = 8;
  const {addProductToCard} = useLogIN();
  return (
    <View
      style={[
        {
          width: ITEM_SIZE,
          marginRight: props.index % 2 === 0 ? 14 : 0,
          padding: PADDING_INNER,
        },
        styles.container,
      ]}
    >
      {
        // load the image set in the product
      }

      {props.img ? (
        <Image
          source={{uri: props.img}}
          style={{
            width: ITEM_SIZE - 2 * PADDING_INNER,
            height: (ITEM_SIZE - 2 * PADDING_INNER) * (120 / 144),
          }}
        />
      ) : (
        <Text style={{color: "red"}}>No Image</Text>
      )}

      {
        // if the name is tall small the size
      }
      {props.name.length > 30 ? (
        <Text style={styles.name} numberOfLines={1}>
          {props.name}
        </Text>
      ) : (
        <Text style={styles.name}>{props.name}</Text>
      )}
      <Text style={styles.type}>{props.categoryName}</Text>
      <View style={styles.bottom}>
        <Text style={styles.priceView}>
          <Text style={styles.price}>{props.pricePerKg}</Text>
          <Text> /Kg </Text>
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#7e22ce",
            width: 20,
            height: 20,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            //@ts-ignore
            addProductToCard(props);

            Toast.show(`Add ${props.name} to card success!`);
          }}
        >
          <AntDesign name="plus" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const GridProducts = ({products = []}) => {
 useEffect(() => {
   LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
 }, []);
  const renderItem = ({item, index}: any) => (
    <ProductItem index={index} {...item} />
  );

  return (
    <FlatList
      scrollEnabled={false}
      numColumns={2}
      key={2}
      data={products}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={{marginTop: "2%"}} />}
      contentContainerStyle={{paddingBottom: 20}}
    />
  );
};

export default GridProducts;

const styles = StyleSheet.create({
  name: {
    // if the name is tall small the size
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 4,

    color: "#fff",
  },
  type: {
    fontSize: 10,
    color: "#A1A1A1",
    marginVertical: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  priceView: {
    fontSize: 12,
    color: "#A1A1A1",
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    borderColor: "#7e22ce",
    borderWidth: 1,
    shadowColor: "#7e22ce",
    shadowOffset: {
      width: 7,
      height: 5,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 9,
    backgroundColor: "rgba(0, 0, 0, 1.9)",
    margin: 2,
    borderRadius: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1B1B1B",
    marginVertical: 18,
  },
});
