import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_pk);
import CheckOutForm from './ChechOutForm/CheckOutForm';

const Payment = () => {
  const { price, classId } = useLocation().state || {}; 
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    if (price) {
      fetch("http://localhost:5000/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: price }),
      })
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret);
        })
        .catch((error) => console.error("Error:", error));
    }
  }, [price]);

  return (
    <div className="my-32">
      {clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckOutForm clientSecret={clientSecret} classId={classId} />
        </Elements>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Payment;
