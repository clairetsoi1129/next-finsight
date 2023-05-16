"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Holding } from "../types";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  type: string;
  holding: Holding;
  setHolding: (holding: Holding) => void;
  submitting: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const HoldingForm = ({
  type,
  holding,
  setHolding,
  submitting,
  handleSubmit,
}: Props) => {
  const [tradeDate, setTradeDate] = useState(new Date());
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left px-5">
        <span className="blue_gradient">{type} Holding</span>
      </h1>
      <p className="desc text-left max-w-md px-5">
        {type} the holding in your portfolio
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 px-5 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Trade Date
          </span>

          <DatePicker
            dateFormat="MM/dd/yyyy"
            selected={tradeDate}
            className="form_input"
            onChange={(date) => {
              date && setTradeDate(date);
              date &&
                setHolding({
                  ...holding,
                  tradeDate: date.toLocaleDateString("en-US"),
                });
            }}
          />
        </label>

        <div>
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Ticker
            </span>

            <input
              value={holding.instrumentCode}
              onChange={(e) =>
                setHolding({ ...holding, instrumentCode: e.target.value })
              }
              type="text"
              required
              className="form_input"
            />
          </label>
        </div>

        <div>
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Exchange
            </span>

            <input
              value={holding.marketCode}
              onChange={(e) =>
                setHolding({ ...holding, marketCode: e.target.value })
              }
              type="text"
              required
              className="form_input"
            />
          </label>
        </div>

        <div>
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Quantity
            </span>
            <input
              value={holding.quantity}
              onChange={(e) =>
                setHolding({ ...holding, quantity: e.target.value })
              }
              type="number"
              required
              className="form_input"
            />
          </label>
        </div>

        <div>
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Price
            </span>
            <input
              value={holding.price}
              onChange={(e) =>
                setHolding({ ...holding, price: e.target.value })
              }
              type="text"
              required
              className="form_input"
            />
          </label>
        </div>

        <div>
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Transaction Type
            </span>
            <input
              value={holding.transactionType}
              onChange={(e) =>
                setHolding({ ...holding, transactionType: e.target.value })
              }
              type="text"
              required
              className="form_input"
            />
          </label>
        </div>

        <div>
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Exchange Rate (with Base Currency)
            </span>
            <input
              value={holding.exchangeRate}
              onChange={(e) =>
                setHolding({ ...holding, exchangeRate: e.target.value })
              }
              type="text"
              required
              className="form_input"
            />
          </label>
        </div>

        <div>
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Brokerage
            </span>
            <input
              value={holding.brokerage}
              onChange={(e) =>
                setHolding({ ...holding, brokerage: e.target.value })
              }
              type="text"
              required
              className="form_input"
            />
          </label>
        </div>

        <div>
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Brokerage currency
            </span>
            <input
              value={holding.brokerageCurrency}
              onChange={(e) =>
                setHolding({ ...holding, brokerageCurrency: e.target.value })
              }
              type="text"
              required
              className="form_input"
            />
          </label>
        </div>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-black"
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default HoldingForm;
