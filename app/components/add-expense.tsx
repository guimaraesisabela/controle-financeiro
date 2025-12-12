import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

type IconOption = {
  name: keyof typeof Feather.glyphMap;
  label: string;
  color: string;
};

interface AddExpenseModalProps {
  visible: boolean;
  onClose: () => void;
  onSave?: (expense: any) => void;
}

export default function AddExpenseModal({ visible, onClose, onSave }: AddExpenseModalProps) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDay, setDueDay] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<IconOption | null>(null);

  const iconOptions: IconOption[] = [
    { name: 'home', label: 'Casa', color: '#E3F2FD' },
    { name: 'wifi', label: 'Internet', color: '#F3E5F5' },
    { name: 'activity', label: 'Academia', color: '#FFF3E0' },
    { name: 'film', label: 'Streaming', color: '#FCE4EC' },
    { name: 'truck', label: 'Veículo', color: '#E0F2F1' },
    { name: 'zap', label: 'Energia', color: '#FFF9C4' },
    { name: 'droplet', label: 'Água', color: '#E1F5FE' },
    { name: 'smartphone', label: 'Celular', color: '#F3E5F5' },
  ];

  const handleSave = () => {
    const expense = {
      name,
      amount: parseFloat(amount),
      dueDay: parseInt(dueDay),
      icon: selectedIcon,
    };
    
    if (onSave) {
      onSave(expense);
    }
    
    // Limpa os campos
    setName('');
    setAmount('');
    setDueDay('');
    setSelectedIcon(null);
    
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelButton}>Cancelar</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Novo Gasto Fixo</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveButton}>Salvar</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Nome */}
          <View style={styles.section}>
            <Text style={styles.label}>Nome da Despesa</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Aluguel, Internet..."
              value={name}
              onChangeText={setName}
              placeholderTextColor="#8E8E93"
            />
          </View>

          {/* Valor */}
          <View style={styles.section}>
            <Text style={styles.label}>Valor Mensal</Text>
            <View style={styles.inputWithPrefix}>
              <Text style={styles.prefix}>R$</Text>
              <TextInput
                style={styles.inputAmount}
                placeholder="0,00"
                value={amount}
                onChangeText={setAmount}
                keyboardType="decimal-pad"
                placeholderTextColor="#8E8E93"
              />
            </View>
          </View>

          {/* Dia de Vencimento */}
          <View style={styles.section}>
            <Text style={styles.label}>Dia de Vencimento</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 5, 10, 15..."
              value={dueDay}
              onChangeText={setDueDay}
              keyboardType="number-pad"
              placeholderTextColor="#8E8E93"
              maxLength={2}
            />
          </View>

          {/* Ícone */}
          <View style={styles.section}>
            <Text style={styles.label}>Escolha um Ícone</Text>
            <View style={styles.iconGrid}>
              {iconOptions.map((icon) => (
                <TouchableOpacity
                  key={icon.name}
                  style={[
                    styles.iconOption,
                    { backgroundColor: icon.color },
                    selectedIcon?.name === icon.name && styles.iconSelected,
                  ]}
                  onPress={() => setSelectedIcon(icon)}
                >
                  <Feather name={icon.name} size={28} color="#666" />
                  <Text style={styles.iconLabel}>{icon.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 60,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  cancelButton: {
    fontSize: 17,
    color: '#007AFF',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  saveButton: {
    fontSize: 17,
    color: '#007AFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 24,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8E8E93',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 17,
    color: '#000',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  inputWithPrefix: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingLeft: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  prefix: {
    fontSize: 17,
    color: '#8E8E93',
    fontWeight: '600',
    marginRight: 8,
  },
  inputAmount: {
    flex: 1,
    padding: 16,
    paddingLeft: 0,
    fontSize: 17,
    color: '#000',
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  iconOption: {
    width: '22%',
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  iconSelected: {
    borderColor: '#007AFF',
    borderWidth: 3,
  },
  iconLabel: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
    fontWeight: '500',
  },
});