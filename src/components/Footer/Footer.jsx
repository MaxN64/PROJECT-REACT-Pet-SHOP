
import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.contactBlock}>
        <h3>Contact</h3>

        <div className={styles.infoRow}>
          <div className={styles.infoItem}>
            <span className={styles.label}>Phone</span>
            <span className={styles.value}>+49 30 915-88492</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Socials</span>
            <div className={styles.socialIcons}>
             
             
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                 <img
            src="/assets/ic-instagram.svg"
            alt="instagram"
            className={styles.basket}
          />
              </a>
              <a href="https://wa.me/..." target="_blank" rel="noreferrer">
                    <img
            src="/assets/ic-whatsapp.svg"
            alt="whatsapp"
            className={styles.basket}
          />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.infoRow}>
          <div className={styles.infoItem}>
            <span className={styles.label}>Address</span>
            <span className={styles.value}>
              Wallstraße 9-13, 10179 Berlin, Deutschland
            </span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Working Hours</span>
            <span className={styles.value}>24 hours a day</span>
          </div>
        </div>

        <div className={styles.mapContainer}>
          <iframe
            title="Pet Shop Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.226957784835!2d13.40071757716871!3d52.511231636878016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84e27dade5561%3A0x2454d91ffab308fa!2sWallstra%C3%9Fe%209-13%2C%2010179%20Berlin!5e0!3m2!1sde!2sde!4v1748719313917!5m2!1sde!2sde"
            width="100%"
            height="350"
            style={{ border: 0, borderRadius: '8px' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </footer>
  );
}
