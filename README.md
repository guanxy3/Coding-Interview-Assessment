# Coding Interview Assessment

This repository contains solutions for all four parts of the coding interview assessment.

## Repository Structure

```text
A/
  main.py
B/
  main.py
C/
  answers.md
frontend/
  package.json
  index.html
  src/
README.md
```

## Task A: Mystic Waves

Run:

```bash
cd A
python main.py
```

After entering all input, press:

- **Windows**: Ctrl + Z, then press Enter
- **Mac / Linux**: Ctrl + D

Example:

```text
Input:
4
1 4
2 5
3 6
4 7

Output:
0
2
0
4
```

## Task B: CargoCraft Fleet

Run:

```bash
cd B
python main.py
```

After entering all input, press:

- **Windows**: Ctrl + Z, then press Enter
- **Mac / Linux**: Ctrl + D

Example:

```text
Input:
4
4
7
24
998244353998244352

Output:
1 1
-1
4 6
166374058999707392 249561088499561088
```

## Task C: API Questions

The written answers are in:

```text
C/answers.md
```

## Frontend: Product Detail Page

The frontend is a React + TypeScript PDP using local mock APIs for product loading and add-to-cart.

Run:

```bash
cd frontend
npm install
npm run dev
```

Build:

```bash
cd frontend
npm run build
```

The page supports:

- Product image, name, price, stock status, and description
- Two variant dimensions: color and capacity
- SKU-specific price and stock updates
- Quantity validation with a minimum of 1 and maximum of available stock
- Add-to-cart success feedback and cart count updates
- Loading, product API error, cart API error, and out-of-stock states

To simulate mock API errors:

- Product load error: add `?error=product` to the URL
- Cart API error: add `?error=cart` to the URL

## Assumptions

- Xero API answers are based on OAuth 2.0 and the Xero Accounting API.
- The frontend uses local mock APIs and does not connect to a real backend.
- Product data is static mock data stored in the frontend source code.
- Add-to-cart behavior is simulated in frontend memory.
