import React, { forwardRef, Ref } from "react";

type CardProps = {
  value: number;
  isFlipped: boolean;
  onRotate: () => void;
};

const Card = forwardRef<HTMLButtonElement, CardProps>(
  ({ value, isFlipped, onRotate }, ref: Ref<HTMLButtonElement>) => {
    return (
      <button
        ref={ref}
        className={`flex size-32 items-center justify-center rounded-lg bg-blue-500 text-white shadow-lg transition-transform`}
        onClick={onRotate}
        disabled={isFlipped}
      >
        {isFlipped ? value : "Click to Rotate"}
      </button>
    );
  },
);

export { Card };
