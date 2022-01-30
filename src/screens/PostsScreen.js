import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';

import styles from '../assets/styles/MainStyles';

const PostsScreen = ({ route, navigation }) => {
  const windowWidth = Dimensions.get('window').width;

  const { item } = route.params;

    const PostItem = () => {
        return (
            <View
                style={{
                    flexDirection: "column", backgroundColor: "white", marginBottom: 10,
                }}>
                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                    <Text style={styles.TextStyle}>Author: {item.author}</Text>
                    <Text style={styles.TextStyle}>Date: {item.date}</Text>
                </View>
                <Text style={{ fontFamily: "OpenSans-Bold", fontSize: 25, textAlign: "center", color: "black" }} >{item.title}</Text>
                <Image
                    style={{
                        aspectRatio: 3 / 2,
                        width: windowWidth,
                        resizeMode: 'contain',
                        height: "auto",
                    }}
                    source={{
                        uri: item.thumbnail,
                    }}
                />
                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                    <Text style={styles.TextStyle}>Score: {item.score}</Text>
                    <Text style={styles.TextStyle}>Comments: {item.comments}</Text>
                    <Text style={styles.TextStyle}>Share</Text>
                </View>
            </View>
        )
    }
  return (
   <SafeAreaView style={{ flex: 1 }}>
       <View style={{ backgroundColor: "silver" }}>
            <View>
                <PostItem/>
            </View>
       </View>
   </SafeAreaView>
  );
};

export default PostsScreen;
