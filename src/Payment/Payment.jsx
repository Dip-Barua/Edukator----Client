import React, { useState, useEffect, useContext } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_pk);
import CheckOutForm from "../Payment/ChechOutForm/CheckOutForm";
import { authContext } from "../providers/AuthProvider";

const Payment = () => {
  const { price, classId } = useLocation().state || {}; 
  const [clientSecret, setClientSecret] = useState(null);
  const { user } = useContext(authContext); 

  useEffect(() => {
    if (price && user?.email) { 
      fetch("https://edukator-server.vercel.app/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: price, userId: user.email, classId }),
      })
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret);
        })
        .catch((error) => console.error("Error:", error));
    }
  }, [price, user, classId]);

  return (
    <div className="my-32">
      {clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckOutForm clientSecret={clientSecret} classId={classId} userId={user.email} />
        </Elements>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Payment;
