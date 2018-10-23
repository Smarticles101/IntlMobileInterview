import React from 'react';
import { View, ScrollView, FlatList, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'expo';
import Swipeout from 'react-native-swipeout';

export default class ListScreen extends React.Component {
    static navigationOptions = {
        title: 'List View',
        headerStyle: {
          backgroundColor: "rgb(0, 113, 206)",
        },
        headerTintColor: "#eee"
    };

    state = {
        rows: Array(30)
              .fill()
              .map((e, i) => ({
                key: i.toString(), 
                text: "Example " + i
              }))
    }

    delete = (index) => {
      rows = JSON.parse(JSON.stringify(this.state.rows))
      rows[index].text = undefined;
      this.setState({ rows })
    }
    
    render() {
      return(
          <View style={styles.container}>
              <ScrollView style={styles.container}>
                  <FlatList
                      getItemLayout={(data, index) => (
                        {length: styles.row.height, offset: styles.row.height * index, index}
                      )}
                      data={this.state.rows}
                      keyExtractor={item => item.key}
                      renderItem={({item, index}) => 
                        <Row key={item.key} item={item} onDelete={this.delete.bind(this, index)} />
                      }
                  />
              </ScrollView>
          </View>
      )
    }
}

const Row = ({ item, onDelete }) => {
  if (!item.text) {
    return null;
  }

  const button = (
    <TouchableOpacity
      style={styles.delButton}
      onPress={onDelete}
    >
        <Icon.Ionicons 
          name={"md-trash"}
          size={30}
          color={"white"}
        />
        <Text style={{color: 'white'}}>DELETE</Text>
    </TouchableOpacity>
    )

  return(
    <Swipeout
      right={[
        {
          component: button
        }
      ]}
    >
      <View style={styles.row}>
        <Text>{item.text}</Text>
      </View>
    </Swipeout>
)}

const styles = {
    container: {
      flex: 1,
      backgroundColor: '#eee',
    },
    row: {
      height: 50,
      padding: 15,
      borderBottomColor: "#ddd",
      borderBottomWidth: 5,
      backgroundColor: '#eee'
    },
    delButton: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'red'
    }
};
