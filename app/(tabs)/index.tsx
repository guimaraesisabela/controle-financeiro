import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import AddTransactionModal from "../components/add-transaction";

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [transactions, setTransactions] = useState([
    {
      id: '1',
      type: 'expense',
      category: 'iFood',
      amount: 45.90,
      icon: 'coffee',
    },
    {
      id: '2',
      type: 'expense',
      category: 'Spotify',
      amount: 34.90,
      icon: 'music',
    },
    {
      id: '3',
      type: 'income',
      category: 'Salário',
      amount: 3500.00,
      icon: 'briefcase',
    },
  ]);

  const handleAddTransaction = (newTransaction: any) => {
    const transaction = {
      id: Date.now().toString(),
      ...newTransaction,
      icon: newTransaction.type === 'income' ? 'briefcase' : 'shopping-bag',
    };
    
    setTransactions([transaction, ...transactions]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >

        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Olá, Isabela <Feather name="smile" size={22} /></Text>
            <Text style={styles.subtitle}>Resumo de Dezembro</Text>
          </View>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceTitle}>Saldo disponível</Text>
          <Text style={styles.balanceValue}>R$ 1.280,00</Text>
          <Text style={styles.balanceInfo}>
            Saldo Atual: R$ 3.500 | Despesas: R$ 2.220
          </Text>
        </View>

        <View style={styles.miniCardsRow}>
          <View style={styles.miniCard}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <Feather name="arrow-up-circle" size={20} color="green" />
              <Text>Saldo Atual</Text>
            </View>
            <Text style={{ color: "green" }}>R$ 3.500</Text>
          </View>

          <View style={styles.miniCard}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <Feather name="arrow-down-circle" size={20} color="red" />
              <Text>Despesas</Text>
            </View>
            <Text style={{ color: "red" }}>R$ 2.220</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Transações recentes</Text>

        {transactions.map((transaction) => (
          <View key={transaction.id} style={styles.transactionItem}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Feather name={transaction.icon as any} size={20} />
              <Text>{transaction.category}</Text>
            </View>
            <Text style={{ color: transaction.type === 'income' ? "green" : "red" }}>
              {transaction.type === 'income' ? '+' : '-'} R$ {transaction.amount.toFixed(2)}
            </Text>
          </View>
        ))}

      </ScrollView>

      <TouchableOpacity 
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Feather name="plus" size={28} color="#FFF" />
      </TouchableOpacity>

      <AddTransactionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleAddTransaction}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 120,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "600",
  },
  subtitle: {
    color: "#777",
  },
  balanceCard: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 15,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  balanceTitle: {
    textAlign: "center",
    color: "#555",
  },
  balanceValue: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    color: "green",
  },
  balanceInfo: {
    marginTop: 8,
    textAlign: "center",
    color: "#888",
  },
  miniCardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  miniCard: {
    width: "48%",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  sectionTitle: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "600",
  },
  transactionItem: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  fab: {
    position: "absolute",
    right: 25,
    bottom: 25,
    backgroundColor: "green",
    width: 65,
    height: 65,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
});