import React from "react";
import Visible from "../../assets/icons/visible.svg";

type Props = {
  hasIntroduction?: boolean;
  title?: string;
  description?: string;
  children: any;
  required?: boolean;
  isVisible?: boolean;
};

const FormSection = ({
  hasIntroduction = false,
  title,
  description,
  required = false,
  isVisible = true,
  children
}: Props) => (
  <section className="mt-4 container bg-white">
    <div className="row">
      <div className="col-10 offset-1 py-8">
        {hasIntroduction && (
          <p className="mb-10 text-base font-weight-normal text-black">
            Le domande contrassegnate con il simbolo * sono obbligatorie
            <br /> Le informazioni contrassegnate con il simbolo saranno
            visibili in app.
          </p>
        )}
        {title && (
          <div className="d-flex flex-row align-items-center">
            <h1 className="h4 font-weight-bold text-dark-blue mr-4">
              {title}
              {required && "*"}
            </h1>
            {isVisible && <Visible />}
          </div>
        )}
        {description && (
          <p className="text-sm font-weight-normal text-black">{description}</p>
        )}
        {children}
      </div>
    </div>
  </section>
);

export default FormSection;
