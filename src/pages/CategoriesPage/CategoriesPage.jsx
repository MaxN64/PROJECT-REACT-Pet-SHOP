import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../features/categories/categoriesSlice";
import { Link } from "react-router-dom";
import styles from "./CategoriesPage.module.css";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3333";

export default function CategoriesPage() {
  const dispatch = useDispatch();
  const {
    items: categories,
    status,
    error,
  } = useSelector((state) => state.categories);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  if (status === "loading") return <p>Loading categories…</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumbs}>
        <Link to="/" className={styles.breadcrumb}>
          Main page
        </Link>
        <span className={styles.separator}>/</span>
        <span className={styles.breadcrumbActive}>Categories</span>
      </nav>

      <h1 className={styles.title}>Categories</h1>

      <div className={styles.grid}>
        {categories.map((cat) => {
          const imgUrl = cat.image.startsWith("http")
            ? cat.image
            : `${BASE_URL}${cat.image}`;

          return (
            <Link
              key={cat.id}
              to={`/categories/${cat.id}`}
              className={styles.card}
            >
              <img
                src={imgUrl}
                alt={cat.title}
                className={styles.image}
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <span className={styles.name}>{cat.title}</span>
            </Link>
          );
        })}
      </div>

      {categories.length === 0 && <p>No categories found.</p>}
    </div>
  );
}
