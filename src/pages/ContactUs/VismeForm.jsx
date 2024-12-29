import React, { useEffect } from "react";

const HeartMateForm = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static-bundles.visme.co/forms/vismeforms-embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section>
      <div
        className="visme_d"
        data-title="HeartMate"
        data-url="z4ryx1jy-heartmate"
        data-domain="forms"
        data-full-page="false"
        data-min-height="500px"
        data-form-id="58551"
      ></div>
    </section>
  );
};

export default HeartMateForm;
