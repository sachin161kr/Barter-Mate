import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

const OrderDetailsScreen = ({route}) => {
  var orderStatus = route.params.orderStatus;
  if (orderStatus == 'false') {
    orderStatus = 'Not Completed';
  } else {
    orderStatus = 'Completed';
  }
  var pickupAddress = route.params.pickupAddress;
  var pincode = route.params.pincode;
  var pickupTime = route.params.pickupTime;

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFF',
        }}>
        <View
          style={{
            alignSelf: 'center',
            width: scale(300),
            marginTop: verticalScale(30),
            backgroundColor:
              orderStatus == 'Not Completed' ? '#E21717' : 'green',
            elevation: 5,
            padding: moderateScale(10),
            borderRadius: moderateScale(20),
          }}>
          <Text style={styles.text}>Order Status : {orderStatus}</Text>
          <Text style={styles.text}>Pickup Address : {pickupAddress}</Text>
          <Text style={styles.text}>Pickup Time 24 hrs : {pickupTime}</Text>
          <Text style={styles.text}>Pincode : {pincode}</Text>
        </View>
      </View>
    </>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: moderateScale(18),
    marginBottom: verticalScale(10),
    fontWeight: 'bold',
    color: '#FFF',
  },
});
