import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

interface AddTransactionModalProps {
  visible: boolean;
  onClose: () => void;
  onSave?: (transaction: any) => void;
}

export default function AddTransactionModal({ visible, onClose, onSave }: AddTransactionModalProps) {
  const [isIncome, setIsIncome] = useState(true);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString('pt-BR'));
  const [time, setTime] = useState(new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));

  const handleSave = () => {
    const transaction = {
      type: isIncome ? 'income' : 'expense',
      amount: parseFloat(amount),
      category,
      description,
      date,
      time,
      timestamp: new Date().getTime(),
    };
    
    if (onSave) {
      onSave(transaction);
    }
    
    setAmount('');
    setCategory('');
    setDescription('');
    setIsIncome(true);
    
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
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelButton}>Cancelar</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Nova Transação</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveButton}>Salvar</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.typeSection}>
            <TouchableOpacity
              style={[styles.typeButton, isIncome && styles.typeButtonActive]}
              onPress={() => setIsIncome(true)}
            >
              <Feather name="arrow-up-circle" size={24} color={isIncome ? "#FFF" : "#4CAF50"} />
              <Text style={[styles.typeButtonText, isIncome && styles.typeButtonTextActive]}>
                Entrada
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.typeButton, !isIncome && styles.typeButtonActive]}
              onPress={() => setIsIncome(false)}
            >
              <Feather name="arrow-down-circle" size={24} color={!isIncome ? "#FFF" : "#FF3B30"} />
              <Text style={[styles.typeButtonText, !isIncome && styles.typeButtonTextActive]}>
                Saída
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Valor</Text>
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

          <View style={styles.section}>
            <Text style={styles.label}>{isIncome ? 'De onde veio?' : 'Categoria do Gasto'}</Text>
            <TextInput
              style={styles.input}
              placeholder={isIncome ? "Ex: Salário, Freelance..." : "Ex: Alimentação, Transporte..."}
              value={category}
              onChangeText={setCategory}
              placeholderTextColor="#8E8E93"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Data e Hora</Text>
            <View style={styles.dateTimeRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="DD/MM/AAAA"
                value={date}
                onChangeText={setDate}
                placeholderTextColor="#8E8E93"
              />
              <TextInput
                style={[styles.input, { width: 100, marginLeft: 10 }]}
                placeholder="HH:MM"
                value={time}
                onChangeText={setTime}
                placeholderTextColor="#8E8E93"
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Descrição (opcional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Adicione uma observação..."
              value={description}
              onChangeText={setDescription}
              placeholderTextColor="#8E8E93"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
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
  typeSection: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    marginBottom: 8,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E5EA',
  },
  typeButtonActive: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  typeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  typeButtonTextActive: {
    color: '#FFF',
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
  dateTimeRow: {
    flexDirection: 'row',
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
});