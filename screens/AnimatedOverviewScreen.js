import React, { useEffect, useState} from 'react';
import {Animated, View, Text, Image, PanResponder} from 'react-native';
import ImageSlider from '../components/imageSlider-v2'
import { CombineLatestSubscriber } from 'rxjs/internal/observable/combineLatest';

const OverviewScreen = props => {

    let pins = [
        {
          id: "1",
          title: "Santa Monica Pier",
          uri: 'https://images.unsplash.com/photo-1551574210-10831cdf882d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'
        },
        {
          id: "2",
          title: "Griffth Observatory",
          uri: 'https://images.unsplash.com/photo-1518533954129-7774297db60f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80'
        }
      ]

    // Set starting value
    const [animatedXValue] = useState(new Animated.Value(0));
    const [currentIndex, setCurrentIndex] = useState(1);

    useEffect(() => {
        return () => animatedXValue.removeAllListeners();
    }, []);

    // Listen for changes to the animated value
    animatedXValue.addListener(({value}) => (this._value = value));

    // Pan responder
    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            // animatedXValue.setOffset(animatedXValue._value);
            // animatedXValue.setValue(0);
        },
        onPanResponderMove: (evt, gesture) => {
            animatedXValue.setValue(gesture.dx)
        },
        onPanResponderRelease: (evt, {dx, vx}) => {
            const distance = Math.abs(dx);
            if (distance > 200) {
                const exitValue = dx > 0 ? 600 : -600;
                Animated.spring(animatedXValue, {
                    toValue: exitValue
                }).start(() => {
                    const newIndex = currentIndex - 1
                    setCurrentIndex(newIndex)
                })
            } else {
                Animated.spring(animatedXValue, {
                    toValue: 0
                }).start()
            }
            
            
        },
    });

    const translateXAnimation = (index) => {
        return animatedXValue.interpolate({
            inputRange: [0,1],
            outputRange: [0,1]
        }) 
    }

    const rotateAnimation = (index) => {
        return animatedXValue.interpolate({
            inputRange: [-300,0,300],
            outputRange: ['-20deg','0deg', '20deg']
        }) 
    }

    const scaleAnimation = (index) => {
        return animatedXValue.interpolate({
            inputRange: [-300, -300,0, 300, 300],
            outputRange: [1, 1,0.8, 1, 1]
        }) 
    }

    return(
        
        <View style={{flex: 1}}>
            {/* Header */}
            <View style={{height: 80}}></View>
            
            {/* Card container */}
            <View 
                {...panResponder.panHandlers}
                style={{flex: 1, borderTopWidth: 1, borderBottomWidth: 1}}>
                    {pins.map((pin, index) => (
                        <Animated.View 
                        key={index}
                        style={{
                            position: 'absolute',
                            top: '10%',
                            left: '10%',
                            height: '80%',
                            width: '80%',
                            backgroundColor: '#FFF',
                            borderRadius: 20,
                            shadowOpacity: 0.5,
                            shadowColor: '#000',
                            shadowRadius: 5,
                            shadowOffset: {
                                width: 1,
                                height: 1
                            },
                            transform: [
                                {translateX: index === currentIndex ? translateXAnimation(index) : 0},
                                {scale: index === currentIndex -1 ? scaleAnimation() : 1},
                                {rotate: index === currentIndex ? rotateAnimation() : 0}
                            ]
                        }}>
                        <View style={{flex: 1, overflow: 'hidden', borderRadius: 20}}>
                            <Image
                                style={{height: '100%', width: '100%', position: "absolute"}}
                                source={{uri: pin.uri}}
                            ></Image>
                            <Text
                            style={{
                                textAlign: 'center',
                                color: 'white',
                                fontSize: 24,
                                fontWeight: '800',
                                paddingTop: 20
                            }}
                            >{pin.title}</Text>
                            </View>
                        </Animated.View>
                    ))}
            </View>

            {/* Footer */}
            <View style={{height: 80}}></View>
        </View>
    );
}

export default OverviewScreen;