import React, { FC }                          from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Meal }                               from "../../types";
import MealItem                               from "../MealItem";

type TodayMealsProps = {
  foods: Meal[];
  onCompleteAppRemove?: () => void;
}

const TodayMeals: FC<TodayMealsProps> = ({ foods, onCompleteAppRemove }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comidas</Text>
      <ScrollView style={styles.content}>
        {foods?.map((meal: Meal, index) => (<MealItem key={`today-meal-item-${meal.name}-${index}`} {...meal} onCompleteAppRemove={onCompleteAppRemove} itemPosition={index}/>))}
      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24
  },
  title: {
    fontSize: 18,

  },
  content: {
    marginVertical: 16
  }
})

export default TodayMeals;