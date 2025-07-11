
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../features/cart/cartSlice";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  
  const id = product.id;
  const title = product.name ?? product.title;
  const price = product.price;
  const oldPrice = product.oldPrice;
  const discountPercent = product.discountPercent;
  const imageUrl = `http://localhost:3333${product.image}`;

  const [showModal, setShowModal] = useState(false);

  const handleAdd = () => {
    dispatch(
      addItemToCart({
        id,
        name: title, 
        price,
        image: imageUrl,
        quantity: 1,
      })
    );
    setShowModal(true);
    setTimeout(() => setShowModal(false), 2000);
  };

  return (
    <>
      <div className={styles.card}>
        <Link to={`/product/${id}`} className={styles.imageWrapper}>
          <img src={imageUrl} alt={title} className={styles.image} />
          {discountPercent && (
            <div className={styles.discountBadge}>-{discountPercent}%</div>
          )}
        </Link>
        <div className={styles.info}>
          <Link to={`/product/${id}`} className={styles.name}>
            {title}
          </Link>
          <div className={styles.priceWrapper}>
            <span className={styles.price}>${price}</span>
            {oldPrice && <span className={styles.oldPrice}>${oldPrice}</span>}
          </div>
          <button
            type="button"
            className={styles.addToCartBtn}
            onClick={handleAdd}
          >
            Add to cart
          </button>
        </div>
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button
              className={styles.closeBtn}
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <h2>Congratulations!</h2>
            <p>
              Product successfully added!
Your cart is waiting. Complete your purchase or continue shopping.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
