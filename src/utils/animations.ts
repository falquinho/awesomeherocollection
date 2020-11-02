import * as Animatable from 'react-native-animatable';

/**
 * react-native-animatable animations, registered in App.tsx 
 */

export const flipOutAnim: Animatable.CustomAnimation = {
    from: { transform: [{rotateY: "0deg"}], translateX: 0, scaleY: 1.0 },
    to: { transform: [{rotateY: "-90deg"}], translateX: -200, scaleY: 1.1 },
}

export const flipInAnim: Animatable.CustomAnimation = {
    from: { transform: [{rotateY: "-90deg"}], translateX: -200, scaleY: 1.1 },
    to: { transform: [{rotateY: "0deg"}], translateX: 0, scaleY: 1.0 },
}