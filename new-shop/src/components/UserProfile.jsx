import React from "react";

export default function UserProfile({ user }) {
  const { photoURL, displayName } = user;
  return (
    <div className="flex items-center mr-2 shrink-0">
      <img src={photoURL} alt={displayName} className="w-8 h-8 rounded-full mr-2" />
      <span className="hidden md:block text-2xl">{displayName}</span>
    </div>
  );
}
