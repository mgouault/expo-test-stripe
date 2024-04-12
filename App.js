import { StyleSheet, View } from "react-native";
import { StripeProvider } from "@stripe/stripe-react-native";
import { PaymentScreen } from "./PaymentScreen";

export const App = () => {
  return (
    <View style={styles.container}>
      <StripeProvider publishableKey="">
        <PaymentScreen />
      </StripeProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
