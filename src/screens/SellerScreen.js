
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';

import { COLORS } from '../styles/colors';

const CATEGORIES = ['Tecnología', 'Hogar', 'Moda', 'Deportes'];

const SellerScreen = ({ products, onBack, onSaveProduct }) => {
  const [editingId, setEditingId] = useState(null);
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('Tecnología');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const resetForm = () => {
    setEditingId(null);
    setNombre('');
    setCategoria('Tecnología');
    setPrecio('');
    setStock('');
    setDescripcion('');
  };

  const editProduct = (product) => {
    setEditingId(product.id);
    setNombre(product.nombre);
    setCategoria(product.categoria);
    setPrecio(String(product.precio));
    setStock(String(product.stock));
    setDescripcion(product.descripcion);
  };

  const saveProduct = () => {
    const cleanName = nombre.trim();
    const cleanDescription = descripcion.trim();
    const numericPrice = Number(precio);
    const numericStock = Number(stock);

    if (!cleanName || !precio.trim() || !stock.trim() || !cleanDescription) {
      Alert.alert('KIVORA', 'Completa todos los campos.');
      return;
    }

    if (!Number.isInteger(numericPrice) || numericPrice <= 0) {
      Alert.alert('Precio inválido', 'El precio debe ser un número entero mayor que cero.');
      return;
    }

    if (!Number.isInteger(numericStock) || numericStock < 0) {
      Alert.alert('Stock inválido', 'El stock debe ser un número entero igual o mayor que cero.');
      return;
    }

    if (cleanDescription.length < 15) {
      Alert.alert('Descripción muy corta', 'Escribe una descripción de mínimo 15 caracteres.');
      return;
    }

    const product = {
      id: editingId || `P${Date.now()}`,
      nombre: cleanName,
      categoria,
      precio: numericPrice,
      stock: numericStock,
      descripcion: cleanDescription,
      icono: editingId
        ? products.find((item) => item.id === editingId)?.icono || '📦'
        : '📦',
    };

    onSaveProduct(product);

    Alert.alert(
      'KIVORA',
      editingId
        ? 'Producto actualizado correctamente.'
        : 'Producto creado correctamente.'
    );

    resetForm();
  };

  const formatPrice = (value) => '$' + value.toLocaleString('es-CO');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Text style={styles.backText}>← Volver</Text>
        </Pressable>
        <Text style={styles.logo}>KIVORA</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Panel del vendedor</Text>
        <Text style={styles.subtitle}>
          Administra los productos de tu marketplace.
        </Text>

        <View style={styles.form}>
          <Text style={styles.formTitle}>
            {editingId ? 'Editar producto' : 'Agregar producto'}
          </Text>

          <Text style={styles.label}>Nombre del producto</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. Parlante Bluetooth"
            value={nombre}
            onChangeText={setNombre}
          />

          <Text style={styles.label}>Categoría</Text>
          <View style={styles.categories}>
            {CATEGORIES.map((item) => (
              <Pressable
                key={item}
                onPress={() => setCategoria(item)}
                style={[
                  styles.categoryButton,
                  categoria === item && styles.categorySelected,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    categoria === item && styles.categoryTextSelected,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.label}>Precio en COP</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. 85000"
            value={precio}
            onChangeText={setPrecio}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Unidades disponibles</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. 10"
            value={stock}
            onChangeText={setStock}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Descripción</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Describe las características del producto..."
            value={descripcion}
            onChangeText={setDescripcion}
            multiline
            textAlignVertical="top"
          />

          <Pressable style={styles.saveButton} onPress={saveProduct}>
            <Text style={styles.saveButtonText}>
              {editingId ? 'Guardar cambios' : 'Crear producto'}
            </Text>
          </Pressable>

          {editingId && (
            <Pressable style={styles.cancelButton} onPress={resetForm}>
              <Text style={styles.cancelButtonText}>Cancelar edición</Text>
            </Pressable>
          )}
        </View>

        <Text style={styles.listTitle}>
          Productos registrados ({products.length})
        </Text>

        {products.map((product) => (
          <View key={product.id} style={styles.productItem}>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.icono} {product.nombre}</Text>
              <Text style={styles.productCategory}>{product.categoria}</Text>
              <Text style={styles.productPrice}>{formatPrice(product.precio)}</Text>
              <Text style={styles.productStock}>Stock: {product.stock}</Text>
            </View>

            <Pressable
              style={styles.editButton}
              onPress={() => editProduct(product)}
            >
              <Text style={styles.editButtonText}>Editar</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default SellerScreen;

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
    fontSize: 15,
    fontWeight: '700',
  },
  logo: {
    color: COLORS.white,
    fontSize: 21,
    fontWeight: '900',
    letterSpacing: 2,
  },
  content: {
    padding: 18,
    paddingBottom: 40,
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
  form: {
    backgroundColor: COLORS.white,
    padding: 17,
    borderRadius: 15,
    elevation: 2,
  },
  formTitle: {
    color: COLORS.primary,
    fontSize: 19,
    fontWeight: '800',
    marginBottom: 15,
  },
  label: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: 13,
    marginBottom: 7,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 9,
    padding: 12,
    color: COLORS.black,
  },
  descriptionInput: {
    height: 90,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
  },
  categoryButton: {
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
  },
  categorySelected: {
    backgroundColor: COLORS.primary,
  },
  categoryText: {
    color: COLORS.text,
    fontSize: 11,
    fontWeight: '600',
  },
  categoryTextSelected: {
    color: COLORS.white,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: COLORS.white,
    fontWeight: '800',
  },
  cancelButton: {
    padding: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: COLORS.danger,
    fontWeight: '700',
  },
  listTitle: {
    color: COLORS.primary,
    fontSize: 19,
    fontWeight: '800',
    marginTop: 28,
    marginBottom: 12,
  },
  productItem: {
    backgroundColor: COLORS.white,
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    color: COLORS.primary,
    fontWeight: '800',
    fontSize: 14,
  },
  productCategory: {
    color: COLORS.gray,
    fontSize: 12,
    marginTop: 4,
  },
  productPrice: {
    color: COLORS.primary,
    fontWeight: '800',
    marginTop: 5,
  },
  productStock: {
    color: COLORS.success,
    fontSize: 12,
    marginTop: 3,
  },
  editButton: {
    backgroundColor: '#DDF5FF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  editButtonText: {
    color: COLORS.primary,
    fontWeight: '800',
  },
});
