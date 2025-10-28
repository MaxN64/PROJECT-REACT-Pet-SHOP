import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../features/products/productsSlice";
import { Link } from "react-router-dom"; 
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./SalesPage.module.css";

export default function SalesPage() {
  const dispatch = useDispatch();
  const allItems = useSelector((state) => state.products.productsList);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  const saleItems = allItems.filter(
    (product) =>
      product.discont_price != null && product.discont_price < product.price
  );

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumbs}>
        <Link to="/" className={styles.breadcrumb}>
          Main page
        </Link>
        <span className={styles.separator}>/</span>
        <span className={styles.breadcrumbActive}>All sales</span>
      </nav>

      <h1 className={styles.title}>Sales</h1>

      {loading && <p className={styles.message}>Loading discounted items…</p>}
      {error && <p className={styles.message}>Error: {error}</p>}

      {!loading && !error && saleItems.length === 0 && (
        <p className={styles.message}>No discounted items.</p>
      )}

      {!loading && !error && saleItems.length > 0 && (
        <div className={styles.grid}>
          {saleItems.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                name: product.title,
                price: product.discont_price,
                oldPrice: product.price,
                image: product.image,
                discountPercent: Math.round(
                  (1 - product.discont_price / product.price) * 100
                ),
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
