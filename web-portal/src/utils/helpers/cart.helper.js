export const checkCourseInCart = (courseUuid, arrayDataCart) => {
  for (let i = 0; i < arrayDataCart.length; i++) {
    const course = arrayDataCart[i].course;
    if (course.uuid === courseUuid) {
      return true;
    }
  }
  return false;
};
export const calculateTotalCartAfterDiscount = (arrayDataCart) => {
  let total = 0;
  for (let i = 0; i < arrayDataCart.length; i++) {
    total = arrayDataCart[i].course.priceAfterDiscount + total;
  }
  return total;
};
export const calculateTotalCartBeforeDiscount = (arrayDataCart) => {
  let total = 0;
  for (let i = 0; i < arrayDataCart.length; i++) {
    total = arrayDataCart[i].course.price + total;
  }
  return total;
};
export const calculatePercentSaleOff = (price, priceAfterDiscount) => {
  let percent = ((price - priceAfterDiscount) / price) * 100;

  return percent.toFixed(0);
};
