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

import glass from '../assets/glass.png';
import plastic from '../assets/plastic.png';
import electronic from '../assets/electronic.png';
import metal from '../assets/metal.png';
import paper from '../assets/paper.png';
import copper from '../assets/copper.png';
import iron from '../assets/iron.png';

const categoryList = [
  {
    key: 0,
    image: glass,
    text: 'Glass',
    description:
      'Glass is found in municipal solid waste (MSW), primarily in the form of containers such as beer and soft drink bottles; wine and liquor bottles; and bottles and jars for food, cosmetics and other products.',
  },

  {
    key: 1,
    image: metal,
    text: 'Metal-Others',
    description:
      'Several kinds and also large amounts of metals are used in industrial processes every day.Since the industrial revolution period has taken place, our consumption levels skyrocketed due to the mass production of goods and the resulting low unit price.The most consumed metal worldwide is aluminum, followed by copper, zinc, lead and nickel.',
  },

  {
    key: 2,
    image: plastic,
    text: 'Plastic',
    description:
      'Plastic waste, or plastic pollution, is the accumulation of plastic objects (e.g.: plastic bottles and much more) in the Earth’s environment that adversely affects wildlife, wildlife habitat, and humans.',
  },

  {
    key: 3,
    image: paper,
    text: 'Paper',
    description:
      'Post-consumer waste is material discarded after consumer use, such as old corrugated containers (OCC), old magazines, and newspapers. Paper suitable for recycling is called scrap paper, often used to produce moulded pulp packaging.',
  },

  {
    key: 4,
    image: electronic,
    text: 'Electronics',
    description:
      'E-waste is electronic products that are unwanted, not working, and nearing or at the end of their “useful life.” Computers, televisions, VCRs, stereos, copiers, and fax machines are everyday electronic products.',
  },

  {
    key: 5,
    image: copper,
    text: 'Copper Items',
    description:
      'Copper scrap is smelted in primary (concentrate) and secondary (scrap) smelters. Primary smelters mainly smelt concentrate. ... The main smelting product is molten black copper (80% Cu), which is converted to rough copper (96% Cu) then fire refined and cast into anodes (98.5% Cu).',
  },

  {
    key: 6,
    image: iron,
    text: 'Iron Items',
    description:
      "Iron and steel scrap also known as 'ferrous metal scrap' is a recyclable material which is left- over during the production of iron and steel products and fabrication of ferrous materials or generated at end of life of the ferrous products. Ferrous scrap is normally recycled during steelmaking.",
  },
];

const CategoryScreen = ({navigation}) => {
  return (
    <>
      <ScrollView style={styles.container}>
        <StatusBar backgroundColor="#1FAA59" />
        <View style={styles.gridContainer}>
          {categoryList.map(key => (
            <TouchableOpacity
              key={key.key}
              onPress={() => {
                console.log(`${key.text} Clicked`);
                navigation.navigate('Guest Screen', {
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
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },

  viewGroup: {
    borderWidth: 1,
    borderColor: '#1FAA59',
    borderRadius: 15,
    margin: 10,
  },

  image: {
    height: 90,
    width: 90,
    margin: 10,
  },

  text: {
    textAlign: 'center',
    marginBottom: 4,
    color: '#000000',
    padding: 5,
  },
});
