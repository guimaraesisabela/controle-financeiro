import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface Goal {
  id: string;
  name: string;
  icon: keyof typeof Feather.glyphMap;
  iconBgColor: string;
  current: number;
  target: number;
}

export default function GoalsScreen() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      name: 'Fundo de emergência',
      icon: 'shield',
      iconBgColor: '#E3F2FD',
      current: 5000,
      target: 10000,
    },
    {
      id: '2',
      name: 'Viagem 2024',
      icon: 'send',
      iconBgColor: '#F3E5F5',
      current: 200,
      target: 3000,
    },
    {
      id: '3',
      name: 'Novo Laptop',
      icon: 'monitor',
      iconBgColor: '#FFF3E0',
      current: 1500,
      target: 8000,
    },
    {
      id: '4',
      name: 'Trocar de Carro',
      icon: 'truck',
      iconBgColor: '#E0F2F1',
      current: 15000,
      target: 40000,
    },
  ]);

  const formatCurrency = (value: number) => {
    return `R$ ${value.toLocaleString('pt-BR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Feather name="chevron-left" size={28} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Controle Financeiro</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Feather name="more-horizontal" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>Metas</Text>
          <Text style={styles.subtitle}>Objetivos financeiros</Text>
        </View>

        {goals.length > 0 ? (
          <View style={styles.goalsSection}>
            {goals.map((goal) => {
              const progress = calculateProgress(goal.current, goal.target);
              return (
                <View key={goal.id} style={styles.goalItem}>
                  <View style={styles.goalHeader}>
                    <View style={styles.goalLeft}>
                      <View style={[styles.goalIcon, { backgroundColor: goal.iconBgColor }]}>
                        <Feather name={goal.icon} size={24} color="#666" />
                      </View>
                      <View style={styles.goalInfo}>
                        <Text style={styles.goalName}>{goal.name}</Text>
                        <Text style={styles.goalValues}>
                          {formatCurrency(goal.current)} / {formatCurrency(goal.target)}
                        </Text>
                        <TouchableOpacity>
                          <Text style={styles.editButton}>Editar</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <Text style={styles.goalPercentage}>{Math.round(progress)}%</Text>
                  </View>
                  
                  <View style={styles.progressBarContainer}>
                    <View style={[styles.progressBar, { width: `${progress}%` }]} />
                  </View>
                </View>
              );
            })}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>EXEMPLO DE ESTADO VAZIO</Text>
            <View style={styles.emptyStateBox}>
              <Feather name="clipboard" size={48} color="#C7C7CC" />
              <Text style={styles.emptyStateText}>Nenhuma meta cadastrada</Text>
            </View>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.addButton}>
          <Feather name="plus" size={20} color="#FFF" />
          <Text style={styles.addButtonText}>Adicionar meta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
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
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
  },
  goalsSection: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  goalItem: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  goalLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  goalIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  goalInfo: {
    flex: 1,
  },
  goalName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  goalValues: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 6,
  },
  editButton: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  goalPercentage: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginLeft: 12,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E5E5EA',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  emptyState: {
    paddingHorizontal: 20,
    marginTop: 32,
  },
  emptyStateTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8E8E93',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  emptyStateBox: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E5E5EA',
    borderStyle: 'dashed',
    padding: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 16,
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'transparent',
  },
  addButton: {
    backgroundColor: '#000',
    borderRadius: 16,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 8,
  },
});