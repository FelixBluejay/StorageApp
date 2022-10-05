import React, { Component } from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Note from './Note';
import MyButton from './MyButton';

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            size: Dimensions.get('window').width / 2 - 30
        };
        this.funkcja = null;
    }

    componentDidMount = () => {
        this.funkcja = this.props.navigation.addListener('focus', () => {
            this.getAllItems();
        });

        this.getAllItems();

    }

    componentWillUnmount() {
        this.funkcja();
    }

    getAllItems = async () => {
        let allKeys = await this.getItem("keyArray");
        let keys = allKeys.split(", ");

        let notes = new Array();
        for (const key of keys) {
            let note = await this.getItem(key);
            if(note) {
                notes.push(JSON.parse(note));
            }
        };

        this.setState({
            notes: notes
        });
    }

    async getItem(key) {
        return SecureStore.getItemAsync(key);
    }

    deleteItem = async (key) => {
        let updatedNotes = this.state.notes.filter(function (obj) {
            return obj.id !== key;
        });

        this.setState({
            notes: updatedNotes
        });

        await SecureStore.deleteItemAsync(key);
    }

    render() {
        return (
            <View
                style={{
                    backgroundColor: "#222",
                    flex: 1
                }}
            >
                <FlatList
                    numColumns={2}
                    data={this.state.notes}
                    renderItem={({ item }) => <Note
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        content={item.content}
                        color={item.color}
                        date={item.date}
                        size={this.state.size}
                        parentCallback={this.deleteItem} />}
                />
            
            </View>
        );
    }
}
