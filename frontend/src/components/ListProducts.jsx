import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { productsList } from "../data";
import Product from "./Product";
import Cart from "./Cart";
import logo from "../assets/logo-hortibom-v2.png";
import { faCircleInfo, faInbox, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import ShoppingBag from "./ShoppingBag";
ShoppingBag;

// Lazy loading
const BottomCartBar = lazy(() => import("./BottomCartBar"));

function ListProducts() {
  const [searchProduct, setSearchProduct] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [showShoppingBag, setShowShoppingBag] = useState(false);
  const cartRef = useRef(null);
  const products = productsList;

  useEffect(() => {
    if (cartRef.current) {
      cartRef.current.scrollTo({
        top: cartRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [cartItems]);

  const searchProductNormalized = searchProduct
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  const filteredProducts = products.filter(product =>
    product.name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .includes(searchProductNormalized)
  );

  const addToCart = (id, name, unit, price, selectedQuantity = 1) => {
    setCartItems(prevItems => {
      const found = prevItems.find(product => product.id === id);

      if (found) {
        return prevItems.map(product =>
          product.id === id
            ? {
                ...product,
                quantity: product.quantity + selectedQuantity,
                // totalPrice: +(selectedQuantity * product.price).toFixed(2),
                // toFixed(2) transforma em string com duas casa decimais
                // + ou Number() no inicio transforma de volta para numero
              }
            : product
        );
      } else {
        let newProduct = {
          id: id,
          name: name,
          quantity: selectedQuantity,
          unit: unit,
          price: price,
        };

        return [...prevItems, newProduct];
      }
    });
  };

  const removeFromCart = id => {
    const found = cartItems.find(product => product.id === id);

    if (found) {
      setCartItems(prevItems => {
        if (found.quantity > 1) {
          const newCartItems = prevItems.map(product =>
            product.id === id
              ? {
                  ...product,
                  quantity: product.quantity - 1,
                  totalPrice: +((product.quantity - 1) * product.price).toFixed(2),
                }
              : product
          );
          return newCartItems;
        } else if (found.quantity === 1) {
          return prevItems.filter(product => product.id !== id);
        }
      });
    }
  };

  return (
    <>
      <main
        style={{
          flex: 1,
          height: "100vh",
          overflowY: "scroll",
          // overflowX: "hidden",
          // scrollbarWidth: "none", // Firefox
          // msOverflowStyle: "none", // IE e Edge antigos
        }}>
        <div className='list-products-navbar'>
          <div className='logo-navbar'>
            <img src={logo} alt='logo hortibom' />
          </div>
          <div className='info'>
            <p className='title'>Hortibom</p>
            <ul className='buttons'>
              <li>
                <a href='https://www.instagram.com/hortifrut_hortibom/' target='_blank' rel='noopener noreferrer'>
                  <FontAwesomeIcon icon={faInstagram} size='lg' />
                </a>
              </li>
              <li>
                <a href='https://www.instagram.com/hortifrut_hortibom/' target='_blank' rel='noopener noreferrer'>
                  <FontAwesomeIcon icon={faShareNodes} size='lg' />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className='searchbar-list-products'>
          <input
            type='text'
            style={{
              flex: 1,
              padding: "0px 10px",
              border: "1px #cccc solid",
            }}
            onChange={e => setSearchProduct(e.target.value)}
            value={searchProduct}
          />
          <div
            style={{
              flex: 0.1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "0px 5px",
              backgroundColor: "white",
              border: "1px #cccc solid",
              fontSize: "0.8rem",
              cursor: "pointer",
              fontWeight: "var(--semibold)",
              color: "gray",
            }}
            onClick={() => setSearchProduct("")}>
            <span>LIMPAR</span>
          </div>
        </div>
        <section className='list-products-container'>
          {filteredProducts.map(product => (
            <Product
              key={product.id}
              {...product}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              cartItems={cartItems}
            />
          ))}
        </section>
        <Suspense fallback={null}>
          {cartItems.length > 0 && (
            <BottomCartBar numItems={cartItems.length} setShowShoppingBag={setShowShoppingBag} />
          )}
        </Suspense>
        {showShoppingBag && (
          <ShoppingBag
            cartItems={cartItems}
            cartRef={cartRef}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            setShowShoppingBag={setShowShoppingBag}
          />
        )}
      </main>
      <Cart cartItems={cartItems} cartRef={cartRef} addToCart={addToCart} removeFromCart={removeFromCart} />
    </>
  );
}
export default ListProducts;
