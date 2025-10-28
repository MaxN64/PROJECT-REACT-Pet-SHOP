PROJECT-REACT-PET-SHOP
Monorepo for a pet products online store: React (Create React App) frontend and Node.js/Express + Sequelize + SQLite backend.

PROJECT-REACT-PET-SHOP/
├─ Pet-Shop-Frontend/   # React client application
└─ Pet-Shop-Backend/    # REST API (Express + Sequelize + SQLite)

1) Frontend — Pet-Shop-Frontend
Tech stack & versions
React: ^19.1.0
react-dom: ^19.1.0
react-scripts (CRA): 5.0.1
react-router-dom: ^6.30.1
@reduxjs/toolkit: ^2.8.2
react-redux: ^9.2.0
axios: ^1.9.0
react-hook-form: ^7.56.4



Scripts
Run from Pet-Shop-Frontend:

npm start       # dev server (CRA), default: http://localhost:3000
npm run build   # production build
npm test        # tests (CRA)
npm run eject   # CRA eject (irreversible)

API base URL
The base API URL is hard-coded as http://localhost:3333 in:
src/features/products/productsAPI.js
src/features/categories/categoriesAPI.js

The frontend does not use env variables for API URL. If you change the backend host/port, update these two files accordingly.

SPA routes

Defined in src/App.jsx:

/                 — HomePage
/categories       — CategoriesPage
/categories/:id   — CategoryProductsPage
/products         — AllProductsPage
/sales            — SalesPage
/product/:id      — ProductDetailPage
/cart             — CartPage
*                 — NotFoundPage

State management (Redux)
Store config: src/app/store.js

Slices:
products — src/features/products/productsSlice.js
thunks: fetchAllProducts, fetchDiscountedProducts, fetchProductById
API client: src/features/products/productsAPI.js
categories — src/features/categories/categoriesSlice.js
thunks: fetchCategories, fetchProductsByCategory
API client: src/features/categories/categoriesAPI.js
cart — src/features/cart/cartSlice.js
actions: addItemToCart, removeItemFromCart, increaseQuantity, decreaseQuantity, clearCart
state shape: items[], totalQuantity, totalAmount

Key components & pages
src/components/Header/Header.jsx — logo, navigation, cart badge (uses /public/assets/...)
src/components/Footer/Footer.jsx
src/components/ProductCard/ProductCard.jsx
src/components/CategoriesSection/CategoriesSection.jsx

Pages: HomePage, CategoriesPage, CategoryProductsPage, AllProductsPage, SalesPage, ProductDetailPage, CartPage, NotFoundPage

https://github.com/MaxN64/PROJECT-REACT-Pet-SHOP/blob/master/Pet-Shop-Frontend/public/docs/190815.png


Public assets
public/index.html
public/assets/* (icons, logo, images)
2) Backend — Pet-Shop-Backend
Tech stack & versions

Node.js/Express
Sequelize: ^6.23.2
SQLite3: ^5.1.1
cors: ^2.8.5
Dev: nodemon ^2.0.20
package.json (backend):

{
  "name": "project_backend",
  "version": "1.0.0",
  "author": "astemir",
  "license": "ISC",
  "main": "index.js",
  "scripts": {
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.1",
    "sequelize": "^6.23.2",
    "sqlite3": "^5.1.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.20"
  }
}

Run locally

From Pet-Shop-Backend:

npm install
npm run dev        # starts nodemon
# server listens on http://localhost:3333


Port: 3333 (hard-coded in index.js)
CORS: open to all origins (origin: '*')
Static: app.use(express.static('public')) → everything under public/ is served as static
Database
SQLite file: Pet-Shop-Backend/database.sqlite
Connection config: database/database.js
new Sequelize({ dialect: 'sqlite', storage: './database.sqlite' })
Models (Sequelize):
database/models/category.js
category: { id (PK, autoincrement), title TEXT, image TEXT }
database/models/product.js

product: {
  id (PK, autoincrement),
  title TEXT,
  price INTEGER,
  discont_price INTEGER,   // may be null
  description TEXT,
  image TEXT
}


Association: Category.hasMany(Product) (see index.js)
Sync: sequelize.sync() runs on startup
Static files (public/)
public/category_img/ — category images
public/product_img/ — product images
Static URLs example:
http://localhost:3333/category_img/<file>
http://localhost:3333/product_img/<file>
(public/ is the static root.)
API routes
Mounted in index.js:
app.use('/categories', categories);
app.use('/products', products);
app.use('/sale', sale);
app.use('/order', order);
/categories (see routes/categories.js)
GET /categories/all — returns all categories (Category.findAll())
GET /categories/:id — returns products by category
Response shape: { category, data: Product[] }
If empty: { status: 'ERR', message: 'empty category' }
/products (see routes/products.js)
GET /products/all — returns all products (Product.findAll())
GET /products/:id — returns product by id (the frontend uses this endpoint)
GET /products/add/:title/:price/:discont_price/:description — quick demo insert via URL params (for debugging/demo)
Note: Even though the file preview might look truncated, the handler for GET /products/:id is present and used by the frontend.
/sale (see routes/sale.js)
GET /sale/send — stub { }
POST /sale/send — stub { status: 'OK', message: 'request processed' }
/order (see routes/order.js)
GET /order/send — stub { }
POST /order/send — stub { status: 'OK', message: 'request processed' }

Local development (Frontend + Backend)

Start the backend:
cd Pet-Shop-Backend
npm install
npm run dev            # http://localhost:3333


Start the frontend:
cd ../Pet-Shop-Frontend
npm install
npm start              # http://localhost:3000
