
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';

import { COLORS } from '../styles/colors';

const ProductDetailScreen = ({
  product,
  onBack,
  onAddToCart,
  reviews = [],
  onAddReview,
}) => {
  const [selectedRating, setSelectedRating] = useState(5);
  const [comment, setComment] = useState('');

  const formatPrice = (price) => {
    return '$' + price.toLocaleString('es-CO');
  };

  const averageRating = reviews.length > 0
    ? reviews.reduce((total, review) => total + review.rating, 0) / reviews.length
    : 0;

  const submitReview = () => {
    if (!selectedRating || selectedRating < 1 || selectedRating > 5) {
      Alert.alert('KIVORA', 'Selecciona una calificación entre 1 y 5 estrellas.');
      return;
    }

    onAddReview(product.id, selectedRating, comment.trim());
    setSelectedRating(5);
    setComment('');

    Alert.alert('KIVORA', '¡Gracias! Tu calificación fue registrada.');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Volver</Text>
        </Pressable>

        <Text style={styles.logo}>KIVORA</Text>
      </View>

      <View style={styles.imageContainer}>
        <Text style={styles.productIcon}>{product.icono}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.category}>{product.categoria}</Text>

        <Text style={styles.name}>{product.nombre}</Text>

        <Text style={styles.price}>
          {formatPrice(product.precio)}
        </Text>

        <View style={styles.stockContainer}>
          <Text style={styles.stockLabel}>Disponibilidad</Text>
          <Text style={[
            styles.stock,
            product.stock === 0 && styles.outOfStock,
          ]}>
            {product.stock > 0
              ? `${product.stock} unidades disponibles`
              : 'Producto agotado'}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Descripción</Text>
        <Text style={styles.description}>
          {product.descripcion}
        </Text>

        <Pressable
          style={[
            styles.addButton,
            product.stock === 0 && styles.disabledButton,
          ]}
          disabled={product.stock === 0}
          onPress={() => onAddToCart(product)}
        >
          <Text style={styles.addButtonText}>
            {product.stock > 0
              ? 'Agregar al carrito'
              : 'Producto agotado'}
          </Text>
        </Pressable>

        <View style={styles.reviewSection}>
          <Text style={styles.sectionTitle}>Calificaciones y reseñas</Text>

          <View style={styles.averageContainer}>
            <Text style={styles.averageNumber}>
              {reviews.length > 0 ? averageRating.toFixed(1) : '—'}
            </Text>
            <View>
              <Text style={styles.averageStars}>
                {reviews.length > 0 ? '★'.repeat(Math.round(averageRating)) : '☆☆☆☆☆'}
              </Text>
              <Text style={styles.reviewCount}>
                {reviews.length} {reviews.length === 1 ? 'opinión' : 'opiniones'}
              </Text>
            </View>
          </View>

          <Text style={styles.label}>Tu calificación</Text>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Pressable
                key={star}
                onPress={() => setSelectedRating(star)}
              >
                <Text style={[
                  styles.star,
                  star <= selectedRating && styles.selectedStar,
                ]}>
                  ★
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.label}>Comentario (opcional)</Text>
          <TextInput
            style={styles.commentInput}
            placeholder="Cuéntanos qué te pareció este producto..."
            placeholderTextColor={COLORS.gray}
            value={comment}
            onChangeText={setComment}
            multiline
            textAlignVertical="top"
          />

          <Pressable style={styles.reviewButton} onPress={submitReview}>
            <Text style={styles.reviewButtonText}>Enviar calificación</Text>
          </Pressable>

          <Text style={styles.previousTitle}>Opiniones de compradores</Text>

          {reviews.length === 0 ? (
            <Text style={styles.emptyReviews}>
              Este producto todavía no tiene calificaciones. ¡Sé el primero!
            </Text>
          ) : (
            reviews.map((review) => (
              <View key={review.id} style={styles.reviewCard}>
                <Text style={styles.reviewStars}>
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </Text>
                {review.comment ? (
                  <Text style={styles.reviewComment}>{review.comment}</Text>
                ) : (
                  <Text style={styles.reviewComment}>Sin comentario.</Text>
                )}
                <Text style={styles.reviewDate}>{review.date}</Text>
              </View>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: 20,
    paddingTop: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
  },
  backText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '600',
  },
  logo: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 2,
  },
  imageContainer: {
    height: 260,
    backgroundColor: '#EAF5FC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productIcon: {
    fontSize: 110,
  },
  content: {
    padding: 22,
  },
  category: {
    color: COLORS.secondary,
    fontWeight: '800',
    fontSize: 13,
    textTransform: 'uppercase',
  },
  name: {
    color: COLORS.primary,
    fontSize: 27,
    fontWeight: '800',
    marginTop: 8,
  },
  price: {
    color: COLORS.primary,
    fontSize: 25,
    fontWeight: '900',
    marginTop: 15,
  },
  stockContainer: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
  },
  stockLabel: {
    color: COLORS.text,
    fontWeight: '700',
    marginBottom: 5,
  },
  stock: {
    color: COLORS.success,
    fontWeight: '700',
  },
  outOfStock: {
    color: COLORS.danger,
  },
  sectionTitle: {
    color: COLORS.primary,
    fontSize: 19,
    fontWeight: '800',
    marginTop: 25,
    marginBottom: 10,
  },
  description: {
    color: COLORS.text,
    fontSize: 15,
    lineHeight: 23,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    padding: 17,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  disabledButton: {
    backgroundColor: COLORS.gray,
  },
  addButtonText: {
    color: COLORS.white,
    fontWeight: '800',
    fontSize: 16,
  },
  reviewSection: {
    marginTop: 15,
    paddingBottom: 25,
  },
  averageContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  averageNumber: {
    color: COLORS.primary,
    fontSize: 35,
    fontWeight: '900',
  },
  averageStars: {
    color: '#F5A623',
    fontSize: 21,
  },
  reviewCount: {
    color: COLORS.gray,
    fontSize: 12,
    marginTop: 3,
  },
  label: {
    color: COLORS.text,
    fontWeight: '700',
    marginTop: 18,
    marginBottom: 8,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  star: {
    fontSize: 34,
    color: COLORS.lightGray,
  },
  selectedStar: {
    color: '#F5A623',
  },
  commentInput: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 10,
    padding: 12,
    height: 90,
    color: COLORS.text,
  },
  reviewButton: {
    backgroundColor: COLORS.secondary,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  reviewButtonText: {
    color: COLORS.primary,
    fontWeight: '800',
  },
  previousTitle: {
    color: COLORS.primary,
    fontWeight: '800',
    fontSize: 16,
    marginTop: 25,
    marginBottom: 10,
  },
  emptyReviews: {
    color: COLORS.gray,
    fontSize: 13,
    lineHeight: 20,
  },
  reviewCard: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 13,
    marginBottom: 9,
  },
  reviewStars: {
    color: '#F5A623',
    fontSize: 18,
  },
  reviewComment: {
    color: COLORS.text,
    marginTop: 7,
    lineHeight: 20,
  },
  reviewDate: {
    color: COLORS.gray,
    fontSize: 11,
    marginTop: 7,
  },
});
