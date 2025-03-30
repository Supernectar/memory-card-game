import React, { useState, forwardRef, Ref } from "react";

interface CardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onRotate?: () => void;
}

const Card = forwardRef<HTMLButtonElement, CardProps>(
  ({ onRotate, ...props }, ref: Ref<HTMLButtonElement>) => {
    const [rotated, setRotated] = useState(false);

    const handleClick = () => {
      setRotated(true);

      if (onRotate) {
        onRotate();
      }
    };

    return (
      <button
        ref={ref}
        className={`flex size-32 items-center justify-center rounded-lg bg-blue-500 text-white shadow-lg transition-transform ${
          rotated ? "rotate-180" : ""
        }`}
        onClick={handleClick}
        disabled={rotated}
        {...props}
      >
        <div className="text-center">Click to Rotate</div>
      </button>
    );
  },
);

export { Card };
