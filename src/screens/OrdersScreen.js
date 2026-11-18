
import React from 'react';

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native';

import { COLORS } from '../styles/colors';

const OrdersScreen = ({ orders, onBack }) => {
  const formatPrice = (price) =>
    '$' + price.toLocaleString('es-CO');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Text style={styles.backText}>← Volver</Text>
        </Pressable>

        <Text style={styles.logo}>KIVORA.</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Mis pedidos 📦</Text>

        <Text style={styles.subtitle}>
          Consulta tus compras realizadas.
        </Text>

        {orders.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>📦</Text>

            <Text style={styles.emptyTitle}>
              Todavía no tienes pedidos
            </Text>

            <Text style={styles.emptyText}>
              Cuando confirmes una compra, aparecerá aquí.
            </Text>

            <Pressable style={styles.button} onPress={onBack}>
              <Text style={styles.buttonText}>Volver al catálogo</Text>
            </Pressable>
          </View>
        ) : (
          orders.map((order) => (
            <View key={order.id} style={styles.card}>
              <View style={styles.orderHeader}>
                <View>
                  <Text style={styles.orderCode}>
                    Pedido {order.id}
                  </Text>

                  <Text style={styles.date}>
                    {order.date}
                  </Text>
                </View>

                <Text style={styles.status}>
                  {order.status}
                </Text>
              </View>

              <View style={styles.separator} />

              <Text style={styles.sectionTitle}>
                Productos
              </Text>

              {order.products.map((product) => (
                <View key={product.id} style={styles.productRow}>
                  <Text style={styles.productName}>
                    {product.icono} {product.nombre} x{product.quantity}
                  </Text>

                  <Text style={styles.productPrice}>
                    {formatPrice(product.precio * product.quantity)}
                  </Text>
                </View>
              ))}

              <View style={styles.separator} />

              <View style={styles.row}>
                <Text>Comprador</Text>
                <Text style={styles.value}>{order.buyer.nombre}</Text>
              </View>

              <View style={styles.row}>
                <Text>Municipio</Text>
                <Text style={styles.value}>{order.buyer.municipio}</Text>
              </View>

              <View style={styles.row}>
                <Text>Subtotal</Text>
                <Text>{formatPrice(order.subtotal)}</Text>
              </View>

              <View style={styles.row}>
                <Text>Descuento</Text>
                <Text style={styles.discount}>
                  -{formatPrice(order.discount)}
                </Text>
              </View>

              <View style={styles.row}>
                <Text>Envío</Text>
                <Text>
                  {order.shipping === 0
                    ? 'Gratis'
                    : formatPrice(order.shipping)}
                </Text>
              </View>

              <View style={styles.separator} />

              <View style={styles.row}>
                <Text style={styles.totalLabel}>Total pagado</Text>
                <Text style={styles.total}>
                  {formatPrice(order.total)}
                </Text>
              </View>

              <Text style={styles.simulation}>
                Pedido registrado como simulación. Sin pago real.
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default OrdersScreen;

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
    marginTop: 5,
    marginBottom: 20,
  },
  empty: {
    backgroundColor: COLORS.white,
    padding: 28,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 25,
  },
  emptyIcon: {
    fontSize: 55,
  },
  emptyTitle: {
    color: COLORS.primary,
    fontSize: 17,
    fontWeight: '800',
    marginTop: 12,
  },
  emptyText: {
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: 8,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 13,
    borderRadius: 9,
    marginTop: 18,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '800',
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 17,
    marginBottom: 16,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderCode: {
    color: COLORS.primary,
    fontWeight: '900',
    fontSize: 16,
  },
  date: {
    color: COLORS.gray,
    fontSize: 11,
    marginTop: 5,
  },
  status: {
    color: COLORS.success,
    fontWeight: '800',
    fontSize: 11,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginVertical: 13,
  },
  sectionTitle: {
    color: COLORS.primary,
    fontWeight: '900',
    marginBottom: 12,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 10,
  },
  productName: {
    color: COLORS.text,
    fontSize: 12,
    flex: 1,
  },
  productPrice: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 11,
    gap: 10,
  },
  value: {
    color: COLORS.text,
    fontWeight: '700',
    flexShrink: 1,
    textAlign: 'right',
  },
  discount: {
    color: COLORS.success,
    fontWeight: '700',
  },
  totalLabel: {
    color: COLORS.primary,
    fontWeight: '900',
    fontSize: 15,
  },
  total: {
    color: COLORS.primary,
    fontWeight: '900',
    fontSize: 18,
  },
  simulation: {
    color: COLORS.gray,
    fontSize: 10,
    textAlign: 'center',
    marginTop: 8,
  },
});
