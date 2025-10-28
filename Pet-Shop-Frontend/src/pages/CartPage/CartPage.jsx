
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeItemFromCart,
  clearCart,
} from "../../features/cart/cartSlice";
import { useForm } from "react-hook-form";
import axios from "axios";
import styles from "./CartPage.module.css";

export default function CartPage() {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount } = useSelector(
    (state) => state.cart
  );

  const [isModalOpen, setModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3333";

  const makeImageUrl = (imgPath) => {
    if (!imgPath) return null;
    if (imgPath.startsWith("http")) return imgPath;
    const clean = imgPath.startsWith("/") ? imgPath.slice(1) : imgPath;
    return `${BASE_URL}/${clean}`;
  };

  const onSubmit = async (customerData) => {
    const payload = {
      customer: customerData,
      items: items.map((i) => ({
        productId: i.id,
        quantity: i.quantity,
        price: i.price,
      })),
      totalAmount,
    };

    try {
      await axios.post(`${BASE_URL}/order/send`, payload);

      setModalOpen(true);
    } catch (err) {
      console.error("Order error:", err);
      alert("Не удалось оформить заказ. Попробуйте позже.");
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    dispatch(clearCart());
  };

  return (
    <div className={styles.container}>
      <h1>Shopping cart</h1>

      {totalQuantity > 0 ? (
        <div className={styles.cartGrid}>
          <div className={styles.itemsList}>
            {items.map((item) => {
              const img = makeImageUrl(item.image);
              return (
                <div key={item.id} className={styles.cartItem}>
                  {img ? (
                    <img
                      src={img}
                      alt={item.name}
                      className={styles.itemImage}
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  ) : (
                    <div className={styles.noImage}>No image</div>
                  )}
                  <div className={styles.itemInfo}>
                    <h3>{item.name}</h3>
                    <div className={styles.quantityControl}>
                      <button
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => dispatch(increaseQuantity(item.id))}
                      >
                        +
                      </button>
                    </div>
                    <span className={styles.itemPrice}>
                      ${item.price * item.quantity}
                    </span>
                  </div>
                  <button
                    className={styles.removeBtn}
                    onClick={() => dispatch(removeItemFromCart(item.id))}
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>

          <div className={styles.orderDetails}>
            <h2>Order details</h2>
            <p>{items.length} items</p>
            <p className={styles.totalLabel}>
              Total: <span className={styles.totalValue}>${totalAmount}</span>
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className={styles.orderForm}
            >
              <div className={styles.formGroup}>
                <input
                  type="text"
                  placeholder="Name"
                  {...register("name", { required: "Введите имя" })}
                />
                {errors.name && (
                  <span className={styles.error}>{errors.name.message}</span>
                )}
              </div>
              <div className={styles.formGroup}>
                <input
                  type="tel"
                  placeholder="Phone number"
                  {...register("phone", { required: "Введите телефон" })}
                />
                {errors.phone && (
                  <span className={styles.error}>{errors.phone.message}</span>
                )}
              </div>
              <div className={styles.formGroup}>
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: "Введите email" })}
                />
                {errors.email && (
                  <span className={styles.error}>{errors.email.message}</span>
                )}
              </div>
              <button type="submit" className={styles.orderBtn}>
                The Order is Placed
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className={styles.emptyContainer}>
          <p>Looks like you have no items in your basket currently.</p>
          <a href="/products" className={styles.continueShoppingBtn}>
            Continue Shopping
          </a>
        </div>
      )}

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.modalClose} onClick={closeModal}>
              ×
            </button>
            <h2>Congratulations!</h2>
            <p>Your order has been successfully placed on the website.</p>
            <p>A manager will contact you shortly to confirm your order.</p>
          </div>
        </div>
      )}
    </div>
  );
}
