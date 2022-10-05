import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import MyButton from './MyButton';
import * as SecureStore from 'expo-secure-store';

export default class AddNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: "",
            color: "",
            id: "",
            date: ""
        };
    }

    saveNote = async () => {
        if (this.state.content == "" || this.state.title == "") {
            alert("Fields may not be empty!");
            return;
        } else {
            let color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

            let date = new Date().toDateString();
            let day = date.split(" ")[2];
            let month = date.split(" ")[1];
            date = `${day} ${month}`

            let allKeys = await this.getItem("keyArray");
            if (allKeys == undefined) {
                this.saveItem("keyArray", "0");

                this.setState({
                    color: color,
                    id: "0",
                    date: date,
                })
                this.saveItem("0", JSON.stringify(this.state));
            } else {
                let keys = allKeys.split(", ");
                let lastKey = keys[keys.length - 1];
                let newKey = `${parseInt(lastKey) + 1}`;
                let newArray = `${allKeys}, ${newKey}`;
                this.saveItem("keyArray", newArray);

                this.setState({
                    color: color,
                    id: newKey,
                    date: date
                });

                this.saveItem(newKey, JSON.stringify(this.state));
            }
            this.props.navigation.navigate("Your notes")
        }
    }

    async saveItem(key, value) {
        await SecureStore.setItemAsync(key, value);
    }

    async getItem(key) {
        return SecureStore.getItemAsync(key);
    }

    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#222222"
            }}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => this.setState({ title: text })}
                        placeholder='Title'
                        placeholderTextColor="#aaa" />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => this.setState({ content: text })}
                        placeholder='Content'
                        placeholderTextColor="#aaa" />
                </View>
                <View
                    style={{
                        margin: 20,
                    }}>
                    <MyButton
                        title="Add Note"
                        size={30}
                        parentCallback={this.saveNote}
                        color="#fff"
                    />
                </View>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    inputContainer: {
        width: "80%"

    },
    input: {
        borderBottomColor: '#aaa',
        borderBottomWidth: 2,

        color: "#fff",
        fontSize: 30,
        margin: 20,
        padding: 10
    },
})