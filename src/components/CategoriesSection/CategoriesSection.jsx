import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../features/categories/categoriesSlice';
import { Link } from 'react-router-dom';
import styles from './CategoriesSection.module.css';

const API_URL = 'http://localhost:3333';

export default function CategoriesSection() {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.items);
  const status = useSelector(state => state.categories.status);
  const error = useSelector(state => state.categories.error);

  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  if (status === 'loading') return <p>Loading…</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  const visibleCategories = categories.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, categories.length));
  };

  return (
    <section className={styles.categoriesSection}>
    
      <div className={styles.categoriesGrid}>
        {visibleCategories.map(cat => (
          <Link
            key={cat.id}
            to={`/categories/${cat.id}`}
            className={styles.categoryCard}
          >
            <img
              src={`${API_URL}${cat.image}`}
              alt={cat.title}
              className={styles.categoryImage}
            />
            <span>{cat.title}</span>
          </Link>
        ))}
      </div>
      {visibleCount < categories.length && (
        <button onClick={handleLoadMore} className={styles.loadMoreButton}>
          Load more
        </button>
      )}
    </section>
  );
}
