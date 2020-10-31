import GlobalStyles from "./styles";
import { TouchableOpacity } from 'react-native';

export default {
    Button: {
        titleStyle: { fontFamily: "ComicNeue-Bold", color: "black" },
        raised: true,
        containerStyle: [GlobalStyles.panelBorder],
        buttonStyle: { backgroundColor: "white", borderRadius: 0 },
        loadingProps: { color: "black" },
    },
    Text: {
        style: { fontFamily: "ComicNeue-Bold" },
    }
}