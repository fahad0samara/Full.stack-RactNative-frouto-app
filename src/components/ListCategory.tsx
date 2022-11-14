import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const ListCategory = ({categories = [], onChange, currentType}:any) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {categories.map(category => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.item,
            currentType == category.id && {backgroundColor: "#7e22ce"},
          ]}
          onPress={() => onChange(category.id)}
        >
          <Image
            
            style={{
              width: 25,
              height: 25,
              borderRadius: 12.5,
              
            }}
            source={category.image} />
          <Text
            style={[
              styles.name,
              currentType == category.id && {color: "#FFFFFF"},
            ]}
          >
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default ListCategory;

const styles = StyleSheet.create({
  name: {
    fontSize: 12,
    color: "#7e22ce",
    fontWeight: "600",
    marginLeft: 8,
  },
  item: {
    backgroundColor: '#F8F8F8',
    flexDirection: 'row',
    alignItems: 'center',
  paddingHorizontal:8,
    paddingVertical: 6,
    borderRadius: 36,
    marginRight: 14,
  },
});
