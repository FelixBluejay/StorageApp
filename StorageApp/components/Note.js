import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

export default class Note extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    delete = () => {
        Alert.alert(
            "Do you want to delete this note?",
            "This action cannot be undone",
            [
                { text: "YES", onPress: () => this.props.parentCallback(this.props.id) },
                { text: "NO", },
            ]
        );
    }

    render() {
        return (
            <TouchableOpacity
                onLongPress={this.delete}
                style={{
                    width: this.props.size,
                    height: this.props.size,
                    margin: 15,
                    padding: 20,
                    borderRadius: 10,
                    backgroundColor: this.props.color,
                    flexDirection: "column"
                }}>
                <View
                    style={{
                        alignItems: "flex-end"
                    }}
                >
                    <Text
                        style={{
                            color: "#fff",
                            fontSize: 15
                        }}
                    > {this.props.date} </Text>
                </View>
                <View>
                    <Text
                        style={{
                            color: "#fff",
                            fontSize: 30
                        }}
                    > {this.props.title} </Text>
                    <Text
                        style={{
                            color: "#fff",
                            fontSize: 15
                        }}
                    > {this.props.content} </Text>
                </View>

            </TouchableOpacity>
        );
    }
}
