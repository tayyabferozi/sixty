import React from "react";
import clsx from "clsx";

const CtaBtn = ({ primary, children }) => {
  return (
    <button className={clsx("cta-btn", { primary })}>
      <div className="btn-text">{children}</div>
    </button>
  );
};

export default CtaBtn;
