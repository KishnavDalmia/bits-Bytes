# Add New Order Functionality

The customer dashboard already has a "New Delivery Request" button, but it does nothing. This plan wires it up end-to-end: a modal form to capture order details, a backend API to save it, and the dashboard refreshing to show the newly created order.

Also fixes a typo in the Order model (`mongooose` → `mongoose`) and adds a `status` field needed by the UI.

## Proposed Changes

### Backend

#### [MODIFY] [order.js](file:///c:/Users/kishn/Desktop/SEM4/WebDev/bitsBytes/backend/models/order.js)
- Fix typo: `mongooose` → `mongoose`
- Add `status` field (`enum: ['pending', 'active', 'completed']`, default `'pending'`)
- Add `mongoose.model` export (currently missing)

#### [NEW] [orderController.js](file:///c:/Users/kishn/Desktop/SEM4/WebDev/bitsBytes/backend/controllers/orderController.js)
- `createOrder(req, res)` — reads `from`, [to](file:///c:/Users/kishn/Desktop/SEM4/WebDev/bitsBytes/client/src/pages/customer/CustomerDashboard.jsx#8-36), `description` from body + `userId` from session, creates Order
- `getMyOrders(req, res)` — returns all orders for `req.session.userId`

#### [NEW] [orderRoute.js](file:///c:/Users/kishn/Desktop/SEM4/WebDev/bitsBytes/backend/routes/orderRoute.js)
- `POST /api/orders` → `createOrder`
- `GET /api/orders/mine` → `getMyOrders`

#### [MODIFY] [server.js](file:///c:/Users/kishn/Desktop/SEM4/WebDev/bitsBytes/backend/server.js)
- Mount `orderRouter` at `/api/orders`

---

### Frontend

#### [NEW] [NewOrderModal.jsx + NewOrderModal.css](file:///c:/Users/kishn/Desktop/SEM4/WebDev/bitsBytes/client/src/components/NewOrderModal/NewOrderModal.jsx)
- Slide-in/overlay modal with `From`, `To`, and `Description` fields
- On submit → `POST /api/orders` with `withCredentials: true`
- On success → calls `onSuccess()` callback so the dashboard refreshes

#### [MODIFY] [CustomerDashboard.jsx](file:///c:/Users/kishn/Desktop/SEM4/WebDev/bitsBytes/client/src/pages/customer/CustomerDashboard.jsx)
- `useEffect` to fetch orders from `GET /api/orders/mine` on mount
- State: `orders`, `showModal`
- "New Delivery Request" button opens the modal
- Active orders (status `pending`/`active`) shown in **Active Deliveries**
- Completed orders shown in **Past Deliveries**
- Currently hard-coded dummy cards are replaced with real data

## Verification Plan

### Manual Verification
1. Start the backend: in `backend/`, run `node server.js`
2. Start the frontend: in `client/`, run `npm run dev`
3. Register a new Customer account and land on the Customer Dashboard
4. Click **"New Delivery Request"** — a modal should appear
5. Fill in From, To, and Description, then submit
6. Modal closes, the new order card appears in **Active Deliveries**
7. Refresh the page — the order should still be there (fetched from DB)
