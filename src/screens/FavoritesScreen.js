
import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';

import { COLORS } from '../styles/colors';

const FavoritesScreen = ({
  favorites,
  onBack,
  onProductPress,
  onFavorite,
  onAddToCart,
}) => {
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
        <Text style={styles.title}>Mis favoritos ❤️</Text>

        <Text style={styles.subtitle}>
          {favorites.length} productos guardados
        </Text>

        {favorites.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🤍</Text>

            <Text style={styles.emptyTitle}>
              Aún no tienes favoritos
            </Text>

            <Text style={styles.emptyText}>
              Explora el catálogo y guarda los productos que más te gusten.
            </Text>

            <Pressable style={styles.button} onPress={onBack}>
              <Text style={styles.buttonText}>Explorar productos</Text>
            </Pressable>
          </View>
        ) : (
          favorites.map((product) => (
            <View key={product.id} style={styles.card}>
              <Pressable
                style={styles.productArea}
                onPress={() => onProductPress(product)}
              >
                <View style={styles.iconContainer}>
                  <Text style={styles.productIcon}>
                    {product.icono}
                  </Text>
                </View>

                <View style={styles.info}>
                  <Text style={styles.category}>
                    {product.categoria}
                  </Text>

                  <Text style={styles.name}>
                    {product.nombre}
                  </Text>

                  <Text style={styles.price}>
                    {formatPrice(product.precio)}
                  </Text>

                  <Text style={styles.stock}>
                    {product.stock > 0
                      ? `${product.stock} disponibles`
                      : 'Agotado'}
                  </Text>
                </View>
              </Pressable>

              <View style={styles.actions}>
                <Pressable
                  onPress={() => onFavorite(product.id)}
                >
                  <Text style={styles.removeFavorite}>
                    ❤️ Quitar
                  </Text>
                </Pressable>

                <Pressable
                  style={[
                    styles.addButton,
                    product.stock === 0 && styles.disabled,
                  ]}
                  disabled={product.stock === 0}
                  onPress={() => onAddToCart(product)}
                >
                  <Text style={styles.buttonText}>
                    Agregar al carrito
                  </Text>
                </Pressable>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default FavoritesScreen;

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
    borderRadius: 16,
    padding: 28,
    alignItems: 'center',
    marginTop: 25,
  },
  emptyIcon: {
    fontSize: 55,
  },
  emptyTitle: {
    color: COLORS.primary,
    fontWeight: '800',
    fontSize: 18,
    marginTop: 12,
  },
  emptyText: {
    color: COLORS.gray,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 8,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 10,
    marginTop: 18,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '800',
    fontSize: 12,
  },
  card: {
    backgroundColor: COLORS.white,
    padding: 14,
    borderRadius: 14,
    marginBottom: 14,
    elevation: 2,
  },
  productArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 85,
    height: 85,
    borderRadius: 12,
    backgroundColor: '#EAF5FC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productIcon: {
    fontSize: 40,
  },
  info: {
    flex: 1,
    marginLeft: 13,
  },
  category: {
    color: COLORS.secondary,
    fontWeight: '800',
    fontSize: 11,
  },
  name: {
    color: COLORS.primary,
    fontWeight: '800',
    fontSize: 15,
    marginTop: 4,
  },
  price: {
    color: COLORS.primary,
    fontWeight: '900',
    marginTop: 5,
  },
  stock: {
    color: COLORS.gray,
    fontSize: 11,
    marginTop: 3,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  removeFavorite: {
    color: COLORS.danger,
    fontWeight: '700',
    fontSize: 12,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 13,
    paddingVertical: 11,
    borderRadius: 9,
  },
  disabled: {
    backgroundColor: COLORS.gray,
  },
});
