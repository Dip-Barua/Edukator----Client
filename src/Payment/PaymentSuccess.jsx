import React from "react";
import { useParams } from "react-router-dom";

const PaymentSuccess = () => {
  const { paymentId } = useParams();

  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p className="text-xl mt-4">Payment ID: {paymentId}</p>
      <p className="text-lg text-gray-500 mt-2">
        Thank you for your payment. Your transaction has been completed.
      </p>
    </div>
  );
};

export default PaymentSuccess;
