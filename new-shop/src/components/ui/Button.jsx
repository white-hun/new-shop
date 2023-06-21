import React from "react";

export default function Button({ text, onClick }) {
  return (
    <button
      className="text-black text-2xl py-1 px-4 rounded-sm hover:brightness-110"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
