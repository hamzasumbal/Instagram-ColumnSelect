import React,{useState, useRef} from 'react';
import { StyleSheet, Text, View , ScrollView, Animated, Dimensions, TouchableOpacity, SafeAreaView} from 'react-native';
const WIDTH = Dimensions.get("screen").width;

const ColumnOptions = ['Tops', 'Accounts', 'Tags', 'Places',]

export default function App() {
  const scrollViewRef = useRef();
  const [selectedOption, setSelectedOption] = useState(ColumnOptions[0])
  const ScrollX = useRef(new Animated.Value(0)).current;

  const handleOptionSelect = (event) => {
    let scrollX = event.nativeEvent.contentOffset.x
    ScrollX.setValue(scrollX/ColumnOptions.length)
    for (let i = 0; i < ColumnOptions.length; i++) {
        let a = i * WIDTH - 100
        let b = (i + 1) * WIDTH - 100
        if (scrollX > a && scrollX < b) {
            if (selectedOption !== ColumnOptions[i]) {
                setSelectedOption(ColumnOptions[i])
                return;
            }
        }

    }

}

const ColumnBar = () => {


  return<View>
   <View style={styles.horizontalSelect}>
      {ColumnOptions.map((item, index) => {

          return <TouchableOpacity
              onPress={() => {
                  scrollViewRef.current?.scrollTo({
                      x: WIDTH * index,
                      animated: true
                  });
              }}
          >
              <Text style={[styles.optionsText,
              { opacity: selectedOption === item ? 1 : 0.6 }]
              } key={item}>{item}</Text>
          </TouchableOpacity>
      })}
  </View>
  <Animated.View style = {{
        width : WIDTH/ColumnOptions.length,
        height : 40,
        borderBottomWidth : 2,
        borderColor  :"white",
        left: ScrollX,
        position : "absolute",
        top : 5,
      }}/>
  </View>
}






  return (
    <SafeAreaView style={styles.container}>
      {ColumnBar()}
     
      <Animated.ScrollView horizontal pagingEnabled
                    ref={scrollViewRef}
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleOptionSelect}
                    scrollEventThrottle={1}>
                    {ColumnOptions.map((item, index) => {
                        return <View style = {styles.columnView}>
                          <Text style = {styles.text}>Add components for</Text>
                          <Text style = {[styles.text,{fontWeight : "500"}]}>{item}</Text>
                          <Text style = {styles.text}>here</Text>
                        </View>
                    })}

                </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: "black",
      flex: 1,
      paddingTop: Platform.OS === "android" ? 25 : null,
  },
  horizontalSelect: {
      height: 50,
      width: WIDTH,
      backgroundColor: "black",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around"
  },
  optionsText: {
      color: "white",
      fontWeight: "600",
      paddingVertical : 5,
      textAlign : "center",
      width : WIDTH/ColumnOptions.length
  },
  columnView: {
    width : WIDTH,
    flex: 1,
    backgroundColor : "grey",
    justifyContent : "center",
    alignItems : "center"
  },
  text: {
    color :"black",
    fontWeight : "200",
    fontSize : 32,
    width : WIDTH*0.6,
    textAlign : "center"

  }
});

