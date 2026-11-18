
import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';

import { COLORS } from '../styles/colors';

const CheckoutScreen = ({ cart, onBack, onConfirm }) => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [direccion, setDireccion] = useState('');

  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const formatPrice = (price) =>
    '$' + price.toLocaleString('es-CO');

  const subtotal = cart.reduce(
    (total, item) => total + item.precio * item.quantity,
    0
  );

  const discount = couponApplied
    ? Math.round(subtotal * 0.10)
    : 0;

  const shipping = subtotal >= 150000 ? 0 : 8000;
  const total = subtotal - discount + shipping;

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'BIENVENIDO10') {
      setCouponApplied(true);
      Alert.alert('¡Cupón aplicado!', 'Obtienes un 10% de descuento.');
    } else {
      setCouponApplied(false);
      Alert.alert('Cupón inválido', 'Revisa el código e inténtalo nuevamente.');
    }
  };

  const handleConfirm = () => {
    if (!nombre.trim() || !telefono.trim() ||
        !municipio.trim() || !direccion.trim()) {
      Alert.alert('Datos incompletos', 'Completa todos los campos.');
      return;
    }

    if (!/^\d{7,15}$/.test(telefono.trim())) {
      Alert.alert('Teléfono inválido', 'Ingresa entre 7 y 15 dígitos.');
      return;
    }

    const buyer = {
      nombre: nombre.trim(),
      telefono: telefono.trim(),
      municipio: municipio.trim(),
      direccion: direccion.trim(),
    };

    onConfirm(buyer, discount);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Text style={styles.backText}>← Volver</Text>
        </Pressable>

        <Text style={styles.logo}>KIVORA.</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Finalizar compra</Text>

        <Text style={styles.subtitle}>
          Completa tus datos para registrar tu pedido.
        </Text>

        <View style={styles.form}>
          <Text style={styles.sectionTitle}>Datos del comprador</Text>

          <Text style={styles.label}>Nombre completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. Juan Pérez"
            value={nombre}
            onChangeText={setNombre}
          />

          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. 3001234567"
            value={telefono}
            onChangeText={setTelefono}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Municipio</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. Madrid"
            value={municipio}
            onChangeText={setMunicipio}
          />

          <Text style={styles.label}>Dirección de entrega</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. Calle 10 # 5-20"
            value={direccion}
            onChangeText={setDireccion}
          />
        </View>

        <View style={styles.form}>
          <Text style={styles.sectionTitle}>Cupón de descuento</Text>

          <TextInput
            style={styles.input}
            placeholder="BIENVENIDO10"
            value={coupon}
            onChangeText={(value) => {
              setCoupon(value);
              setCouponApplied(false);
            }}
            autoCapitalize="characters"
          />

          <Pressable style={styles.couponButton} onPress={applyCoupon}>
            <Text style={styles.buttonText}>Aplicar cupón</Text>
          </Pressable>

          {couponApplied && (
            <Text style={styles.success}>
              ¡Descuento del 10% aplicado!
            </Text>
          )}
        </View>

        <View style={styles.summary}>
          <Text style={styles.sectionTitle}>Resumen del pedido</Text>

          <View style={styles.row}>
            <Text>Subtotal</Text>
            <Text>{formatPrice(subtotal)}</Text>
          </View>

          <View style={styles.row}>
            <Text>Descuento</Text>
            <Text style={styles.discount}>
              -{formatPrice(discount)}
            </Text>
          </View>

          <View style={styles.row}>
            <Text>Envío</Text>
            <Text>{shipping === 0 ? 'Gratis' : formatPrice(shipping)}</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.row}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.total}>{formatPrice(total)}</Text>
          </View>

          <Pressable
            style={styles.confirmButton}
            onPress={handleConfirm}
          >
            <Text style={styles.buttonText}>Confirmar pedido</Text>
          </Pressable>

          <Text style={styles.note}>
            Compra de demostración. No se realiza ningún pago real.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default CheckoutScreen;

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
    marginTop: 6,
    marginBottom: 20,
  },
  form: {
    backgroundColor: COLORS.white,
    padding: 17,
    borderRadius: 14,
    marginBottom: 15,
  },
  sectionTitle: {
    color: COLORS.primary,
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 15,
  },
  label: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 7,
  },
  input: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 9,
    padding: 13,
    marginBottom: 15,
    color: COLORS.black,
  },
  couponButton: {
    backgroundColor: COLORS.primary,
    padding: 13,
    borderRadius: 9,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '800',
  },
  success: {
    color: COLORS.success,
    fontWeight: '700',
    marginTop: 10,
  },
  summary: {
    backgroundColor: COLORS.white,
    padding: 18,
    borderRadius: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 13,
  },
  discount: {
    color: COLORS.success,
    fontWeight: '700',
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginVertical: 10,
  },
  totalLabel: {
    color: COLORS.primary,
    fontSize: 17,
    fontWeight: '900',
  },
  total: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: '900',
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 18,
  },
  note: {
    color: COLORS.gray,
    fontSize: 11,
    textAlign: 'center',
    marginTop: 12,
  },
});
