import { StyleSheet } from "react-native";
export const CustomMarker = ({ marker }) => {
    return (
      <View style={styles.calloutContainer}>
        <Text>こんにちわ</Text>
        {/* <Text style={styles.calloutDescription}>{marker.description}</Text> */}
      </View>
    );
  };

  const styles = StyleSheet.create({
    calloutContainer: {
      width:'450px',
      height:'200px',
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
  });
  