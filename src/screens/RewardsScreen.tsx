import { View, Text } from "react-native";

export default function RewardsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Your Rewards</Text>
        <Text>Stock A: ₹300,000</Text>
        <Text>Stock B: ₹200,000</Text>
        <Text>Stock C: ₹150,000</Text>
      </View>
    );
  }