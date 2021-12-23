import React from 'react';

import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';




import people from "../assets/people.jpg"
import glassBottle from "../assets/glassBottle.png";
import plasticIcon from "../assets/plasticIcon.png";
import metalIcon from "../assets/metalIcon.png";
import paperIcon from "../assets/paperIcon.png";
import electronicIcon from "../assets/electronicIcon.png"
const categoryList = [
  {
    key: 0,
    image: glassBottle,
    text: 'Glass',
    description:
      'Glass is found in municipal solid waste (MSW), primarily in the form of containers such as beer and soft drink bottles; wine and liquor bottles; and bottles and jars for food, cosmetics and other products.',
  },

  {
    key: 1,
    image: metalIcon,
    text: 'Metal',
    description:
      'Since the industrial revolution period has taken place, our consumption levels skyrocketed due to the mass production of goods and the resulting low unit price.The most consumed metal worldwide is aluminum, followed by copper, zinc, lead and nickel.',
  },

  {
    key: 2,
    image: plasticIcon,
    text: 'Plastic',
    description:
      'Plastic waste, or plastic pollution, is the accumulation of plastic objects (e.g.: plastic bottles and much more) in the Earth’s environment that adversely affects wildlife, wildlife habitat, and humans.',
  },

  {
    key: 3,
    image: paperIcon,
    text: 'Paper',
    description:
      'Post-consumer waste is material discarded after consumer use, such as old corrugated containers (OCC), old magazines, and newspapers. Paper suitable for recycling is called scrap paper, often used to produce moulded pulp packaging.',
  },

  {
    key: 4,
    image: electronicIcon,
    text: 'Electronics',
    description:
      'E-waste is electronic products that are unwanted, not working, and nearing or at the end of their “useful life.” Computers, televisions, VCRs, stereos, copiers, and fax machines are everyday electronic products.',
  },

  // {
  //   key: 5,
  //   image: copper,
  //   text: 'Copper Items',
  //   description:
  //     'Copper scrap is smelted in primary (concentrate) and secondary (scrap) smelters. Primary smelters mainly smelt concentrate. ... The main smelting product is molten black copper (80% Cu), which is converted to rough copper (96% Cu) then fire refined and cast into anodes (98.5% Cu).',
  // },

  // {
  //   key: 6,
  //   image: iron,
  //   text: 'Iron Items',
  //   description:
  //     "Iron and steel scrap also known as 'ferrous metal scrap' is a recyclable material which is left- over during the production of iron and steel products and fabrication of ferrous materials or generated at end of life of the ferrous products. Ferrous scrap is normally recycled during steelmaking.",
  // },
];

const CategoryScreen = ({navigation}) => {
  return (
    <>
      <ScrollView style={styles.container}>
        <StatusBar backgroundColor="#1FAA59" />
        <Image
            source={people}
            style = {
              {
                 height : 200,
                 width : 400,
                 marginTop : 10,
                 alignSelf : "center",
                 resizeMode : "cover",
                 
              }
            }
        />
        <View style={styles.gridContainer}>
          {categoryList.map(key => (
            <TouchableOpacity
              key={key.key}
              onPress={() => {
                //console.log(`${key.text} Clicked`);
                navigation.navigate('SubCategory Screen', {
                  text: `${key.text}`,
                  imageSelected: key.image,
                  description: key.description,
                });
              }}>
              <View style={styles.viewGroup}>
                <Image source={key.image} style={styles.image} />

                <Text style={styles.text}>{key.text}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
      </ScrollView>
    </>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  gridContainer: {
    flex: 1,
    margin: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "space-around",
  },

  viewGroup: {
    borderWidth: 4,
    borderColor: '#758283',
    borderRadius: 20,
    marginTop : 30,
    padding : 10,
    overflow : "hidden",

    //margin: 10,
  },

  image: {
    height: 80,
    width: 100,
    margin: 10,
    overflow : "hidden",
    //padding : 30,
  },

  text: {
    textAlign: 'center',
    marginBottom: 4,
    color: '#000000',
    //padding: 5,
  },
});
