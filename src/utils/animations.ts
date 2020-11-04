import * as Animatable from 'react-native-animatable';

/**
 * react-native-animatable animations, registered in App.tsx 
 */

export const flipOut: Animatable.CustomAnimation = {
    from: { transform: [{rotateY: "0deg"}], translateX: 0, scaleY: 1.0, opacity: 1 },
    to: { transform: [{rotateY: "-60deg"}], translateX: -300, scaleY: 1.1, opacity: 0 },
}

export const flipIn: Animatable.CustomAnimation = {
    from: {transform: [{rotateY: "60deg"}], translateX: -200, scaleY: 0.8, opacity: 0 },
    to: {transform: [{rotateY: "0deg"}], translateX: 0, scaleY: 1.0, opacity: 1 },
}