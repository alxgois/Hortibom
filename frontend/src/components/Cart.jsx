import { useState } from "react";
import Modal from "./Modal";

import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function Cart({ cartItems, cartRef, addToCart, removeFromCart }) {
  const orderTotalPrice = cartItems.reduce(
    (accumulator, currentValue) => accumulator + currentValue.quantity * currentValue.price,
    0
  );
  const [showModalOrder, setShowModalOrder] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    address: "",
    observations: "",
  });

  const checkUnit = (quantity, unit) => {
    if (unit.toLowerCase() === "unidade") {
      if (quantity > 1) {
        return "unidades";
      } else {
        return "unidade";
      }
    }
    return unit;
  };

  const createOrder = async () => {
    try {
      const docRef = await addDoc(collection(db, "pedidos"), {
        endereco: userData.address,
        itens: cartItems,
        nome: userData.name,
        telefone: userData.phone,
      });
      console.log("Documento gerado com ID: ", docRef.id);

      const itemList = cartItems.map(item => `▫️ ${item.name} - ${item.quantity} ${item.unit}`).join("\n");

      const message = `🍓 *Novo Pedido Hortibom!* 

🆔 *Pedido ID:* ${docRef.id}
 
👤 *Cliente:* ${userData.name}
📞 *Telefone:* ${userData.phone}
📍 *Endereço:* ${userData.address}

📝 *Itens do Pedido:*\n${itemList}
  
💰 *Valor total:* 
💳 *Pagamento:* 
  
${cartItems.observations ? `📌 *Observações:* ${userData.observations}` : ""}`;

      const whatsappURL = `https://api.whatsapp.com/send?phone=${userData.phone}&text=${encodeURIComponent(message)}`;
      window.open(whatsappURL);
    } catch (e) {
      console.log("Ocorreu um erro durante a gravacao do pedido. Erro: ", e);
    }
  };

  return (
    <>
      <aside
        ref={cartRef}
        className='cartbar'
        style={{
          width: "320px",
          minHeight: "100vh",
          height: "100%",
          position: "fixed",
          top: "0,",
          right: "0",
          backgroundColor: "white",
          padding: "20px 30px",
          boxShadow: "#cccccc 0px 0px 3px",
          overflowY: "scroll",
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE e Edge antigos
          // borderTopLeftRadius: "20px",
          // borderBottomLeftRadius: "20px",
        }}>
        <h2>Carrinho</h2>
        <div style={{ borderTop: "1px #ecececec solid", margin: "20px 0px" }}></div>
        {cartItems.map(({ id, name, quantity, unit, price }) => {
          return (
            <article key={id} style={{ marginBottom: "20px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <p style={{ fontWeight: "var(--semibold)" }}>{name}</p>
                <p>R${(quantity * price).toFixed(2)}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <p>{quantity + " " + checkUnit(quantity, unit)}</p>
                <div
                  className='prevent-select'
                  style={{
                    display: "flex",
                    gap: "5px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <span
                    onClick={() => removeFromCart(id)}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#ecececec",
                      width: "25px",
                      height: "25px",
                      borderRadius: "3px",
                      cursor: "pointer",
                    }}>
                    -
                  </span>
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#ecececec",
                      width: "25px",
                      height: "25px",
                      fontSize: "0.8rem",
                      borderRadius: "3px",
                    }}>
                    {quantity}
                  </span>
                  <span
                    onClick={() => addToCart(id, name, unit, price)}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#ecececec",
                      width: "25px",
                      height: "25px",
                      borderRadius: "3px",
                      cursor: "pointer",
                    }}>
                    +
                  </span>
                </div>
              </div>
            </article>
          );
        })}
        <div style={{ marginBottom: "120px" }}></div>
        <div
          style={{
            position: "fixed",
            zIndex: 1,
            bottom: 0,
            right: 0,
            width: "320px",
            // height: "120px",
            padding: "0px 30px",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            borderTop: "1px #ecececec solid",
            paddingTop: "20px",
            paddingBottom: "20px",
          }}>
          {/* <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "1.3rem",
              fontWeight: "var(--bold)",
              marginBottom: "10px",
            }}>
            <p>Total</p>
            <p>R${orderTotalPrice.toFixed(2)}</p>
          </div> */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "var(--brand-color)",
              color: "white",
              height: "40px",
              borderRadius: "3px",
              cursor: "pointer",
              boxShadow: "var(--brand-color) 0px 0px 5px",
            }}
            onClick={() => setShowModalOrder(true)}>
            Enviar Pedido
          </div>
        </div>
        {showModalOrder && (
          <Modal
            showModal={setShowModalOrder}
            createOrder={createOrder}
            userData={userData}
            setUserData={setUserData}
          />
        )}
      </aside>
    </>
  );
}
export default Cart;
