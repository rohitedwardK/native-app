import { View, Text } from "react-native";

export default function ReferScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Refer a Friend</Text>
        <Text>Earn rewards by referring your friends!</Text>
      </View>
    );
  }