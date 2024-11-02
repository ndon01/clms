// CourseCard.js
import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

const CourseCard = ({ course }: any) => {

    const viewCourse = () => {
        console.log('Viewing course:', course.id);
    };

    if (!course) {
        return (
            <View style={styles.card}>
                <Text style={styles.header}>No Course Found</Text>
                <Text>No course found with the given ID.</Text>
            </View>
        );
    }

    return (
        <View style={styles.card}>
            <Text style={styles.header}>{course.name || 'NO NAME FOUND'}</Text>
            <Text style={styles.subHeader}>{course.id || 'NO ID FOUND'}</Text>
            <Text>{course.description || 'NO DESCRIPTION FOUND'}</Text>
            <TouchableOpacity style={styles.button} onPress={viewCourse}>
                <Text style={styles.buttonText}>View Course</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 250,
        height: 250,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        margin: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subHeader: {
        fontSize: 14,
        color: '#555',
        marginBottom: 8,
    },
    button: {
        marginTop: 16,
        paddingVertical: 8,
        backgroundColor: '#28a745',
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default CourseCard;
