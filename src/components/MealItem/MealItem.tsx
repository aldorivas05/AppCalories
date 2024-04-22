import React, {FC}                       from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Meal }                          from '../../types';
import { Button, Icon }                  from '@rneui/themed';
import useFoodStorage                    from '../../hooks/useFoodStorage';

type MealItemProps = Meal & {
  isAbleToApp?: boolean;
  onCompleteAppRemove?: () => void; //Una funcion que no regresa nada.
  itemPosition: number;
}

const MealItem: FC<MealItemProps> = ({calories, name, portion, isAbleToApp, onCompleteAppRemove, itemPosition}) => {
  const { onSaveTodayFood, onDeleteTodayFood } = useFoodStorage();


  const handleIconPress = async () => {
    try {
      if (isAbleToApp) {
        await onSaveTodayFood({calories, name, portion})
        Alert.alert('Comida agregada al día')
      } else {
        await onDeleteTodayFood(itemPosition ?? -1);
        Alert.alert('Comida eliminada')
      }
      onCompleteAppRemove?.();
    } catch (error) {
      console.error(error);
      Alert.alert('Comida no agregada')
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.portion}>{portion}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Button icon={<Icon name={isAbleToApp ? 'add-circle-outline' : 'close'} />} 
          type='clear' 
          style={styles.iconButton}
          onPress={handleIconPress}
        />
        <Text style={styles.calories}>{calories} KCal</Text>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ade8af',
    marginBottom: 12,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row'
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',

  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '500'
  },
  portion: {
    fontSize: 13,
    color: '#808080',
    fontWeight: '500'
  },
  calories: {
    fontWeight: '500'
  },
  iconButton: {
    marginBottom: -6
  }
})

export default MealItem;