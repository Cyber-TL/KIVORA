
import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';

import { COLORS } from '../styles/colors';

const CartScreen = ({
  cart,
  onBack,
  onIncrease,
  onDecrease,
  onRemove,
  onCheckout,
}) => {

  const formatPrice = (price) => {
    return '$' + price.toLocaleString('es-CO');
  };

  // Calcular subtotal
  const subtotal = cart.reduce(
    (total, item) => total + item.precio * item.quantity,
    0
  );

  // Calcular envío
  const shipping = cart.length === 0
    ? 0
    : subtotal >= 150000
      ? 0
      : 8000;

  // Calcular total
  const total = subtotal + shipping;

  return (
    <View style={styles.container}>

      {/* Encabezado */}
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Text style={styles.backText}>← Volver</Text>
        </Pressable>

        <Text style={styles.logo}>KIVORA.</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>Mi carrito 🛒</Text>

        <Text style={styles.subtitle}>
          {cart.reduce((sum, item) => sum + item.quantity, 0)}
          {' '}productos en tu carrito
        </Text>

        {cart.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🛍️</Text>

            <Text style={styles.emptyTitle}>
              Tu carrito está vacío
            </Text>

            <Text style={styles.emptyText}>
              Explora nuestros productos y agrega tus favoritos.
            </Text>

            <Pressable
              style={styles.continueButton}
              onPress={onBack}
            >
              <Text style={styles.buttonText}>
                Ir al catálogo
              </Text>
            </Pressable>
          </View>
        ) : (
          <>
            {/* Productos del carrito */}
            {cart.map((item) => (
              <View key={item.id} style={styles.productCard}>
                <View style={styles.productIconContainer}>
                  <Text style={styles.productIcon}>
                    {item.icono}
                  </Text>
                </View>

                <View style={styles.productInfo}>
                  <Text style={styles.productName}>
                    {item.nombre}
                  </Text>

                  <Text style={styles.productPrice}>
                    {formatPrice(item.precio)}
                  </Text>

                  <Text style={styles.stockText}>
                    Stock disponible: {item.stock}
                  </Text>

                  <View style={styles.quantityContainer}>
                    <Pressable
                      style={styles.quantityButton}
                      onPress={() => onDecrease(item.id)}
                    >
                      <Text style={styles.quantityButtonText}>−</Text>
                    </Pressable>

                    <Text style={styles.quantity}>
                      {item.quantity}
                    </Text>

                    <Pressable
                      style={styles.quantityButton}
                      onPress={() => onIncrease(item.id)}
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </Pressable>
                  </View>

                  <Text style={styles.lineTotal}>
                    Total: {formatPrice(item.precio * item.quantity)}
                  </Text>

                  <Pressable
                    onPress={() => onRemove(item.id)}
                  >
                    <Text style={styles.removeText}>
                      Eliminar producto
                    </Text>
                  </Pressable>
                </View>
              </View>
            ))}

            {/* Resumen de compra */}
            <View style={styles.summary}>
              <Text style={styles.summaryTitle}>
                Resumen de compra
              </Text>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryText}>Subtotal</Text>
                <Text style={styles.summaryValue}>
                  {formatPrice(subtotal)}
                </Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryText}>Envío</Text>
                <Text style={styles.summaryValue}>
                  {shipping === 0 ? 'Gratis' : formatPrice(shipping)}
                </Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>
                  {formatPrice(total)}
                </Text>
              </View>

              <Text style={styles.shippingMessage}>
                {subtotal >= 150000
                  ? '¡Felicidades! Tienes envío gratis.'
                  : `Agrega ${formatPrice(150000 - subtotal)} para obtener envío gratis.`}
              </Text>

              <Pressable
                style={styles.checkoutButton}
                onPress={onCheckout}
              >
                <Text style={styles.buttonText}>
                  Continuar compra
                </Text>
              </Pressable>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    backgroundColor: COLORS.primary,
    paddingTop: 45,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  backText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 14,
  },

  logo: {
    color: COLORS.white,
    fontSize: 23,
    fontWeight: '900',
  },

  content: {
    padding: 18,
    paddingBottom: 35,
  },

  title: {
    color: COLORS.primary,
    fontSize: 25,
    fontWeight: '900',
  },

  subtitle: {
    color: COLORS.gray,
    fontSize: 13,
    marginTop: 5,
    marginBottom: 20,
  },

  emptyContainer: {
    backgroundColor: COLORS.white,
    padding: 30,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 30,
  },

  emptyIcon: {
    fontSize: 55,
  },

  emptyTitle: {
    color: COLORS.primary,
    fontWeight: '800',
    fontSize: 18,
    marginTop: 15,
  },

  emptyText: {
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },

  continueButton: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
  },

  productCard: {
    backgroundColor: COLORS.white,
    padding: 14,
    borderRadius: 14,
    marginBottom: 14,
    flexDirection: 'row',
    gap: 14,
    elevation: 2,
  },

  productIconContainer: {
    width: 85,
    height: 85,
    backgroundColor: '#EAF5FC',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  productIcon: {
    fontSize: 40,
  },

  productInfo: {
    flex: 1,
  },

  productName: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: '800',
  },

  productPrice: {
    color: COLORS.secondary,
    fontSize: 15,
    fontWeight: '800',
    marginTop: 5,
  },

  stockText: {
    color: COLORS.gray,
    fontSize: 11,
    marginTop: 4,
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 14,
  },

  quantityButton: {
    backgroundColor: '#EAF5FC',
    width: 30,
    height: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  quantityButtonText: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: '800',
  },

  quantity: {
    color: COLORS.primary,
    fontWeight: '800',
    fontSize: 15,
  },

  lineTotal: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 10,
  },

  removeText: {
    color: COLORS.danger,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 8,
  },

  summary: {
    backgroundColor: COLORS.white,
    padding: 18,
    borderRadius: 15,
    marginTop: 10,
  },

  summaryTitle: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 18,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 13,
  },

  summaryText: {
    color: COLORS.text,
    fontSize: 14,
  },

  summaryValue: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '700',
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginVertical: 10,
  },

  totalLabel: {
    color: COLORS.primary,
    fontSize: 17,
    fontWeight: '900',
  },

  totalValue: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: '900',
  },

  shippingMessage: {
    color: COLORS.success,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 10,
  },

  checkoutButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 11,
    alignItems: 'center',
    marginTop: 20,
  },

  buttonText: {
    color: COLORS.white,
    fontWeight: '800',
    fontSize: 14,
  },
});
