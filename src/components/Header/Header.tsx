import { useNavigation }          from '@react-navigation/native';
import { Button, Image, Icon }    from '@rneui/themed';
import React                      from 'react';
import { View, Text, StyleSheet } from 'react-native';

const staticInfo = {
    name: 'Aldo Rivas',
    uri: 'https://media.licdn.com/dms/image/C5603AQEPdzHUZzNuTw/profile-displayphoto-shrink_800_800/0/1657140125599?e=1717632000&v=beta&t=8WYxLcWvI91LTu71iKBiICJhfKhyPzTTgopg9Ekk5b4',
}


const Header = () => {
    // Es una funcion que al ser llamada o instanciada nos regresa True o False
    // goBack es un metodo similar a Navigate pero nos lleva una ruta a atrás 
    const { canGoBack, goBack } = useNavigation();
    return (
        <View style={styles.container}>
            {/* Se agrega una validacion. Si puedo ir a atras, muestra el boton, sino undefined */}
            {canGoBack() ? (
                <View style={styles.arrowContainer}>
                    <Button icon={<Icon name='arrow-back' size={32} />} type='clear' onPress={() => goBack()} />
                </View>
            ): undefined}
            <View style={styles.leftContainer}>
                <Text style={styles.name}>{`Hi, ${staticInfo.name}`}</Text>
                <Text style={styles.subTitle}>Welcome back to your goal!</Text>
            </View>
            <View style={styles.rightContainer}>
                <Image source={{uri : staticInfo.uri}} style={styles.profileImage} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'center'

    },
    rightContainer: {
        flex: 1,
       alignItems: 'flex-end',
       justifyContent: 'center'
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    subTitle: {
        fontSize: 12,
        color: '#808080'
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 34
    },
    arrowContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: -12,
        marginRight: 5
    }
});

export default Header;