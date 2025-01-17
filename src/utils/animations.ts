import * as Animatable from 'react-native-animatable';

/**
 * react-native-animatable animations, registered in App.tsx 
 */

export const flipOut: Animatable.CustomAnimation = {
    from: { transform: [{rotateY: "0deg"}], translateX: 0, scaleY: 1.0, opacity: 1 },
    to: { transform: [{rotateY: "-60deg"}], translateX: -300, scaleY: 1.2, opacity: 0 },
}

export const flipIn: Animatable.CustomAnimation = {
    from: {transform: [{rotateY: "60deg"}], translateX: -200, scaleY: 0.8, opacity: 0 },
    to: {transform: [{rotateY: "0deg"}], translateX: 0, scaleY: 1.0, opacity: 1 },
}

export const flipOutReverse: Animatable.CustomAnimation = {
    from: { transform: [{rotateY: "-60deg"}], translateX: -300, scaleY: 1.2, opacity: 1 },
    to: { transform: [{rotateY: "0deg"}], translateX: 0, scaleY: 1.0, opacity: 1 },
}

export const flipInReverse: Animatable.CustomAnimation = {
    from: {transform: [{rotateY: "0deg"}], translateX: 0, scaleY: 1.0, opacity: 1 },
    to: {transform: [{rotateY: "60deg"}], translateX: -200, scaleY: 0.8, opacity: 0 },
}

export const rotationTable: Animatable.CustomAnimation = {
    0.0: {transform: [{rotateY: "0deg"}] },
    0.2: {transform: [{rotateY: "30deg"}] },
    0.4: {transform: [{rotateY: "0deg"}] },
    0.6: {transform: [{rotateY: "-30deg"}] },
    0.8: {transform: [{rotateY: "0deg"}] },
    1.0: {transform: [{rotateY: "0deg"}] },
}

export const spin: Animatable.CustomAnimation = {
    0.0: {transform: [{rotateY: "0deg"}] },
    1.0: {transform: [{rotateY: "360deg"}] },
}