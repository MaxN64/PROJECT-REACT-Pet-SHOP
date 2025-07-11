import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Header.module.css";

export default function Header() {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/" onClick={handleLinkClick}>
          <img
            src="/assets/logo.svg"
            alt="Pet Shop"
            className={styles.logoImage}
          />
        </Link>
      </div>

      <button
        className={styles.burger}
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Toggle menu"
      >
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
      </button>

      <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? styles.activeLink : undefined
          }
          onClick={handleLinkClick}
        >
          Main Page
        </NavLink>
        <NavLink
          to="/categories"
          className={({ isActive }) =>
            isActive ? styles.activeLink : undefined
          }
          onClick={handleLinkClick}
        >
          Categories
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? styles.activeLink : undefined
          }
          onClick={handleLinkClick}
        >
          All products
        </NavLink>
        <NavLink
          to="/sales"
          className={({ isActive }) =>
            isActive ? styles.activeLink : undefined
          }
          onClick={handleLinkClick}
        >
          All sales
        </NavLink>
      </nav>

      <div className={styles.cartIcon}>
        <Link to="/cart" onClick={handleLinkClick}>
          <img src="/assets/basket.svg" alt="Cart" className={styles.basket} />
          {totalQuantity > 0 && (
            <span className={styles.badge}>{totalQuantity}</span>
          )}
        </Link>
      </div>
    </header>
  );
}
