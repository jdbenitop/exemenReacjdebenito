import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';

const MainScreen = ({ navigation, route }) => {
    const [tasks, setTasks] = useState(route.params?.tasks || []);

    useEffect(() => {
        if (route.params && route.params.newTask) {
            const newTask = route.params.newTask;
            setTasks(prevTasks => [...prevTasks, newTask]);
        }
    }, [route.params]);

    const handleToggleTask = (taskId) => {
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    const handleConfirmDelete = (taskId) => {
        Alert.alert(
            'Confirmar Eliminación',
            '¿Estás seguro de que deseas eliminar esta tarea?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => {
                        const updatedTasks = tasks.filter(task => task.id !== taskId);
                        setTasks(updatedTasks);
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const renderItem = ({ item }) => (
        <View style={styles.taskContainer}>
            <TouchableOpacity onPress={() => handleToggleTask(item.id)}>
                {item.deadline ? (
                    <Text style={item.completed ? styles.completedTask : styles.taskText}>
                        {item.title} - {item.deadline}
                    </Text>
                ) : (
                    <Text style={item.completed ? styles.completedTask : styles.taskText}>
                        {item.title}
                    </Text>
                )}
            </TouchableOpacity>
            <Button title="Eliminar" onPress={() => handleConfirmDelete(item.id)} color="red" />
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={tasks}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
            <View style={styles.buttonContainer}>
                <Button
                    title="Crear Nueva Tarea"
                    onPress={() => navigation.navigate('NewTask')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    taskContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    taskText: {
        fontSize: 16,
    },
    completedTask: {
        fontSize: 16,
        textDecorationLine: 'line-through',
        color: 'gray',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
});

export default MainScreen;
