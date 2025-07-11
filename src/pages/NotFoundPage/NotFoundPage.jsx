
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <div className={styles.errorBlock}>
        <span className={styles.errorCode}> <img
          src="/assets/4.png"
          alt="Pets"
          className={styles.heroImage}
        />
        <span className={styles.paw}> <img
          src="/assets/mage.png"
          alt="Pets"
         
        /></span>
        
         <img
          src="/assets/4.png"
          alt="Pets"
         
        /></span>
        <h2>Page Not Found</h2>
        <p>We’re sorry, the page you requested could not be found.<br />Please go back to the homepage.</p>
        <Link to="/" className={styles.homeBtn}>Go Home</Link>
      </div>
    </div>
  );
}
