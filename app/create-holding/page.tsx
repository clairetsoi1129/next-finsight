"use client";

import { useState } from "react";
// import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import HoldingForm from "../(home)/HoldingForm";
import { Holding } from "../types";

const CreateHolding = () => {
  const router = useRouter();
  //   const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState<boolean>(false);
  const [holding, setHolding] = useState<Holding>({
    tradeDate: "",
    instrumentCode: "",
    marketCode: "",
    quantity: "",
    price: "",
    transactionType: "",
    exchangeRate: "",
    brokerage: "",
    brokerageCurrency: "",
  });

  const createHolding = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!holding) return;

      const response = await fetch("/api/holding", {
        method: "POST",
        body: JSON.stringify({
          tradeDate: holding.tradeDate,
          // userId: session?.user.id,
          instrumentCode: holding.instrumentCode,
          marketCode: holding.marketCode,
          quantity: holding.quantity,
          price: holding.price,
          transactionType: holding.transactionType,
          exchangeRate: holding.exchangeRate,
          brokerage: holding.brokerage,
          brokerageCurrency: holding.brokerageCurrency,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <HoldingForm
      type="Create"
      holding={holding}
      setHolding={setHolding}
      submitting={submitting}
      handleSubmit={createHolding}
    />
  );
};

export default CreateHolding;
