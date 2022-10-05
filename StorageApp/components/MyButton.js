import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default class MyButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onPress = () => {
        this.props.parentCallback();
    }

    render() {
        return (
            <TouchableOpacity onPress={this.onPress}>
                <View>
                    <Text
                        style={{
                            fontSize: this.props.size,
                            color: this.props.color
                        }}
                    > {this.props.title} </Text>
                </View>
            </TouchableOpacity>
        );
    }
}
