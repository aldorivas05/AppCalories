import { Button, Icon, Text }                from '@rneui/base';
import Header                                from '../../components/Header';
import React, { useCallback, useState }      from 'react';
import { StyleSheet, View }                  from 'react-native';
import { useFocusEffect, useNavigation }     from '@react-navigation/native';
import { NativeStackNavigationProp }         from '@react-navigation/native-stack';
import { Meal, RootStackParamList }          from '../../types';
import useFoodStorage                        from '../../hooks/useFoodStorage';
import TodayCalories, { TodayCaloriesProps } from '../../components/TodayCalories';
import TodayMeals                            from '../../components/TodayMeals';

const totalCaloriesPerDay = 2000;

const Home = () => {
    const [todayFood, setTodayFood] = useState<Meal[]>([]);

    const [todayStatistics, setTodayStatistics] = useState<TodayCaloriesProps>({
        consumed: 0,
        percentage: 0,
        remaining: 0,
        total: totalCaloriesPerDay
    })

    const {onGetTodayFood} = useFoodStorage();

    const {navigate} = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

    const calculateStatistics = (meals: Meal[]) => {
        try {
            //Esto es para sumar todas las calorias agregadas
            const caloriesConsumed = meals.reduce((acum, curr) => acum + Number(curr.calories), 0);

            // Esto es para el calculo de calorias restantes
            const remainingCalories = totalCaloriesPerDay - caloriesConsumed

            //Calculo del porcentaje 

            const percentage = (caloriesConsumed/ totalCaloriesPerDay) * 100;

            setTodayStatistics({
                consumed: caloriesConsumed,
                percentage: percentage,
                remaining: remainingCalories,
                total: totalCaloriesPerDay
            });

        } catch (error) {
            console.error(error);
            
        }
    };

    const loadTodayFood = useCallback(async () => {
        try {
            const todayFoodResponse = await onGetTodayFood();
    
            calculateStatistics(todayFoodResponse);
            setTodayFood(todayFoodResponse);
        } catch (error) {
            setTodayFood([]);
            console.error(error);
        }
    }, []);

    //Este metodo lo que hace basicamente es que cuando se regrese a esta pantalla, se ejecuta para obtener los datos, cuando se carga esta pantalla se ejecuta.

    useFocusEffect(useCallback(() => {
        loadTodayFood().catch(null);
    }, [loadTodayFood]))
    

    const handleAddCaloriesPress = () => {
        navigate('AddFood');
    };
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.caloriesContainer}>
                <View style={styles.leftContainer}>
                    <Text style={styles.caloriesLegend}>Calories</Text>
                </View>
                <View style={styles.rightContainer}>
                    <Button icon={<Icon name="add-circle-outline" color='#fff'/>} radius='lg' 
                    color='#4ecb71'
                    onPress={handleAddCaloriesPress}    
                    />
                </View>
            </View>
            <TodayCalories {...todayStatistics}/>
            <TodayMeals foods={todayFood} onCompleteAppRemove={() => loadTodayFood()}/>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff',
        flex: 1
    },
    caloriesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,

    },
    leftContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    rightContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    caloriesLegend: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})


export default Home;
