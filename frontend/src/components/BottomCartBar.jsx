import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
faBasketShopping;

function BottomCartBar({ numItems, setShowShoppingBag }) {
  return (
    <div className='cartbar-container' onClick={() => setShowShoppingBag(true)}>
      <div className='icon-shopping'>
        <FontAwesomeIcon icon={faBasketShopping} size='lg' />
        <span className='number-of-items'>{numItems}</span>
      </div>

      <span>Ver sacola</span>
    </div>
  );
}
export default BottomCartBar;
