import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Navbar() {
  return (
    <View style={styles.container}>
      
      <TouchableOpacity style={styles.item}>
        <Feather name="home" size={22} color="#333" />
        <Text style={styles.label}>Início</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/expenses')} style={styles.item}>
        <Feather name="credit-card" size={22} color="#333" />
        <Text style={styles.label}>Fixos</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/goals')} style={styles.item}>
        <Feather name="target" size={22} color="#333" />
        <Text style={styles.label}>Metas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Feather name="settings" size={22} color="#333" />
        <Text style={styles.label}>Config</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 70,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 10,
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 11,
    marginTop: 3,
    color: "#333",
  },
  addButton: {
    width: 55,
    height: 55,
    backgroundColor: "green",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -25,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});
