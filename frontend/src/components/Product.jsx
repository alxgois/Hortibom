import { useState } from "react";
import QuantitySelector from "./QuantitySelector";
import productImgDefault from "../assets/products/no-img.png";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Product({ id, image, category, name, defaultQuantity, unit, price, addToCart, removeFromCart, cartItems }) {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedUnit, setSelectedUnit] = useState("kg");

  return (
    <article
      className='product-container'
      style={{
        background: "var(--global-background-color-containers)",
        boxShadow: "#ececec  2px 3px 20px",
        borderRadius: "10px",
        padding: "10px",
      }}>
      {/* Row 1 */}
      <div
        style={{
          display: "flex",
          height: "100px",
          // marginBottom: "10px",
        }}>
        <div className='img-container'>
          <img src={image || productImgDefault} alt={name} loading='lazy' />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            padding: "10px",
          }}>
          {/* <p className='category'>{category}</p> */}
          <p className='name'>{name}</p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <p
            style={{
              fontWeight: "var(--bold)",
              fontSize: "1rem",
              textAlign: "end",
              borderBottom: "1px solid #ececec",
            }}>
            R$ {price.toFixed(2)}
          </p>
          <p style={{ color: "var(--brand-color)" }}>{unit}</p>
        </div>
      </div>
      {/* Row 2 */}
      {/* <div
        style={{
          flex: 1,
          gap: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            backgroundColor: "rgba(241, 241, 241, 0.93)",
            borderRadius: "10px",
          }}>
          <div
            style={{
              flex: 0.5,
              display: "flex",
              padding: "5px 0px",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: selectedUnit === "kg" ? "rgba(0, 0, 0, 0.7)" : "rgba(241, 241, 241, 0.93)",
              color: selectedUnit === "kg" ? "white" : "black",
              borderRadius: "10px",
            }}
            onClick={() => setSelectedUnit("kg")}>
            kg
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: selectedUnit === "unidade" ? "rgba(0, 0, 0, 0.7)" : "rgba(241, 241, 241, 0.93)",
              color: selectedUnit === "unidade" ? "white" : "black",
              borderRadius: "10px",
            }}
            onClick={() => setSelectedUnit("unidade")}>
            Unidade
          </div>
        </div>
        <div style={{ flex: 0.4 }}>
          <p
            style={{
              fontWeight: "var(--semibold)",
              fontSize: "1.2rem",
              textAlign: "end",
            }}>
            R$ {price.toFixed(2)}
          </p>
        </div>
      </div> */}
      {/* Row 3 */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "space-between",
          alignItems: "center",
          height: "35px",
        }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            height: "100%",
            borderRadius: "5px",
            border: "1px #ecececec solid",
          }}>
          <div
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              fontSize: "2rem",
              WebkitUserSelect: "none",
              cursor: "pointer",
            }}
            onClick={() => setSelectedQuantity(prevQuantity => (prevQuantity === 1 ? 1 : prevQuantity - 1))}>
            <p>-</p>
          </div>
          <div
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              borderLeft: "1px #ececec solid",
              borderRight: "1px #ececec solid",
            }}>
            <p
              style={{
                fontWeight: "var(--semibold)",
                fontSize: "1.2rem",
              }}>
              {selectedQuantity}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.5rem",
              WebkitUserSelect: "none",
              cursor: "pointer",
            }}
            onClick={() => setSelectedQuantity(prevQuantity => prevQuantity + 1)}>
            <p>+</p>
          </div>
        </div>
        <div
          style={{
            flex: 0.4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "var(--brand-color)",
            height: "100%",
            borderRadius: "5px",
            color: "white",
            WebkitUserSelect: "none",
            cursor: "pointer",
            fontSize: "0.8rem",
            gap: "5px",
            padding: "0px 5px",
          }}
          onClick={() => addToCart(id, name, unit, price, selectedQuantity)}>
          <p>Adicionar</p>
          <FontAwesomeIcon icon={faCartShopping} />
        </div>
      </div>
    </article>
  );
}
export default Product;
