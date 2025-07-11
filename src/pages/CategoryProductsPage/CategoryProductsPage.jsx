import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsByCategory } from "../../features/categories/categoriesSlice";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./CategoryProductsPage.module.css";

export default function CategoryProductsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const allCategories = useSelector((state) => state.categories.items);

  const currentCategory = allCategories.find((cat) => String(cat.id) === id);

  const categoryState = useSelector(
    (state) =>
      state.categories.byId?.[id] || { items: [], status: "idle", error: null }
  );
  const { items, status, error } = categoryState;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProductsByCategory(id));
    }
  }, [dispatch, id, status]);

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
        <span className={styles.separator}>/</span>
        <span className={styles.breadcrumbActive}>
          {currentCategory ? currentCategory.title : `Category: ${id}`}
        </span>
      </nav>

      <h1 className={styles.title}>
        {currentCategory ? currentCategory.title : `Category: ${id}`}
      </h1>

      {status === "loading" && (
        <p className={styles.message}>Loading products…</p>
      )}
      {status === "failed" && <p className={styles.message}>Error: {error}</p>}
      {status === "succeeded" && items.length === 0 && (
        <p className={styles.message}>No products in this category.</p>
      )}

      {status === "succeeded" && items.length > 0 && (
        <div className={styles.grid}>
          {items.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )}
    </div>
  );
}
