import React, { Component } from "react";

import {
  Text,
  StyleSheet,
  View,
  ListView,
  FlatList,
  TextInput,
  ActivityIndicator,
  ListItem,
  Alert
} from "react-native";

import data from "../test.json";

export default class Additives extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      data: [],
      filteredData: [],
      text: ""
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    
    this.setState(
      {
        isLoading: false,
        data: data.eNumbers
      },
      function() {
        this.arrayholder = data.eNumbers;
      }
    );
  }

  SearchFilterFunction = text => {
    const newData = this.state.data.filter((eNumber) => {
      const itemName = eNumber.number.toUpperCase(); 
      const descrip = eNumber.description.toUpperCase();
     
      const textData = text.toUpperCase();
      return itemName.indexOf(textData) > -1 || descrip.indexOf(textData) > -1;
    });


    this.setState({
      filteredData: newData,
      text: text
    });
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "green",
          opacity: 0.3
        }}
      />
    );
  };

  color = data => {
    if(data.status === 'Halal') {
      return { color: 'green'};
    }
    else {
    return { color:'red' };}
  };

  render() {
    const { isLoading, filteredData, data, text } = this.state;
    const target = (text === '') ? data : filteredData;
   
    if (isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.MainContainer}>
        <TextInput
          style={styles.TextInputStyleClass}
          onChangeText={text => this.SearchFilterFunction(text)}
          value={text}
          underlineColorAndroid="transparent"
          placeholder="Search"
        />

        <FlatList
          data={target}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.numStyle}>
                <Text style={this.color(item)}>{item.number} - {item.status}</Text>
              </Text>

              <Text style={styles.content}> {item.description} </Text>
            </View>
          )}

          keyExtractor={item => item.description}
          ItemSeparatorComponent={this.renderSeparator}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: "center",
    flex: 1,
    margin: 7,
    marginTop: 10
  },

  rowViewContainer: {
    fontSize: 20,
    padding: 10
    //flexDirection: 'column'
  },

  card: {
    padding: 10,
    flexDirection: "column"
  },

  TextInputStyleClass: {
    marginTop: 10,
    textAlign: "center",
    height: 40,
    borderWidth: 1,
    borderColor: "#009688",
    borderRadius: 7,
    backgroundColor: "#FFFFFF"
  },

  content: {
    textAlign: "center",
    fontSize: 20
  },
  numStyle: {
    fontSize: 25,
    justifyContent: "center",
    textAlign: "center"
  }
});
