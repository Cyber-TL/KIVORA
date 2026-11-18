
import React, { useState, useEffect } from 'react';
import {
  Alert,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { PRODUCTS } from './src/data/products';

import HomeScreen from './src/screens/HomeScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import CartScreen from './src/screens/CartScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import OrdersScreen from './src/screens/OrdersScreen';
import SellerScreen from './src/screens/SellerScreen';

const STORAGE_KEY = '@kivora_data';

export default function App() {
  const [products, setProducts] = useState(PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('home');

  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedData = await AsyncStorage.getItem(STORAGE_KEY);

        if (savedData) {
          const data = JSON.parse(savedData);

          setProducts(
            Array.isArray(data.products) ? data.products : PRODUCTS
          );

          setCart(
            Array.isArray(data.cart) ? data.cart : []
          );

          setFavorites(
            Array.isArray(data.favorites) ? data.favorites : []
          );

          setOrders(
            Array.isArray(data.orders) ? data.orders : []
          );

          setReviews(
            Array.isArray(data.reviews) ? data.reviews : []
          );
        }
      } catch (error) {
        Alert.alert(
          'KIVORA',
          'No se pudieron recuperar los datos guardados.'
        );
      } finally {
        setIsReady(true);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const saveData = async () => {
      try {
        const data = {
          products,
          cart,
          favorites,
          orders,
          reviews,
        };

        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(data)
        );
      } catch (error) {
        console.log('Error al guardar los datos:', error);
      }
    };

    saveData();
  }, [products, cart, favorites, orders, reviews, isReady]);

  const handleAddToCart = (product) => {
    const currentProduct = products.find(
      (item) => item.id === product.id
    );

    if (!currentProduct || currentProduct.stock <= 0) {
      Alert.alert('KIVORA', 'Este producto está agotado.');
      return;
    }

    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    const currentQuantity = existingProduct
      ? existingProduct.quantity
      : 0;

    if (currentQuantity >= currentProduct.stock) {
      Alert.alert('KIVORA', 'No hay más unidades disponibles.');
      return;
    }

    if (existingProduct) {
      setCart((previous) =>
        previous.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart((previous) => [
        ...previous,
        { ...currentProduct, quantity: 1 },
      ]);
    }

    Alert.alert('KIVORA', 'Producto agregado al carrito.');
  };

  const increaseQuantity = (productId) => {
    const product = products.find(
      (item) => item.id === productId
    );

    setCart((previous) =>
      previous.map((item) => {
        if (item.id === productId) {
          if (!product || item.quantity >= product.stock) {
            Alert.alert('KIVORA', 'Has alcanzado el stock disponible.');
            return item;
          }

          return { ...item, quantity: item.quantity + 1 };
        }

        return item;
      })
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((previous) =>
      previous
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((previous) =>
      previous.filter((item) => item.id !== productId)
    );
  };

  const toggleFavorite = (productId) => {
    setFavorites((previous) =>
      previous.includes(productId)
        ? previous.filter((id) => id !== productId)
        : [...previous, productId]
    );
  };

  const handleSaveProduct = (product) => {
    setProducts((previous) => {
      const exists = previous.some(
        (item) => item.id === product.id
      );

      if (exists) {
        return previous.map((item) =>
          item.id === product.id ? product : item
        );
      }

      return [...previous, product];
    });
  };

  const handleAddReview = (productId, rating, comment) => {
    const newReview = {
      id: `R${Date.now()}`,
      productId,
      rating,
      comment,
      date: new Date().toLocaleDateString('es-CO'),
    };

    setReviews((previous) => [newReview, ...previous]);
  };

  const goHome = () => {
    setCurrentScreen('home');
    setSelectedProduct(null);
  };

  const confirmPurchase = (buyer, discount) => {
    if (cart.length === 0) {
      Alert.alert('KIVORA', 'Tu carrito está vacío.');
      return;
    }

    const stockIsAvailable = cart.every((cartItem) => {
      const product = products.find(
        (item) => item.id === cartItem.id
      );

      return product && product.stock >= cartItem.quantity;
    });

    if (!stockIsAvailable) {
      Alert.alert(
        'Stock insuficiente',
        'Uno de tus productos ya no tiene suficientes unidades disponibles. Revisa tu carrito.'
      );
      return;
    }

    const subtotal = cart.reduce(
      (total, item) => total + item.precio * item.quantity,
      0
    );

    const shipping = subtotal >= 150000 ? 0 : 8000;
    const total = subtotal - discount + shipping;

    const order = {
      id: 'KIV-' + Date.now().toString().slice(-8),
      date: new Date().toLocaleString('es-CO'),
      buyer,
      products: cart.map((item) => ({ ...item })),
      subtotal,
      discount,
      shipping,
      total,
      status: 'Confirmado',
    };

    setProducts((previous) =>
      previous.map((product) => {
        const purchasedItem = cart.find(
          (item) => item.id === product.id
        );

        if (purchasedItem) {
          return {
            ...product,
            stock: product.stock - purchasedItem.quantity,
          };
        }

        return product;
      })
    );

    setOrders((previous) => [order, ...previous]);

    setCart([]);

    setCurrentScreen('orders');
    setSelectedProduct(null);

    Alert.alert(
      '¡Compra confirmada!',
      `Tu pedido ${order.id} fue registrado correctamente.`
    );
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const favoriteProducts = products.filter(
    (product) => favorites.includes(product.id)
  );

  if (!isReady) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingLogo}>KIVORA.</Text>
        <ActivityIndicator size="large" color="#36C5F0" />
        <Text style={styles.loadingText}>
          Recuperando tus datos...
        </Text>
      </View>
    );
  }

  if (currentScreen === 'seller') {
    return (
      <SellerScreen
        products={products}
        onBack={goHome}
        onSaveProduct={handleSaveProduct}
      />
    );
  }

  if (currentScreen === 'detail' && selectedProduct) {
    const updatedProduct = products.find(
      (item) => item.id === selectedProduct.id
    );

    const productReviews = reviews.filter(
      (review) => review.productId === selectedProduct.id
    );

    return (
      <ProductDetailScreen
        product={updatedProduct || selectedProduct}
        reviews={productReviews}
        onAddReview={handleAddReview}
        onBack={goHome}
        onAddToCart={handleAddToCart}
      />
    );
  }

  if (currentScreen === 'favorites') {
    return (
      <FavoritesScreen
        favorites={favoriteProducts}
        onBack={goHome}
        onProductPress={(product) => {
          setSelectedProduct(product);
          setCurrentScreen('detail');
        }}
        onFavorite={toggleFavorite}
        onAddToCart={handleAddToCart}
      />
    );
  }

  if (currentScreen === 'cart') {
    return (
      <CartScreen
        cart={cart}
        onBack={goHome}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        onRemove={removeFromCart}
        onCheckout={() => setCurrentScreen('checkout')}
      />
    );
  }

  if (currentScreen === 'checkout') {
    return (
      <CheckoutScreen
        cart={cart}
        onBack={() => setCurrentScreen('cart')}
        onConfirm={confirmPurchase}
      />
    );
  }

  if (currentScreen === 'orders') {
    return (
      <OrdersScreen
        orders={orders}
        onBack={goHome}
      />
    );
  }

  return (
    <HomeScreen
      products={products}
      favorites={favorites}
      onFavorite={toggleFavorite}
      onProductPress={(product) => {
        setSelectedProduct(product);
        setCurrentScreen('detail');
      }}
      onAddToCart={handleAddToCart}
      onCartPress={() => setCurrentScreen('cart')}
      onFavoritesPress={() => setCurrentScreen('favorites')}
      onOrdersPress={() => setCurrentScreen('orders')}
      onSellerPress={() => setCurrentScreen('seller')}
      cartCount={cartCount}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#14213D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingLogo: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 3,
    marginBottom: 30,
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 13,
    marginTop: 15,
  },
});
