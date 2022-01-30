 import React, { useEffect, useMemo } from 'react';
 import {
   SafeAreaView,
   StyleSheet,
   Text,
   View,
   FlatList,
   Image,
   Dimensions,
   Pressable,
 } from 'react-native';
 import axios from 'axios';
 import { format } from 'date-fns'
 import styles from '../assets/styles/MainStyles';

 
 const HomeScreen = ({ navigation }) => {
   const [result, setResult] = React.useState([]);
   const windowWidth = Dimensions.get('window').width;
   let loadingFlag = false;

   const redditRequest = async () => {
     await axios({
       method: 'get',
       url: 'https://api.reddit.com/r/pics/hot.json'
     })
       .then(function (response) {
         response.data.data.children.map((item)=>{
           setResult(prevResult => [...prevResult,
           { id: item.data.id,
             date: format(item.data.created_utc * 1000, "dd/MM/yyyy"), 
             title: item.data.title, 
             author: item.data.author, 
             score: item.data.score, 
             comments: item.data.num_comments, 
             thumbnail: item.data.thumbnail }])
         })
       });
   }
 
   const loadMore = () => {
     axios({
       method: 'get',
       url: 'https://api.reddit.com/r/pics/hot.json?after=t3_' + result[result.length - 1].id
     })
       .then(function (response) {
         response.data.data.children.map((item) => {
           setResult(prevResult => [...prevResult,
           {
             id: item.data.id,
             date: format(item.data.created_utc * 1000, "dd/MM/yyyy"),
             title: item.data.title,
             author: item.data.author,
             score: item.data.score,
             comments: item.data.num_comments,
             thumbnail: item.data.thumbnail
           }])
         })
       });
   }
 
   const goToPost = (item) => {
     navigation.navigate('Posts', {item: item});

    //  axios({
    //    method: 'get',
    //    url: 'https://api.reddit.com/r/pics/comments/'+item.id+'.json'
    //  })
    //    .then(function (response) {
    //      console.log(response.data[1].data.children[0].data.body);
    //      // response.data.data.children.map((item) => {
    //      //   setResult(prevResult => [...prevResult,
    //      //   {
    //      //     id: item.data.id,
    //      //     date: format(item.data.created_utc * 1000, "dd/MM/yyyy"),
    //      //     title: item.data.title,
    //      //     author: item.data.author,
    //      //     score: item.data.score,
    //      //     comments: item.data.num_comments,
    //      //     thumbnail: item.data.thumbnail
    //      //   }])                               
    //      // })
    //    });
   }
 
   const renderItem=({ item }) => (
     <View
       style={{
         flexDirection: "column", backgroundColor: "white", marginBottom: 10,
       }}
     >
       <Pressable onPress={()=>{goToPost(item)}}>
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
       </Pressable>
     </View>
   );
 
   const memoizedValue = useMemo(() => renderItem, [result]);
 
   useEffect(() => {
     setResult([])
   }, [])
 
   useEffect(() => {
     redditRequest()
   }, [])
 
   return (
    <SafeAreaView style={{ flex: 1 }}>
        <View style={{ backgroundColor: "silver" }}>
            {result == [] ? undefined :
                <FlatList
                    data={result}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={() => {
                        if (loadingFlag == true) {
                            loadMore()
                            loadingFlag = false;
                        }
                    }}
                    onEndReachedThreshold={0.5}
                    removeClippedSubviews={true}
                    renderItem={memoizedValue}
                    onMomentumScrollBegin={() => { loadingFlag = true }}
                />}
        </View>
    </SafeAreaView>
   );
 };
 
 export default HomeScreen;
 