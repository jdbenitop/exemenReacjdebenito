import React, { useState } from 'react';
import { View, Text, TextInput, Button, Platform, Alert, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const NewTaskScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [deadline, setDeadline] = useState(null); 
    const [showDatePicker, setShowDatePicker] = useState(false); 

    const handleSaveTask = () => {
        if (title.trim() === '') {
            // Mostrar la alerta si no se ha introducido un título
            Alert.alert(
                'Título Obligatorio',
                'Es obligatorio escribir un título para añadir una nueva tarea.',
                [{ text: 'Entendido', onPress: () => console.log('Alert closed') }]
            );
            return;
        }

        const newTask = {
            id: Math.random(),
            title: title,
            deadline: deadline ? deadline.toLocaleDateString() : null
        };

        // Envía la nueva tarea de regreso a MainScreen
        navigation.navigate('MainScreen', { newTask: newTask });
    };

    const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker);
    };

    const onChangeDeadline = (event, selectedDate) => {
        const currentDate = selectedDate || deadline;
        setShowDatePicker(Platform.OS === 'ios');
        setDeadline(currentDate);
    };

    return (
        <View style={styles.container}>
            <Text>Crear Nueva Tarea</Text>
            <TextInput
                style={styles.input}
                placeholder="Título de la Tarea"
                value={title}
                onChangeText={text => setTitle(text)}
            />
            <View style={styles.buttonContainer}>
                <Button title="Seleccionar Fecha" onPress={toggleDatePicker} style={styles.dateButton} />
                <Button title="Guardar Tarea" onPress={handleSaveTask} />
            </View>
            {showDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={deadline || new Date()} 
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChangeDeadline}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateButton: {
        flex: 1, // El botón tomará todo el espacio disponible en el contenedor
        marginRight: 10, // Agrega margen a la derecha para separarlo del botón "Guardar Tarea"
    },
});

export default NewTaskScreen;
