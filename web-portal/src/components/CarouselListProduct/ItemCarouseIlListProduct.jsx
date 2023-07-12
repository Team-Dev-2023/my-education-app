import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Tooltip } from "antd";

import { checkCourseInCart } from "utils/helpers/cart.helper";
import ShowDetailCart from "./ShowDetailCart";
import CartProduct from "./CartProduct";

function ItemCarouseIlListProduct({ carouseProduct }) {
  const isLargeScreen = window.innerWidth > 980;

  const { cartData } = useSelector((state) => state.cart);
  const [existsInCart, setExistsInCart] = useState(false);

  useEffect(() => {
    cartData.data !== [] &&
      setExistsInCart(checkCourseInCart(carouseProduct.uuid, cartData.data));
  }, [cartData]);

  return (
    <div>
      {isLargeScreen ? (
        <Tooltip
          placement="right"
          title={ShowDetailCart(carouseProduct, existsInCart)}
          color={"#ffff"}
          className="bg-white"
        >
          {CartProduct(carouseProduct)}
        </Tooltip>
      ) : (
        <> {CartProduct(carouseProduct)}</>
      )}
    </div>
  );
}
export default ItemCarouseIlListProduct;
