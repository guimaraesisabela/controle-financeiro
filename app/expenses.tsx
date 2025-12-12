import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import AddExpenseModal from "./components/add-expense";

interface FixedExpense {
  id: string;
  name: string;
  icon: keyof typeof Feather.glyphMap;
  iconBgColor: string;
  dueDay: number;
  amount: number;
}

export default function GastosFixosScreen() {
  const handleRemoveExpense = (id: string, name: string) => {
    Alert.alert(
      "Remover Gasto",
      `Você tem certeza que deseja remover "${name}"?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sim",
          style: "destructive",
          onPress: () => {
            setExpenses(expenses.filter((expense) => expense.id !== id));
          },
        },
      ]
    );
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [expenses, setExpenses] = useState<FixedExpense[]>([
    {
      id: "1",
      name: "Aluguel",
      icon: "home",
      iconBgColor: "#E3F2FD",
      dueDay: 5,
      amount: 2000.0,
    },
    {
      id: "2",
      name: "Internet",
      icon: "wifi",
      iconBgColor: "#F3E5F5",
      dueDay: 10,
      amount: 150.0,
    },
    {
      id: "3",
      name: "Academia",
      icon: "activity",
      iconBgColor: "#FFF3E0",
      dueDay: 15,
      amount: 100.0,
    },
    {
      id: "4",
      name: "Streaming",
      icon: "film",
      iconBgColor: "#FCE4EC",
      dueDay: 20,
      amount: 55.9,
    },
    {
      id: "5",
      name: "Seguro Auto",
      icon: "truck",
      iconBgColor: "#E0F2F1",
      dueDay: 28,
      amount: 1144.1,
    },
  ]);

  const totalMensal = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const formatCurrency = (value: number) => {
    return `R$ ${value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const handleAddExpense = (newExpense: any) => {
    const expense: FixedExpense = {
      id: Date.now().toString(),
      name: newExpense.name,
      icon: newExpense.icon.name,
      iconBgColor: newExpense.icon.color,
      dueDay: newExpense.dueDay,
      amount: newExpense.amount,
    };

    setExpenses([...expenses, expense]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="chevron-left" size={28} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Controle Financeiro</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Feather name="more-horizontal" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>Gastos Fixos</Text>
          <Text style={styles.subtitle}>Despesas que se repetem todo mês.</Text>
        </View>

        <View style={styles.totalCard}>
          <View style={styles.totalLeft}>
            <Text style={styles.totalLabel}>TOTAL MENSAL</Text>
            <Text style={styles.totalValue}>{formatCurrency(totalMensal)}</Text>
          </View>
          <View style={styles.iconCircle}>
            <Feather name="dollar-sign" size={24} color="#4CAF50" />
          </View>
        </View>

        <View style={styles.listSection}>
          <Text style={styles.listTitle}>SUAS CONTAS</Text>

          {expenses.map((expense) => (
            <View key={expense.id} style={styles.expenseItem}>
              <View style={styles.expenseLeft}>
                <View
                  style={[
                    styles.expenseIcon,
                    { backgroundColor: expense.iconBgColor },
                  ]}
                >
                  <Feather name={expense.icon} size={24} color="#666" />
                </View>
                <View style={styles.expenseInfo}>
                  <Text style={styles.expenseName}>{expense.name}</Text>
                  <Text style={styles.expenseDue}>
                    Vence dia {expense.dueDay}
                  </Text>
                </View>
              </View>
              <View style={styles.expenseRight}>
                <Text style={styles.expenseAmount}>
                  {formatCurrency(expense.amount)}
                </Text>
                <TouchableOpacity
                  onPress={() => handleRemoveExpense(expense.id, expense.name)}
                >
                  <Text style={styles.removeButton}>Remover</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Feather name="plus" size={20} color="#FFF" />
          <Text style={styles.addButtonText}>Adicionar gasto fixo</Text>
        </TouchableOpacity>
      </View>

      <AddExpenseModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleAddExpense}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F7",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000",
  },
  menuButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  titleSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#8E8E93",
  },
  totalCard: {
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  totalLeft: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 12,
    color: "#8E8E93",
    fontWeight: "600",
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  totalValue: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
  },
  listSection: {
    marginTop: 32,
    paddingHorizontal: 20,
  },
  listTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#8E8E93",
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  expenseItem: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  expenseLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  expenseIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  expenseInfo: {
    flex: 1,
  },
  expenseName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000",
    marginBottom: 2,
  },
  expenseDue: {
    fontSize: 14,
    color: "#8E8E93",
  },
  expenseRight: {
    alignItems: "flex-end",
  },
  expenseAmount: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  removeButton: {
    fontSize: 14,
    color: "#FF3B30",
    fontWeight: "500",
  },
  bottomButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "transparent",
  },
  addButton: {
    backgroundColor: "#000",
    borderRadius: 16,
    paddingVertical: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "600",
    marginLeft: 8,
  },
});
