const express = require('express');
const router = express.Router();
const authToken = require('../middleware/authToken');

const userSignUpController = require("../controller/user/userSignUp");
const userSignInController = require('../controller/user/userSignIn');
const userDetailsController = require('../controller/user/userDetails');
const userLogout = require('../controller/user/userLogout');
const allUsers = require('../controller/user/allUsers');
const updateUser = require('../controller/user/updateUser');
const UploadProductController = require('../controller/product/uploadProduct');
const getProductController = require('../controller/product/getProduct');
const updateProductController = require('../controller/product/updateProduct');
const getCategoryProduct = require('../controller/product/getCategoryProductOne');
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct');
const getProductDetails = require('../controller/product/getProductDetails');
const addToCartController = require('../controller/user/addToCartController');
const countAddToCartProduct = require('../controller/user/countAddToCartProduct');
const addToCartViewProduct = require('../controller/user/addToCartViewProduct');
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct');
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct');
const searchProduct = require('../controller/product/searchProduct');
const filterProductController = require('../controller/product/filterProduct');
const {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    acceptOrder,
    refuseOrder,
    deleteOrder
} = require('../controller/order/OrderController');

const {
    joinChat,
    sendMessage,
    assignAdmin
} = require('../controller/chat/chatController');

// User routes
router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);
router.get("/all-user", authToken, allUsers);
router.post("/update-user", authToken, updateUser);

// Product routes
router.post("/upload-product", authToken, UploadProductController);
router.get("/get-product", getProductController);
router.post("/update-product", authToken, updateProductController);
router.get("/get-categoryProduct", getCategoryProduct);
router.post("/category-product", getCategoryWiseProduct);
router.post("/product-details", getProductDetails);
router.get("/search", searchProduct);
router.post("/filter-product", filterProductController);

// User add to cart routes
router.post("/addtocart", authToken, addToCartController);
router.get("/countAddToCartProduct", authToken, countAddToCartProduct);
router.get("/view-card-product", authToken, addToCartViewProduct);
router.post("/update-cart-product", authToken, updateAddToCartProduct);
router.post("/delete-cart-product", authToken, deleteAddToCartProduct);

// Order routes
router.post('/orders', authToken, createOrder);
router.get('/orders', authToken, getAllOrders);
router.get('/orders/:id', authToken, getOrderById);
router.put('/orders/:id', authToken, updateOrder);
router.put('/orders/:id/accept', authToken, acceptOrder);
router.put('/orders/:id/refuse', authToken, refuseOrder);
router.delete('/orders/:id', authToken, deleteOrder);

// Chat routes
router.post('/chat/join', authToken, joinChat);
router.post('/chat/message', authToken, sendMessage);
router.post('/chat/assign', authToken, assignAdmin);

module.exports = router;
