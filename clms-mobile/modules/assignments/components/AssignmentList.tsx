// AssignmentsList.js
import React, { useEffect, useState, useMemo } from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { format, startOfWeek } from 'date-fns';
import {AssignmentDetailsProjection, AssignmentProjection} from '@/core/modules/openapi';

type AssignmentsListProps = {
    assignments: AssignmentProjection[];
};

const AssignmentsList: React.FC<AssignmentsListProps> = ({ assignments }) => {
    const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
    const [filteredAssignments, setFilteredAssignments] = useState<AssignmentDetailsProjection[]>([]);
    const [groupedAssignments, setGroupedAssignments] = useState<{ [key: string]: AssignmentDetailsProjection[] }>({});

    // Generate unique months for the picker
    const months = useMemo(() => {
        const uniqueMonths = Array.from(new Set(assignments.map(assignment => {
            const date = assignment.dueDate ? new Date(assignment.dueDate) : null;
            return date ? format(date, 'MMMM yyyy') : '';
        }))).filter(Boolean);
        return uniqueMonths.map(month => ({ label: month, value: month }));
    }, [assignments]);

    useEffect(() => {
        updateFilteredAssignments();
        updateGroupedAssignments();
    }, [assignments, selectedMonths]);

    const updateFilteredAssignments = () => {
        const currentMonth = format(new Date(), 'MMMM yyyy');
        const selectedMonthValues = selectedMonths.length > 0 ? selectedMonths : [currentMonth];

        const filtered = assignments.filter(assignment => {
            const assignmentDate = assignment.dueDate ? new Date(assignment.dueDate) : null;
            if (!assignmentDate) return false;
            const assignmentMonth = format(assignmentDate, 'MMMM yyyy');
            return selectedMonthValues.includes(assignmentMonth);
        });
        setFilteredAssignments(filtered);
    };

    const updateGroupedAssignments = () => {
        const grouped: { [key: string]: AssignmentDetailsProjection[] } = {};
        filteredAssignments.forEach(assignment => {
            if (!assignment.dueDate) return;
            const dueDate = new Date(assignment.dueDate);
            const weekStart = startOfWeek(dueDate);
            const weekKey = format(weekStart, 'yyyy-MM-dd');

            if (!grouped[weekKey]) {
                grouped[weekKey] = [];
            }
            grouped[weekKey].push(assignment);
        });
        setGroupedAssignments(grouped);
    };

    const renderAssignment = ({ item }: { item: AssignmentDetailsProjection }) => (
        item.dueDate ?
        <View style={styles.assignmentCard}>
            <Text style={styles.assignmentTitle}>{item.name}</Text>
            <Text>Due: {format(new Date(item.dueDate), 'MM/dd/yyyy HH:mm a')}</Text>
        </View> : null
    );

    const renderGroup = ({ item: [week, assignments] }: { item: [string, AssignmentDetailsProjection[]] }) => (
        <View key={week} style={styles.weekGroup}>
            <Text style={styles.weekTitle}>Week of {format(new Date(week), 'MMMM d, yyyy')}</Text>
            <FlatList
                data={assignments}
                renderItem={renderAssignment}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                contentContainerStyle={styles.assignmentList}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    {selectedMonths.length === 0
                        ? `Assignments for ${format(new Date(), 'MMMM yyyy')}`
                        : `Assignments for selected Months: ${selectedMonths.join(', ')}`}
                </Text>
                <RNPickerSelect
                    onValueChange={(value) => {
                        if (value && !selectedMonths.includes(value)) {
                            setSelectedMonths(prev => [...prev, value]);
                        }
                    }}
                    items={months}
                    placeholder={{ label: 'Select Months', value: null }}
                    style={pickerSelectStyles}
                    useNativeAndroidPickerStyle={false}
                />
                {selectedMonths.length > 0 && (
                    <TouchableOpacity onPress={() => setSelectedMonths([])}>
                        <Text style={styles.clearText}>Clear Selection</Text>
                    </TouchableOpacity>
                )}
            </View>
            <FlatList
                data={Object.entries(groupedAssignments)}
                renderItem={renderGroup}
                keyExtractor={(item) => item[0]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#f8f8f8' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    headerText: { fontSize: 20, fontWeight: 'bold' },
    weekGroup: { marginBottom: 16 },
    weekTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
    assignmentList: { paddingBottom: 8 },
    assignmentCard: {
        width: 200,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginRight: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    assignmentTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
    clearText: { fontSize: 14, color: 'blue', marginLeft: 8 },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: { fontSize: 16, padding: 12, backgroundColor: '#fff', borderRadius: 4, color: '#000' },
    inputAndroid: { fontSize: 16, padding: 12, backgroundColor: '#fff', borderRadius: 4, color: '#000' },
});

export default AssignmentsList;
