import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';

const heroList = [
  {id: 1, image: require("../../assets/Hero3.jpg")},
  {id: 2, image: require("../../assets/Hero1.jpg")},
  {id: 3, image: require("../../assets/Hero2.jpg")},
  {id: 4, image: require("../../assets/Hero4.jpg")},
];


const Dot = ({active}:any) => {
  return <View style={active ? styles.dotActive : styles.dot} />;
};

const HeroBanner = () => {
  const window = useWindowDimensions();
/* Calculating the width of the image. */
  const ITEM_SIZE = window.width - 2 * 14; // 14 is padding
  const [activeIndicator, setActiveIndicator] = React.useState(0);
/* *|CURSOR_MARCADOR|* */
  const onScroll = (evt: { nativeEvent: { contentOffset: { x: number; }; }; }) => {
    const index = Math.floor(evt.nativeEvent.contentOffset.x / ITEM_SIZE);
    setActiveIndicator(index);
  };
  return (
    <View>
      <ScrollView
        horizontal
        pagingEnabled

        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}>
        {heroList.map(item => (
          <Image
            key={item.id}
            source={item.image}
            style={{width: ITEM_SIZE, height: ITEM_SIZE * (140 / 250)}}
            resizeMode="contain"
          />
        ))}
      </ScrollView>
      <View style={styles.dotContainer}>
        <View style={styles.dotInner}>
          {heroList.map((item, index) => (
            <Dot key={item.id} active={index === activeIndicator} />
          ))}
        </View>
      </View>
    </View>
  );
};

export default HeroBanner;

const styles = StyleSheet.create({
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: "#000",
    marginHorizontal: 4,
  },
  dotActive: {
    width: 30,
    height: 8,
    borderRadius: 8,
    backgroundColor: "#7e22ce",
    marginHorizontal: 4,
  },
  dotContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 14,
  },
  dotInner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    padding: 6,
    borderRadius: 16,
  },
});
