import { StyleSheet } from "react-native";

export default StyleSheet.create({
    panelBorder: {
        borderRadius: 1,
        borderWidth: 2, 
        borderColor: "#222222",
    },
    row: {
        flex: 1,
        flexDirection: "row",
    },
    reactiveSquare: {
        flex: 1,
        aspectRatio: 1,
    },
    absoluteFill: {
        position: "absolute",
        width: "100%",
        height: "100%",
    }
})