
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "../../features/products/productsSlice";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./AllProductsPage.module.css";

export default function AllProductsPage() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.products.productsList);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [discountedOnly, setDiscountedOnly] = useState(false);
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  
  const filteredItems = items
    .filter((item) => {
      const price = item.price;
      if (minPrice && price < parseFloat(minPrice)) return false;
      if (maxPrice && price > parseFloat(maxPrice)) return false;
       if (discountedOnly) {
     
      if (item.discont_price == null || item.discont_price >= item.price) {
        return false;
      }
    }

    return true;
  });

  
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortOption) {
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "high-low":
        return b.price - a.price;
      case "low-high":
        return a.price - b.price;
      default:
        return 0;
    }
  });

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumbs}>
        <Link to="/" className={styles.breadcrumb}>
          Main page
        </Link>
        <span className={styles.separator}>/</span>
        <span className={styles.breadcrumbActive}>All products</span>
      </nav>

      <h1 className={styles.title}>All products</h1>

      
      <div className={styles.filterContainer}>
        <div className={styles.filterItem}>
          <label>Price</label>
          <input
            type="number"
            placeholder="from"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className={styles.priceInput}
          />
          <input
            type="number"
            placeholder="to"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className={styles.priceInput}
          />
        </div>

        <div className={styles.filterItem}>
          <label>Discounted items</label>
          <input
            type="checkbox"
            checked={discountedOnly}
            onChange={(e) => setDiscountedOnly(e.target.checked)}
          />
        </div>

        <div className={styles.filterItem}>
          <label>Sorted</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className={styles.sortSelect}
          >
            <option value="default">by default</option>
            <option value="newest">newest</option>
            <option value="high-low">price: high-low</option>
            <option value="low-high">price: low-high</option>
          </select>
        </div>
      </div>

      
      {loading && <p className={styles.message}>Loading all products…</p>}
      {error && <p className={styles.message}>Error: {error}</p>}

      
      {!loading && !error && (
        <div className={styles.grid}>
          {sortedItems.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )}
    </div>
  );
}
