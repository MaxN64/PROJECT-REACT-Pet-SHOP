import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductById,
  clearSelectedProduct,
} from "../../features/products/productsSlice";
import { addItemToCart } from "../../features/cart/cartSlice";
import { useParams, Link } from "react-router-dom";
import styles from "./ProductDetailPage.module.css";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3333";

export default function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector((s) => s.products.selectedProduct);
  const loading = useSelector((s) => s.products.loading);
  const error = useSelector((s) => s.products.error);

  const allCategories = useSelector((s) => s.categories.items);
  const category =
    product &&
    allCategories.find((c) => String(c.id) === String(product.categoryId));

  const [mainImg, setMainImg] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchProductById(id));
    return () => dispatch(clearSelectedProduct());
  }, [dispatch, id]);

  useEffect(() => {
    if (product && product.image) {
      const url = product.image.startsWith("http")
        ? product.image
        : `${BASE_URL}/${product.image.replace(/^\//, "")}`;
      setMainImg(url);
    }
  }, [product]);

  const handleAdd = () => {
    dispatch(
      addItemToCart({
        id: product.id,
        name: product.name,
        price: product.discont_price ?? product.price,
        image: mainImg,
        quantity,
      })
    );
    setShowModal(true);
    setTimeout(() => setShowModal(false), 3000);
  };

  if (loading) return <div className={styles.container}>Loading...</div>;
  if (error) return <div className={styles.container}>Error: {error}</div>;
  if (!product) return <div className={styles.container}>No product found</div>;

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumbs}>
        <Link to="/" className={styles.breadcrumb}>
          Main page
        </Link>
        <span className={styles.separator}>/</span>
        <Link to="/categories" className={styles.breadcrumb}>
          Categories
        </Link>
        {category && (
          <>
            <span className={styles.separator}>/</span>
            <Link
              to={`/categories/${category.id}`}
              className={styles.breadcrumb}
            >
              {category.title}
            </Link>
          </>
        )}
        <span className={styles.separator}>/</span>
        <span className={styles.breadcrumbActive}>{product.name}</span>
      </nav>

      <div className={styles.content}>
        <div className={styles.imagesSection}>
          <div className={styles.mainImageWrapper}>
            <img
              src={mainImg}
              alt={product.name}
              className={styles.mainImage}
            />
          </div>
          <div className={styles.thumbnails}>
            {[mainImg].map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`thumb-${idx}`}
                className={styles.thumbnail}
                onClick={() => setMainImg(src)}
              />
            ))}
          </div>
        </div>

        <div className={styles.infoSection}>
          <h1 className={styles.title}>{product.name}</h1>

          <div className={styles.priceWrapper}>
            <span className={styles.price}>
              ${product.discont_price ?? product.price}
            </span>
            {product.discont_price && (
              <>
                <span className={styles.oldPrice}>${product.price}</span>
                <span className={styles.discountBadge}>
                  -
                  {Math.round(
                    (1 - product.discont_price / product.price) * 100
                  )}
                  %
                </span>
              </>
            )}
          </div>

          <div className={styles.quantityControl11}>
            <div className={styles.quantityControl}>
              <button
                className={styles.qtyBtn}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span className={styles.qtyValue}>{quantity}</span>
              <button
                className={styles.qtyBtn}
                onClick={() => setQuantity((q) => q + 1)}
              >
                ＋
              </button>
            </div>

            <button className={styles.addToCartBtn} onClick={handleAdd}>
              Add to cart
            </button>
          </div>

          <div className={styles.description}>
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
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
              {" "}
              Product successfully added! Your cart is waiting. Complete your
              purchase or continue shopping.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
