import React from "react";

import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";




const GuestScreen = ({navigation,route})=>{

    const image = route.params.imageSelected;


    const itemSelected = route.params.text;


    const description = route.params.description;

  
    // const {item} = route.params; 
    // console.log(item); 
    // navigation.setParams({
    //        title : `${item} Selected`
    //   });

    
     
    // const [description,setDescription] = useState('');
   

     console.log(`${description}`);

    

    
    return (
        <>
            <ScrollView>
            <View  style={styles.container}> 

<Text
    style = {
        {
            color : "#000000",
            alignSelf : "center",
            marginTop : 20,
            fontSize : 20,
        }
    }
>{itemSelected} Selected</Text>
<Image
   source={image}
   style = {styles.image}
/>
<Text style={
    {
        color : "#000000",
        textAlign : "center",
        margin : 20,
        fontSize : 20,
        
    }
}>
     
     {description}
</Text>
 
<View style = {styles.loginBtn}>
     <TouchableOpacity
         onPress={()=>{
             navigation.navigate('Login Screen')
         }}
     >
     <Text style={
         {
             fontSize : 30,
             alignSelf : "center",
             color : "#FFFFFF",
             margin : 5,
             paddingBottom : 10,
             
         }
     }>Login</Text>
     </TouchableOpacity>
 </View>     


 <View style = {styles.guestRegister}>
     <TouchableOpacity
       
         onPress={()=>{
             navigation.navigate('Pickup Screen',{
                 itemSelected : `${itemSelected}`
             })
         }}
     
     >
     <Text style={
         {
             fontSize : 20,
             alignSelf : "center",
             color : "#000000",
             margin : 5,
             paddingBottom : 10,
             
         }
     }>Continue As Guest</Text>
     </TouchableOpacity>
 </View>     



</View>   
            </ScrollView>
        </>
    )
}

export default GuestScreen;

const styles = StyleSheet.create({

    container : {
        flex : 1,
    },  
    
   

    image : {
        height : 150,
        width : 150,
        alignSelf : "center",
        marginTop : 20,
    },

    loginBtn : {
        marginTop : 25,
        backgroundColor : "#1C8D73",
        marginLeft : 90,
        marginRight : 90,
        borderRadius : 15,
        
    },

    guestRegister : {
        marginTop : 25,
        borderColor : "#1C8D73",
        borderWidth : 3,
        marginLeft : 90,
        marginRight : 90,
        paddingTop : 7,
    }

    
})

