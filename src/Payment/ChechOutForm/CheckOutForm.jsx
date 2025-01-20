import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  Grid,
  Alert,
} from "@mui/material";
import Headlines from "../../Pages/Shared/Headlines/Headlines";

const CheckOutForm = ({ clientSecret, classId, userId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    setProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: { card: cardElement },
        }
      );

      if (error) {
        setError(error.message);
      } else if (paymentIntent.status === "succeeded") {
        await fetch("http://localhost:5000/payment-success", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentIntent,
            userId,
            classId,
          }),
        });

        navigate(`/student-dashboard/enrolled-classes`);
      }
    } catch (err) {
      setError("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <> 
           <Headlines heading={"Make your payment"}></Headlines>
           <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    bgcolor="#f9f9f9"
  >
    <Card sx={{ maxWidth: 400, width: "100%" }} >
      <CardContent>
        <Typography variant="h5" gutterBottom align="center">
          Complete Your Payment
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center" mb={2}>
          Secure payment powered by Stripe
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2} p={2} border="1px solid #e0e0e0" borderRadius={1}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </Box>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={processing || !stripe}
              >
                {processing ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Pay Now"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  </Box>
    </>
  
  );
};

export default CheckOutForm;
