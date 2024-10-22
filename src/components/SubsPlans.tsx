import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { Card, Button, Modal, Portal, Provider, TextInput } from 'react-native-paper';

// Define the Plan type
type Plan = {
    id: number;
    name: string;
    price: string;
    details: string;
};

// Import the background image from the assets folder
const backgroundImage = require('../../assets/app-bg-grey.png');

export default function SubsPlans() {
    const [selectedPlan, setSelectedPlan] = React.useState<Plan | null>(null);
    const [visible, setVisible] = React.useState(false);
    const [stepTwoVisible, setStepTwoVisible] = React.useState(false);
    const [amount, setAmount] = React.useState('');

  const plans: Plan[] = [
    { id: 1, name: "Basic Plan", price: "₹10,000", details: "Basic subscription plan with limited features." },
    { id: 2, name: "Premium Plan", price: "₹25,000", details: "Premium plan with additional benefits." },
    { id: 3, name: "Platinum Plan", price: "₹50,000", details: "Platinum plan with all features unlocked." }
  ];

  const showModal = (plan: any) => {
    setSelectedPlan(plan);
    setVisible(true);
  };

  const hideModal = () => setVisible(false);

  const openStepTwo = () => {
    setVisible(false);
    setStepTwoVisible(true);
  };

  const hideStepTwo = () => setStepTwoVisible(false);

  const handleInvest = () => {
    // Handle the investment process here
    console.log("Investing amount: ", amount);
    hideStepTwo();
  };

  return (
    <Provider>
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
            {plans.map((plan) => (
                <Card key={plan.id} style={styles.card}>
                <Card.Title title={plan.name} subtitle={plan.price} />
                <Card.Content>
                    <Text>{plan.details}</Text>
                </Card.Content>
                <Card.Actions>
                    <Button onPress={() => showModal(plan)}>Read More</Button>
                </Card.Actions>
                </Card>
            ))}
            </ScrollView>

            {/* Step 1 Modal: Plan Info */}
            <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
                <Text style={styles.modalTitle}>{selectedPlan?.name}</Text>
                <Text>{selectedPlan?.details}</Text>
                <Button mode="contained" onPress={openStepTwo} style={styles.modalButton}>
                Continue
                </Button>
            </Modal>
            </Portal>

            {/* Step 2 Modal: Enter Amount */}
            <Portal>
            <Modal visible={stepTwoVisible} onDismiss={hideStepTwo} contentContainerStyle={styles.modalContainer}>
                <Text style={styles.modalTitle}>Enter Investment Amount</Text>
                <TextInput
                label="Amount"
                value={amount}
                onChangeText={(text) => setAmount(text)}
                keyboardType="numeric"
                style={styles.input}
                />
                <Button mode="contained" onPress={handleInvest} style={styles.modalButton}>
                Invest
                </Button>
            </Modal>
            </Portal>
        </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1, // Ensures the image fills the screen
    width: '100%', // Width matches viewport
    height: '100%', // Height matches viewport
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff'
  },
  scrollView: {
    paddingBottom: 20,
  },
  card: {
    marginBottom: 15,
    elevation: 4,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButton: {
    marginTop: 20,
  },
  input: {
    marginBottom: 20,
  },
});
