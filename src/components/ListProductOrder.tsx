import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { useLogIN } from "../../ContText";
import {AntDesign} from "@expo/vector-icons";

const ListProductOrder = ({products = []}:any) => {
  const {addProductToCard, removeProduct} = useLogIN();
  const renderItem = ({item}:any) => {
    return (
      <View style={styles.item}>
        <Image style={styles.img} source={item.img} />
        <View style={styles.itemBody}>
          <View style={styles.textHeader}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.category}>{item.categoryName}</Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.priceView}>
              <Text style={styles.price}>{item.pricePerKg}</Text>
              <Text> /Kg </Text>
            </Text>
            <View style={styles.groupAction}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => removeProduct(item)}
              >
                {
                  // icon for remove
                }
                <AntDesign name="minuscircleo" size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.quantity}>{item.quantity || 0}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => addProductToCard(item)}
              >
                {
                  // icon add
                }
                <AntDesign name="pluscircleo" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={products}
      scrollEnabled={false}
      ItemSeparatorComponent={() => <View style={styles.hr} />}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
};

export default ListProductOrder;

const styles = StyleSheet.create({
  list: {
    paddingVertical: 14,
  },

  item: {
    flexDirection: "row",
  },
  price: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  priceView: {
    fontSize: 12,
    color: "#A1A1A1",
    flex: 1,
  },
  name: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },

  category: {
    fontSize: 12,
    color: "#7e22ce",
    marginTop: 6,
  },

  itemBody: {
    flex: 1,
    paddingLeft: 8,
  },

  textHeader: {
    flex: 1,
  },

  groupAction: {
    flexDirection: "row",
    alignItems: "center",
  },

  quantity: {
    fontSize: 20,
    color: "#fff",

    paddingHorizontal: 8,
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
  },

  img: {
    height: 80,
    width: 120,
  },

  hr: {
    height: 18,
  },
  button: {
    padding: 5,
    backgroundColor: "#7e22ce",

    borderRadius: 8,
  
  }
});
