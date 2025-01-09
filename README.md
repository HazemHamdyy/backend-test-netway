
# Backend Developer Coding Test

Welcome to the Backend Developer Coding Test for the Backend Developer role! This test evaluates your skills in Node.js, Express.js, MongoDB, authentication, and API design.

## Test Objective

To create a Product Inventory System API with robust JWT authentication and authorization, proper input validation, caching, and optimized database querying.

---

## Project Features

### Authentication
- **Signup (`POST /auth/signup`)**: Create a new user account with a JWT token.
- **Login (`POST /auth/login`)**: Authenticate a user and generate a JWT token for subsequent API requests.

### Authorization
- Admin-only routes are protected by an authorization middleware that checks the user's role from the decoded JWT.

### Product Management
- **Create Product (`POST /products`)**: Add a new product. (Admin only)
- **List Products (`GET /products`)**: Retrieve a paginated list of products, with optional filtering by category.
- **Get Product by ID (`GET /products/:id`)**: Fetch details of a single product by its ID.
- **Update Product (`PUT /products/:id`)**: Modify an existing product. (Admin only)
- **Delete Product (`DELETE /products/:id`)**: Remove a product from the database. (Admin only)

---

## API Endpoints

### Authentication Endpoints
- **POST /auth/signup**  
  - Request Body:
    ```json
    {
      "email": "user@example.com",
      "password": "securepassword"
    }
    ```
  - Response:  
    ```json
    {
      "status": "success",
      "token": "jwt_token",
      "data": {
        "user": { "id": "user_id", "email": "user@example.com", "role": "CLIENT" }
      }
    }
    ```

- **POST /auth/login**  
  - Request Body:
    ```json
    {
      "email": "user@example.com",
      "password": "securepassword"
    }
    ```
  - Response:  
    ```json
    {
      "status": "success",
      "token": "jwt_token",
      "data": {
        "user": { "id": "user_id", "email": "user@example.com", "role": "CLIENT" }
      }
    }
    ```

### Product Endpoints
- **POST /products**  
  - Admin-only. Add a new product.
  - Request Body:
    ```json
    {
      "name": "Product Name",
      "category": "Category",
      "price": 100.0,
      "quantity": 10
    }
    ```

- **GET /products**  
  - Retrieve products with optional filtering by category and pagination.  
  - Query Parameters:
    - `category` (optional): Filter by category.
    - `page` (optional): Specify the page number (default is 1).
  - Response:
    ```json
    {
      "status": "success",
      "currentPage": 1,
      "data": {
        "products": [
          {
            "id": "product_id",
            "name": "Product Name",
            "category": "Category",
            "price": 100.0,
            "quantity": 10
          }
        ]
      }
    }
    ```

- **GET /products/:id**  
  - Fetch details of a product by ID.  

- **PUT /products/:id**  
  - Admin-only. Update an existing product.  
  - Request Body: Partial or full product details to update.

- **DELETE /products/:id**  
  - Admin-only. Delete a product.

---

## Database

The application uses MongoDB to manage data.  

### Product Schema
```json
{
  "name": { "type": "String", "required": true },
  "category": { "type": "String", "required": false },
  "price": { "type": "Number", "required": true },
  "quantity": { "type": "Number", "required": true },
  "createdAt": { "type": "Date", "default": "Date.now" },
  "updatedAt": { "type": "Date", "default": "Date.now" }
}
```

### User Schema
```json
{
  "email": { "type": "String", "required": true, "unique": true, "lowercase": true },
  "password": { "type": "String", "required": true, "select": false },
  "role": { "type": "String", "enum": ["client", "admin"], "default": "client" }
}
```

---

## Middleware

### Caching
The API uses a caching mechanism to optimize repeated queries:
- For product listing by category, results are cached for 30 minutes (TTL: 1800 seconds).

### Authorization Middleware
- Validates the user's JWT and checks if the user has the required role (e.g., admin) for restricted routes.

---

## How to Run

1. **Clone the Repository**  
   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```

2. **Install Dependencies**  
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**  
   Create a `.env` file and configure the following variables:
   ```
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/<db_name>
   JWT_SECRET=<your_secret_key>
   ```

4. **Run the Server**  
   ```bash
   npm start
   ```

5. **Test the Endpoints**  
   Use a tool like Postman or cURL to test the API endpoints.

---

## Optimization Techniques

### Database Indexing
- Added an index on the `category` field in the Product model to speed up queries for filtering by category.

### Caching
- Used a cache manager to cache product listing by category.

