import React from "react";
import {View,Text} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

const MyBottomSheetGuest = ()=>{
    return(
        <View>
            <RBSheet
               ref={ref=>{
                   this.RBSheet = ref;
               }}
               height={300}
            >
                <Text>Bottom Sheet</Text>
                
            </RBSheet>
        </View>
    )
}

export default MyBottomSheetGuest;