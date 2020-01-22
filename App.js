// @flow

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
} from 'react-native';

import sum from 'lodash.sum';

import { Colors } from 'react-native/Libraries/NewAppScreen';

const sizes = [330, 341, 355, 473, 500, 567, 650, 750];

const App: () => React$Node = () => {
  const [bottleCount, setBottleCount] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

  const onChangeText = (index, amount) => {
    const newCount = bottleCount.slice(0);
    newCount[index] = Number(amount);
    setBottleCount(newCount);
  };

  const totalLitres = bottleCount.map((count, i) => count * sizes[i]);

  const convertToFluidOz = number => number * 0.033814;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Enter bottles per size: </Text>
              {sizes.map((size, i) => (
                <View style={styles.sizeSection} key={size}>
                  <TextInput
                    keyboardType="number-pad"
                    style={{
                      height: 40,
                      borderColor: 'gray',
                      borderWidth: 1,
                      flex: 1,
                      borderRadius: 8,
                      textAlign: 'center',
                    }}
                    onChangeText={val => onChangeText(i, val)}
                    value={bottleCount[i]}
                  />
                  <Text
                    style={
                      styles.sectionDescription
                    }>{`${size} ml - ${Math.round(
                    convertToFluidOz(size) * 100,
                  ) / 100} fl oz`}</Text>
                </View>
              ))}
            </View>
            <View style={styles.totalContainer}>
              <Text style={styles.sectionTitle}>Total Litres: </Text>
              <Text style={styles.sectionTitle}>{sum(totalLitres) / 1000}</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 20,
    flex: 1,
    textAlign: 'center',
  },
  sizeSection: {
    flexDirection: 'row',
    margin: 10,
  },
  totalContainer: {
    flexDirection: 'row',
    margin: 10,
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
    flex: 2,
    textAlign: 'center',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
