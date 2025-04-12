import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { InputMask } from "@react-input/mask";

import flagBR from "../assets/flags/br.png";
import flagUS from "../assets/flags/us.png";

const countryOptions = [
  { id: 1, label: "Brasil", country: "br", countryCode: "+55", flag: flagBR },
  { id: 2, label: "Estados Unidos", country: "us", ddd: "+1", flag: flagUS },
];

function Modal({ showModal, createOrder, userData, setUserData }) {
  const [selectedCountry, setCountry] = useState(countryOptions[0]);
  const [showOptions, setShowOptions] = useState(false);

  const createPhoneMask = () => {
    if (selectedCountry.country === "br") return "+55 (__) _____-____";
    if (selectedCountry.country === "us") return "+1 (___) ___-____";
  };

  const handleConfirm = () => {
    createOrder();
    showModal(false);
  };

  return (
    <div
      className='modal'
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.4)",
        zIndex: 999,
      }}>
      <div
        className='modal-content-customer-info'
        style={{
          backgroundColor: "white",
          width: "500px",
          margin: "20% auto",
          padding: "20px",
          borderRadius: "5px",
        }}>
        <div style={{ marginBottom: "" }}>
          <FontAwesomeIcon icon={faArrowLeft} />
          <span style={{ marginLeft: "10px", fontWeight: "var(--semibold)" }}>Preencha os dados abaixo</span>
        </div>

        <form action='#' style={{ height: "400px", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginBottom: "25px" }}>
            <label htmlFor='name' style={{ fontWeight: "var(--semibold)" }}>
              Nome:
            </label>
            <input
              id='name'
              type='text'
              style={{
                border: "1px solid #cccccc",
                borderRadius: "5px",
                height: "40px",
                padding: "0px 10px",
              }}
              onChange={e => setUserData(prevValue => ({ ...prevValue, name: e.target.value }))}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}>
            <label htmlFor='name' style={{ fontWeight: "var(--semibold)" }}>
              Telefone:
            </label>
            <div
              style={{
                display: "flex",
                gap: "10px",
                height: "40px",
                position: "relative",
              }}>
              <div
                className='countries-flag'
                style={{
                  border: "1px solid #cccccc",
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  padding: "0px 10px",
                  gap: "15px",
                }}
                onClick={() => setShowOptions(prevValue => !prevValue)}>
                <img src={selectedCountry.flag} alt={selectedCountry.label} />
                <FontAwesomeIcon icon={showOptions ? faCaretUp : faCaretDown} />
              </div>
              <InputMask
                style={{
                  border: "1px solid #cccccc",
                  borderRadius: "5px",
                  flex: 1,
                  padding: "0px 10px",
                }}
                mask={createPhoneMask()}
                replacement={{ _: /\d/ }}
                onChange={e => setUserData(prevValue => ({ ...prevValue, phone: e.target.value.replace(/\D/g, "") }))}
              />
              {showOptions && (
                <ul
                  style={{
                    position: "absolute",
                    top: 41,
                    height: "100px",
                    borderRadius: "5px",
                    boxShadow: "#ccc 0px 2px 10px",
                    width: "80%",
                  }}>
                  {countryOptions.map(country => (
                    <li
                      key={country.id}
                      style={{
                        listStyle: "none",
                        display: "flex",
                        alignItems: "center",
                        padding: "10px",
                        gap: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setCountry(country);
                        setShowOptions(false);
                      }}>
                      <img src={country.flag} alt={country.label} />
                      <span>{country.label}</span>
                      <span>{country.code}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div
            style={{
              backgroundColor: userData.name && userData.phone.length === 13 ? "var(--brand-color)" : "#ececec",
              marginTop: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px 0px",
              borderRadius: "3px",
              color: userData.name && userData.phone.length === 13 ? "white" : "gray",
              fontWeight: "var(--semibold)",
              cursor: userData.name && userData.phone.length === 13 ? "pointer" : "default",
              boxShadow: userData.name && userData.phone.length === 13 ? "var(--brand-color) 0px 0px 5px" : "none",
            }}
            onClick={handleConfirm}>
            <span>Confirmar</span>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Modal;
