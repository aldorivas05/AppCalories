import { Text }                       from '@rneui/base';
import React, { useEffect, useState }            from 'react';
import Header                         from '../../components/Header';   
import { Alert, ScrollView, StyleSheet, View }    from 'react-native';
import { Button, Input, Icon }        from '@rneui/themed';
import AddFoodModal                   from '../../components/AddFoodModal';
import useFoodStorage                 from '../../hooks/useFoodStorage';
import { Meal } from '../../types';
import MealItem from '../../components/MealItem';


const AddFood = () => {
    const [visible, setIsvisible] = useState<boolean>(false);

    const [foods, setFoods] = useState<Meal[]>([])

    const {onGetFoods} = useFoodStorage();

    const [search, setSearch] = useState<string>('')

    const loadFoods = async () => {
        try {
            const foodsResponse = await onGetFoods();
            setFoods(foodsResponse);
        } catch (error) {
            console.error(error);
        }
    };
    //Esto es interezante, ver bien mañana.
    useEffect(() =>{
        loadFoods().catch(null);
    }, []);

    const handlerModalClose = async (shoulUpdate?: boolean) => {
        if (shoulUpdate) {
            Alert.alert('Comida guardada exitosamente')
            const foodsResponse = await onGetFoods();
            loadFoods();
        }
        setIsvisible(false);    
    };

    //Logica de busqueda

    const handleSearchPress = async () => {
        try {
            const result = await onGetFoods();
            setFoods(result.filter((item: Meal) => item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())));
        } catch (error) {
            console.error(error);
            setFoods([]);
        }
    }

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.addFoodContainer}>
                <View style={styles.legendContainer}>
                    <Text style={styles.addFoodLegend}>Add Food</Text>
                </View>
                <View style={styles.addFoodBtnContainer}>
                    <Button icon={<Icon name="add-circle-outline" color='#fff'/>} radius='lg' 
                        color='#4ecb71'
                        onPress={() => setIsvisible(true)}   
                    /> 
                </View>
            </View >
            <View style={styles.searchContainer}>
                <View style={styles.inputContainer}>
                    <Input placeholder='Apple, pie, soda...' value={search} onChangeText={(text: string) => setSearch(text)}/>
                </View>
                <View>
                    <Button title='Search' 
                        color="#ade8af" 
                        radius='md' 
                        titleStyle={styles.searchBtnTitle}
                        onPress={handleSearchPress}
                    />
                </View>
            </View>
            <ScrollView style={styles.content}>
                {foods?.map(meal => <MealItem itemPosition={0} key={`my-meal-item-${meal.name}`} {...meal} isAbleToApp />)}
            </ScrollView>
            <AddFoodModal visible={visible} onClose={handlerModalClose}/>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: '#fff',
        flex: 1,
    },
    addFoodContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24
    },
    legendContainer: {
        flex: 1,
    },
    addFoodLegend: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    addFoodBtnContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    searchContainer: {
        flexDirection: 'row',
    },
    inputContainer: {
        flex: 1
    },
    searchBtnTitle: {
        color: '#000',
        fontSize: 16
    },
    content: {
        // alignItems: 'center',
        // justifyContent: 'center'
    }
})

export default AddFood;