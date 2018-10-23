import React from 'react';
import { View, TouchableOpacity, TextInput, Text, KeyboardAvoidingView } from 'react-native';

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        title: "Welcome",
        headerStyle: {
            backgroundColor: "rgb(0, 113, 206)",
        },
        headerTintColor: "#eee",
    };


    state = {
        username: '',
        password: ''
    }

    onLogin = () => {
        if (this.state.password.length < 8) {
            alert("Password must be at least 8 characters long!");
        } else if(!/[A-Z]/g.test(this.state.password)) {
            alert("Password must contain an upper case character")
        } else if (!/[!@#$%^&*(),.?":{}|<>]/g.test(this.state.password)) {
            alert("Password must contain a special character");
        } else {
            this.props.navigation.navigate('List');
        }
    }

    render() {
        return(
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={styles.inputContainer}>
                    <TextInput
                        underlineColorAndroid="transparent"
                        style={styles.input}
                        placeholder={"Username"}
                        value={this.state.username}
                        onChangeText={(text) => this.setState({ username: text })}
                    />
                    <TextInput
                        underlineColorAndroid="transparent"
                        style={styles.input}
                        placeholder={"Password"}
                        value={this.state.password}
                        onChangeText={(text) => this.setState({ password: text })}
                        secureTextEntry
                    />
                </View>
                <View style={styles.submitContainer}>
                    <TouchableOpacity onPress={this.onLogin} style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#eee'
    },
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 50,
    },
    submitContainer: {
        flex: 1,
        alignContent: 'stretch',
        justifyContent: 'flex-start',
        paddingLeft: 50,
        paddingRight: 50
    },
    submitButton: {
        backgroundColor: 'rgb(0, 113, 206)',
        padding: 10
    },
    submitButtonText: {
        textAlign: 'center',
        color: '#eee'
    },
    input: {
        borderBottomColor: '#ddd',
        borderBottomWidth: 2,
        marginBottom: 20
    }
}
