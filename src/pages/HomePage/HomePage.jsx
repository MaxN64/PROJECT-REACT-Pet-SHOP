
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllProducts }  from '../../features/products/productsSlice';
import { Link }              from 'react-router-dom';
import ProductCard           from '../../components/ProductCard/ProductCard';
import CategoriesSection     from '../../components/CategoriesSection/CategoriesSection';
import { useForm }           from 'react-hook-form';
import axios                 from 'axios';
import styles                from './HomePage.module.css';

export default function HomePage() {
  const dispatch     = useDispatch();
  const productsList = useSelector(s => s.products.productsList);
  const loading      = useSelector(s => s.products.loading);
  const error        = useSelector(s => s.products.error);

  
  const [isModalOpen, setModalOpen] = useState(false);

  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  
  const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3333';

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

 
  const discounted   = productsList.filter(p => p.discont_price != null && p.discont_price < p.price);
  const visibleSales = discounted.slice(0, 4);

  
  const onSubscribe = async data => {
    try {
      const res = await axios.post(`${BASE_URL}/sale/send`, data);
      if (res.data.status === 'OK') {
       
        setModalOpen(true);
        reset();
      } else {
        throw new Error('Unexpected response');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to subscribe. Please try again later.');
    }
  };

  
  const closeModal = () => setModalOpen(false);

  return (
    <div className={styles.container}>
     
      <section className={styles.hero}>
        <img src="/assets/hero-pets.png" alt="Pets" className={styles.heroImage} />
        <div className={styles.heroText}>
          <h1>Amazing Discounts on Pets Products!</h1>
          <Link to="/sales" className={styles.ctaButton}>Check out</Link>
        </div>
      </section>

     
      <section className={styles.categoriesSection}>
        <h2 className={styles.sectionTitle}>Categories</h2>
        <CategoriesSection />
      </section>

     
      <section className={styles.subscribeSection}>
        <div className={styles.imageWrapper}>
          <img src="./assets/dogs.png" alt="Pets" className={styles.petsImage} />
        </div>
        <div className={styles.subscribeText}>
          <h2>5% off on the first order</h2>
        </div>
        <form className={styles.subscribeForm} onSubmit={handleSubmit(onSubscribe)}>
          <input
            type="text"
            placeholder="Name"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <span className={styles.error}>{errors.name.message}</span>}

          <input
            type="tel"
            placeholder="Phone number"
            {...register('phone', { required: 'Phone is required' })}
          />
          {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}

          <input
            type="email"
            placeholder="Email"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <span className={styles.error}>{errors.email.message}</span>}

          <button type="submit">Get a discount</button>
        </form>
      </section>

      
      <section className={styles.saleSection}>
        <div className={styles.saleHeader}>
          <h2>Sale</h2>
          <Link to="/sales" className={styles.viewAll}>All sales</Link>
        </div>
        <div className={styles.productsGrid}>
          {loading && <p>Loading...</p>}
          {!loading && !error && visibleSales.map(prod => {
            const discountPercent = Math.round((1 - prod.discont_price/prod.price)*100);
            return (
              <ProductCard
                key={prod.id}
                product={{
                  id: prod.id,
                  name: prod.title,
                  image: prod.image,
                  price: prod.discont_price,
                  oldPrice: prod.price,
                  discountPercent
                }}
              />
            );
          })}
          {!loading && !error && visibleSales.length===0 && <p>No discounted products available.</p>}
          {error && <p>Error loading products: {error}</p>}
        </div>
      </section>

      
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.modalClose} onClick={closeModal}>×</button>
            <h2>Thank you!</h2>
            <p>You’re now subscribed for 5% off on your first order.</p>
            <p>A manager will reach out to you shortly with the promo code.</p>
          </div>
        </div>
      )}

   
    </div>
  );
}
