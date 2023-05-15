import { Datepicker, Input, initTE } from "tw-elements";
import { useEffect } from "react";
import { Holding } from "../types";

type Props<T> = {
  fieldLabel: string;
  fieldName: keyof T;
  holding: T;
  setHolding: (holding: T) => void;
};

const NfDatepicker = <T extends Holding>({
  fieldLabel,
  fieldName,
  holding,
  setHolding,
}: Props<T>) => {
  useEffect(() => {
    initTE({ Datepicker, Input });
  }, []);

  return (
    <div
      className="relative mb-3"
      data-te-datepicker-init
      data-te-input-wrapper-init
      data-te-format="mm-dd-yyyy"
      data-te-inline="true"
    >
      <label>
        <span className="font-satoshi font-semibold text-base text-gray-700">
          {fieldLabel}
        </span>
      </label>
      <input
        type="text"
        className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        placeholder="Select a date"
        value={holding[fieldName] as string}
        onChange={(e) =>
          setHolding({ ...holding, [fieldName]: e.target.value })
        }
      />
    </div>
  );
};

export default NfDatepicker;
