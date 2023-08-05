const calculateTotalPayment = async (cartData) => {
  if (cartData.length > 0) {
    const totalPrice = await cartData.reduce(
      (total, item) => (total += item.course.price * item.quantity),
      0
    );
    return totalPrice;
  }
};
const calculateTotalDiscounts = async (cartData) => {
  if (cartData.length > 0) {
    const totalDiscount = await cartData.reduce(
      (total, item) =>
        (total += item.course.priceAfterDiscount * item.quantity),
      0
    );
    return totalDiscount;
  }
};

export { calculateTotalPayment, calculateTotalDiscounts };
