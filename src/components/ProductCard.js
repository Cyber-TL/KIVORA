
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';

import { COLORS } from '../styles/colors';

const ProductCard = ({
  product,
  onPress,
  onAddToCart,
  onFavorite,
  isFavorite
}) => {
  const formatPrice = (price) => {
    return '$' + price.toLocaleString('es-CO');
  };

  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
    >
      {/* Imagen o icono del producto */}
      <View style={styles.imageContainer}>
        <Text style={styles.productIcon}>
          {product.icono}
        </Text>

        <Pressable
          style={styles.favoriteButton}
          onPress={(event) => {
            event.stopPropagation();
            onFavorite(product.id);
          }}
        >
          <Text style={styles.favoriteIcon}>
            {isFavorite ? '❤️' : '🤍'}
          </Text>
        </Pressable>
      </View>

      {/* Información del producto */}
      <View style={styles.infoContainer}>
        <Text style={styles.category}>
          {product.categoria}
        </Text>

        <Text style={styles.productName} numberOfLines={2}>
          {product.nombre}
        </Text>

        <Text style={styles.stock}>
          {product.stock > 0
            ? `Disponibles: ${product.stock}`
            : 'Agotado'}
        </Text>

        <Text style={styles.price}>
          {formatPrice(product.precio)}
        </Text>

        <Pressable
          style={[
            styles.addButton,
            product.stock === 0 && styles.disabledButton,
          ]}
          disabled={product.stock === 0}
          onPress={(event) => {
            event.stopPropagation();
            onPress();
          }}
        >
          <Text style={styles.addButtonText}>
            {product.stock > 0 ? 'Ver producto' : 'Agotado'}
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    width: '48%',
    borderRadius: 16,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },

  imageContainer: {
    height: 125,
    backgroundColor: '#EAF5FC',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  productIcon: {
    fontSize: 55,
  },

  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: COLORS.white,
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },

  favoriteIcon: {
    fontSize: 17,
  },

  infoContainer: {
    padding: 12,
  },

  category: {
    color: COLORS.secondary,
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 5,
  },

  productName: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: '700',
    minHeight: 38,
  },

  stock: {
    color: COLORS.gray,
    fontSize: 11,
    marginTop: 5,
  },

  price: {
    color: COLORS.primary,
    fontSize: 17,
    fontWeight: '800',
    marginTop: 8,
    marginBottom: 10,
  },

  addButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 9,
    alignItems: 'center',
  },

  disabledButton: {
    backgroundColor: COLORS.gray,
  },

  addButtonText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
});
