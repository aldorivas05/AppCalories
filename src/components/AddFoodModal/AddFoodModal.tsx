import React, {FC, useEffect, useState} from 'react';
import  {Modal, StyleSheet, Text, View } from 'react-native';
import { Button, Icon, Input } from '@rneui/themed';
import useFoodStorage from '../../hooks/useFoodStorage';

type AddFoodModalProps = {
  onClose: (shoulUpdate?: boolean) => void;
  visible: boolean;
}

const AddFoodModal: FC<AddFoodModalProps> = ({onClose, visible}) => {

  const [calories, setCalories] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [portion, setPortion] = useState<string>('');
  const {onSaveFood} = useFoodStorage();

  //El useEffect para limpiar el form despues de cerrarlo.
  useEffect(() => {
    setCalories('');
    setName('');
    setPortion('');
  }, [visible])

  //Afregamos un metodo para guardar la info al presionar el boton
  const handlerAddPress = async () => {
    try {
      await onSaveFood({
        calories, 
        name, 
        portion
      })
      onClose(true);
    } catch (error) {
      console.error(error);
      
    }
  }

  return (
    <Modal visible={visible} onRequestClose={() => onClose()} transparent animationType='fade'>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.closeContainer}>
            <Button icon={<Icon name='close' size={28}/>} onPress={() => onClose()} type='clear'/>
          </View>
          <View style={styles.formItem}>
            <View style={styles.inputContainer}>
              <Input value={calories} onChangeText={(text: string) => setCalories(text)}/>
            </View>
            <View style={styles.legendContainer}>
              <Text style={styles.legend}>KCal</Text>
            </View>
          </View>
          <View style={styles.formItem}>
            <View style={styles.inputContainer}>
              <Input value={name} onChangeText={(text: string) => setName(text)}/>
            </View>
            <View style={styles.legendContainer}>
              <Text style={styles.legend}>Name</Text>
            </View>
          </View>
          <View style={styles.formItem}>
            <View style={styles.inputContainer}>
              <Input value={portion}  onChangeText={(text: string) => setPortion(text)}/>
            </View>
            <View style={styles.legendContainer}>
              <Text style={styles.legend}>Portion</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
              <Button 
                onPress={handlerAddPress}
                title='Add' 
                icon={<Icon name='add' color='#fff'/>} 
                color='#4ecb71' 
                radius='md' 
                disabled={calories.trim() === '' || name.trim() === '' || portion.trim() === ''}
              />
          </View>
        </View>
      </View>
    </Modal>
  )
};

export default AddFoodModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  content: {
    width: '75%',
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  closeContainer: {
    alignItems: 'flex-end',
    marginRight: -12
  },
  formItem: {
    flexDirection: 'row',
    alignItems: 'center',
  
  },
  inputContainer: {
    flex: 2
  },
  legendContainer: {
    flex: 1
  },
  legend: {
    fontWeight: '500'
  },
  buttonContainer: {
    alignItems: 'flex-end'
  },
  addFormBtn: {

  }
})