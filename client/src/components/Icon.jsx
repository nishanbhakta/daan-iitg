import React from "react";

const Icon = ({ path: IconComponent, className = "w-6 h-6" }) => {
  if (!IconComponent) return null;

  return <IconComponent className={className} />;
};

export default Icon;
