import React, { useState } from "react";
import { useStripe } from "@stripe/stripe-react-native";
import { StyleSheet, Image, View, Text, Button } from "react-native";

type PaymentOption = {
  image: string;
  label: string;
};

export const PaymentScreen = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [cardInformations, setCardInformations] = useState<PaymentOption | undefined>();

  const onPress = async () => {
    const { error } = await initPaymentSheet({
      customFlow: true,
      paymentIntentClientSecret:
        "",
      merchantDisplayName: "ExpoTest",
      returnURL: "google.com",
    });

    if (!error) {
      const { error: presentError, paymentOption } =
        await presentPaymentSheet();

      if (!presentError) {
        if (paymentOption) {
          console.log(paymentOption.image);

          setCardInformations(paymentOption);
        }
      }
    }
  };

  return (
    <View style={styles.display}>
      <Button title="test" onPress={onPress} />
      <View style={styles.paymentContainer}>
        <Image
          resizeMode="center"
          height={20}
          width={40}
          source={{
            uri: `data:image/png;base64,${cardInformations?.image}`,
          }}
        />
        <Text>{cardInformations?.label}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  display: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    alignItems: "center",
    height: 72,
  },
  paymentContainer: {
    flexDirection: "row",
  },
});
