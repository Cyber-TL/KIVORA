
import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';

import { COLORS } from '../styles/colors';
import ProductCard from '../components/ProductCard';

const CATEGORIES = [
  'Todas',
  'Tecnología',
  'Hogar',
  'Moda',
  'Deportes',
];

const HomeScreen = ({
  products,
  favorites,
  onFavorite,
  onProductPress,
  onAddToCart,
  onCartPress,
  onFavoritesPress,
  onOrdersPress,
  onSellerPress,
  cartCount,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [sortOrder, setSortOrder] = useState('default');

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.nombre
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === 'Todas' ||
        product.categoria === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.precio - b.precio;
      if (sortOrder === 'desc') return b.precio - a.precio;
      return 0;
    });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>KIVORA.</Text>
          <Text style={styles.slogan}>
            Todo lo que buscas, a un solo toque.
          </Text>
        </View>

        <View style={styles.headerActions}>
          <Pressable style={styles.sellerButton} onPress={onSellerPress}>
            <Text style={styles.sellerEmoji}>🏪</Text>
            <Text style={styles.sellerText}>Vender</Text>
          </Pressable>

          <Pressable style={styles.cartIcon} onPress={onCartPress}>
            <Text style={styles.cartEmoji}>🛒</Text>

            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="¿Qué estás buscando?"
          placeholderTextColor={COLORS.gray}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categorías</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {CATEGORIES.map((category) => (
              <Pressable
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.selectedCategory,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category && styles.selectedCategoryText,
                  ]}
                >
                  {category}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={styles.catalogHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              Descubre nuestros productos
            </Text>
            <Text style={styles.productCount}>
              {filteredProducts.length} productos encontrados
            </Text>
          </View>
        </View>

        <View style={styles.sortContainer}>
          <Text style={styles.sortLabel}>Ordenar:</Text>

          <Pressable
            style={[
              styles.sortButton,
              sortOrder === 'asc' && styles.selectedSort,
            ]}
            onPress={() => setSortOrder(sortOrder === 'asc' ? 'default' : 'asc')}
          >
            <Text style={styles.sortText}>Menor precio</Text>
          </Pressable>

          <Pressable
            style={[
              styles.sortButton,
              sortOrder === 'desc' && styles.selectedSort,
            ]}
            onPress={() => setSortOrder(sortOrder === 'desc' ? 'default' : 'desc')}
          >
            <Text style={styles.sortText}>Mayor precio</Text>
          </Pressable>
        </View>

        {filteredProducts.length > 0 ? (
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.productRow}
            contentContainerStyle={styles.productList}
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                isFavorite={favorites.includes(item.id)}
                onFavorite={onFavorite}
                onPress={() => onProductPress(item)}
                onAddToCart={() => onAddToCart(item)}
              />
            )}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>🔎</Text>
            <Text style={styles.emptyTitle}>No encontramos productos</Text>
            <Text style={styles.emptyText}>
              Intenta con otra búsqueda o categoría.
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.bottomNavigation}>
        <Pressable>
          <Text style={styles.navItem}>🏠 Inicio</Text>
        </Pressable>

        <Pressable onPress={onFavoritesPress}>
          <Text style={styles.navItem}>❤️ Favoritos</Text>
        </Pressable>

        <Pressable onPress={onCartPress}>
          <Text style={styles.navItem}>
            🛒 Carrito {cartCount > 0 ? `(${cartCount})` : ''}
          </Text>
        </Pressable>

        <Pressable onPress={onOrdersPress}>
          <Text style={styles.navItem}>📦 Pedidos</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: 55,
    paddingHorizontal: 18,
    paddingBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 2,
  },
  slogan: {
    color: '#C5D8E8',
    fontSize: 11,
    marginTop: 4,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  sellerButton: {
    backgroundColor: '#263B5B',
    paddingHorizontal: 10,
    height: 43,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  sellerEmoji: {
    fontSize: 16,
  },
  sellerText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '800',
  },
  cartIcon: {
    backgroundColor: '#263B5B',
    width: 43,
    height: 43,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartEmoji: {
    fontSize: 21,
  },
  cartBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: COLORS.danger,
    minWidth: 19,
    height: 19,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '900',
  },
  searchContainer: {
    backgroundColor: COLORS.white,
    marginHorizontal: 18,
    marginTop: 18,
    marginBottom: 8,
    height: 48,
    borderRadius: 13,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 18,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 13,
    color: COLORS.black,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 12,
  },
  categoryButton: {
    paddingHorizontal: 17,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    marginRight: 9,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  selectedCategory: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryText: {
    fontSize: 12,
    color: COLORS.text,
    fontWeight: '600',
  },
  selectedCategoryText: {
    color: COLORS.white,
  },
  catalogHeader: {
    marginTop: 25,
    marginHorizontal: 18,
  },
  productCount: {
    color: COLORS.gray,
    fontSize: 12,
    marginTop: -5,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginHorizontal: 18,
    marginTop: 17,
    marginBottom: 15,
    gap: 7,
  },
  sortLabel: {
    fontSize: 11,
    color: COLORS.text,
    fontWeight: '700',
  },
  sortButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
  },
  selectedSort: {
    backgroundColor: '#DDF5FF',
    borderColor: COLORS.secondary,
  },
  sortText: {
    fontSize: 10,
    color: COLORS.primary,
    fontWeight: '600',
  },
  productList: {
    paddingHorizontal: 18,
    paddingBottom: 20,
  },
  productRow: {
    justifyContent: 'space-between',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyEmoji: {
    fontSize: 40,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.primary,
    marginTop: 12,
  },
  emptyText: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 6,
  },
  bottomNavigation: {
    height: 65,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.primary,
  },
});
