import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

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
    <form onSubmit={handleSubmit}>
      <h2>Pay for your Class</h2>
      <CardElement />
      <button
        type="submit"
        disabled={processing || !stripe}
        className="btn bg-orange-500 w-full text-white mt-6"
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default CheckOutForm;
