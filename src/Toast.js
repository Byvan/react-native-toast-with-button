/**
 * Author - @Byvan
 * Based on "react-native-easy-toast" https://github.com/crazycodeboy/react-native-easy-toast
 *
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Animated,
    Dimensions,
    Text,
    TouchableHighlight,
    ViewPropTypes as RNViewPropTypes,
} from 'react-native'

import PropTypes from 'prop-types';

const ViewPropTypes = RNViewPropTypes || View.propTypes;
export const DURATION = {
    LENGTH_SHORT: 500,
    FOREVER: 0,
};

let AnimatedTouchableHighlight = Animated.createAnimatedComponent(TouchableHighlight);
const {height, width} = Dimensions.get('window');

export default class Toast extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            text: '',
            textButton: null,
            onPress: null,
            opacityValue: new Animated.Value(this.props.opacity),
        }
    }

    show(text,duration, textButton, onPress, callback) {
        this.duration = typeof duration === 'number' ? duration : DURATION.LENGTH_SHORT;
        this.callback = callback;
        this.setState({
            isShow: true,
            text: text,
            textButton: textButton,
            onPress: onPress
        });

        this.animation = Animated.timing(
            this.state.opacityValue,
            {
                toValue: this.props.opacity,
                duration: this.props.fadeInDuration,
                useNativeDriver: true,
            }
        )
        this.animation.start(() => {
            this.isShow = true;
        if(duration !== DURATION.FOREVER) this.close();
    });
    }
    closeNow(){
        this.setState({
            isShow: false,
        });
    }

    close( duration ) {
        let delay = typeof duration === 'undefined' ? this.duration : duration;

        if(delay === DURATION.FOREVER) delay = this.props.defaultCloseDelay || 250;

        if (!this.isShow && !this.state.isShow) return;
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.animation = Animated.timing(
            this.state.opacityValue,
            {
                toValue: 0.0,
                duration: this.props.fadeOutDuration,
                useNativeDriver: true,
            }
        )
        this.animation.start(() => {
            this.setState({
            isShow: false,
        });
        this.isShow = false;
        if(typeof this.callback === 'function') {
            this.callback();
        }
    });
    }, delay);
    }

    componentWillUnmount() {
        this.animation && this.animation.stop()
        this.timer && clearTimeout(this.timer);
    }

    renderText = () => {
    let pos;
    switch (this.props.position) {
    case 'top':
        pos = {top: 0};
    break;
    case 'bottom':
        pos = { bottom: 0 };
    break;
    case 'custom':
        pos = this.props.positionValue;
    break;
}

return this.state.isShow ?
<View
style={[styles.container, pos]}
>
<Animated.View
style={[styles.content, { opacity: this.state.opacityValue }, this.props.style]}
>
{React.isValidElement(this.state.text) ? this.state.text : <Text>{this.state.text}</Text>}
    {this.state.textButton !== null ?
    <View style={{width: "auto"}}>
    <TouchableHighlight style={this.props.buttonStyle} underlayColor='transparent' onPress={this.state.onPress} >
    <Text style={[{color: 'white', width: "auto"}, this.props.textButtonStyle]}>{this.state.textButton}</Text>
    </TouchableHighlight></View>
    : null
    }
</Animated.View>


</View> : null;

};

render(){
    return this.renderText();
}


}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        width: "100%",
        elevation: 999,
        alignItems: 'center',
        zIndex: 10,
    },
    content: {
        backgroundColor: 'black',
        flex: 1,
        flexDirection:"row",
        justifyContent: "space-between",
        padding: 20,
        width: "100%"
    },
    text: {
        color: 'white'
    }
});

Toast.propTypes = {
    style: ViewPropTypes.style,
    position: PropTypes.oneOf([
        'top',
        'bottom',
        'custom'
    ]),
    buttonStyle: ViewPropTypes.style,
    textButtonStyle: Text.propTypes.style,
    textStyle: Text.propTypes.style,
    positionValue: Text.propTypes.style,
    fadeInDuration:PropTypes.number,
    fadeOutDuration:PropTypes.number,
    opacity:PropTypes.number
}

Toast.defaultProps = {
    position: 'bottom',
    textStyle: styles.text,
    positionValue: 120,
    fadeInDuration: 500,
    fadeOutDuration: 500,
    opacity: 1
}