export const numberFormat = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);

export const Offers = () => {
  
  return (
    <div className="card" id="offer">
      <h4 className="buynowsubHeading">Offers</h4>
      <ul className="buynowOffers">
        <li>
          Get Rs.200 instant discount on your First Purchase above ₹999. Coupon
          code -NEW200 Whistles!
        </li>
        <li>
          Get extra 20% Cashback on prepaid orders above ₹499. Coupon code -
          NEW20. For new customers.
        </li>
        <li>5% Cashback upto ₹100 on a minimum spend of ₹1,500 with PayPal.</li>
      </ul>
    </div>
  );
};