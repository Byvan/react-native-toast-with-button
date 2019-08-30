# react-native-toast-with-button
A react native module to show toast with button (with onPress), it works on iOS and Android.

## Content

- [Installation](#installation)
- [Getting started](#getting-started)
- [API](#api)

<img src="https://raw.githubusercontent.com/Byvan/sources/master/Toast.gif" width="300">

## Installation

* 1.Run `npm i react-native-toast-with-button --save`
* 2.`import {Toast} from 'react-native-toast-with-button'`    

## Getting started  

Add `react-native-toast-with-button` to your js file.   

`import {Toast} from 'react-native-toast-with-button'`  

Inside your component's render method, use Toast:   

```javascript
 render() {
         return (
             <View style={styles.container}>
                 ...
                 <Toast 
                    ref="toast"
                    opacity={1}
                 />
             </View>
         );
 }
```

>Note:  Add it in the bottom of the root view.

Then you can use it like this:   

```javascript
 this.refs.toast.show(
                     'Example',         //text in Toast
                     2500,              //duration
                     "alert",           //textButton
                     () => alert(''),   //onPress  
                     null               //callback
                     
                 );
```

That's it, you're ready to go!  

Or pass an element:
```javascript
    this.refs.toast.show(<View><Text>hello world!</Text></View>);
```


### Basic usage  

```javascript
show = () => {
     this.refs.toast.show(
         "Example", 
         2500,  
         "close",                       
         () => this.refs.toast.close(),
         null                           
     );
};

render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight
                    style={{padding: 10}}
                    onPress={()=>{
                        this.show()
                    }}>
                    <Text>Press me</Text>
                </TouchableHighlight>
                <Toast ref="toast"/>
            </View>
        );
    }
```

### Custom Toast   

```javascript
render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight
                    style={{padding: 10}}
                    onPress={()=>{
                        this.refs.toast.show('hello world!',1000);
                    }}>
                    <Text>Press me</Text>
                </TouchableHighlight>
                <Toast
                    ref="toast"
                    style={{backgroundColor:'white'}}
                    position='custom' 
                    positionValue={{top: 200}}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{color:'red'}}
                />
            </View>
        );
    }
```

## API


Props              | Type     | Optional | Default     | Description
----------------- | -------- | -------- | ----------- | -----------
style  | View.propTypes.style  | true | {backgroundColor: 'black',flex: 1,flexDirection:"row",justifyContent: "space-between",padding: 20,width: "100%"}  |   Custom style toast
position |  PropTypes.oneOf(['top','custom','bottom']) |true | 'bottom'  | Custom toast position
positionValue  | React.PropTypes.number  | true | {bottom: 0}  |   Custom toast position value
fadeInDuration  | React.PropTypes.number  | true | 500  |   Custom toast show duration
fadeOutDuration  | React.PropTypes.number  | true | 500  |   Custom toast close duration
opacity  | React.PropTypes.number  | true | 1  |   Custom toast opacity
textStyle  | View.propTypes.style  | true | {color:'white'}  |   Custom style text
textButtonStyle  | View.propTypes.style  | true | {color: 'white', width: "auto"}  |   Custom style text in Button
buttonStyle  | View.propTypes.style  | true | {}  |   Custom style text in Button




Method   |  Type     | Optional | Description
----------------- | -------- | -------- | -----------
show(text,duration, textButton,onPress, callback)   | function | false | show a toast,text in Button, onPress, unit is millisecond，and do callback
close()  |   function  |  -   |   closing toast    


---

**MIT Licensed**
