// DashboardPage.js
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import CourseCard from '../../modules/courses/components/CourseCard'; // Create a CourseCard component similar to `app-course-card`
import AssignmentList from '../../modules/assignments/components/AssignmentList';
import {
    Assignment,
    AssignmentProjection,
    CourseApi,
    CourseDetailsProjection
} from "@/core/modules/openapi"; // Create an AssignmentList component similar to `app-assignments-list`

const DashboardPage = () => {
    const [myCourses, setMyCourses] = useState<CourseDetailsProjection[]>([]); // Null initially for skeleton loading
    const [myAssignments, setMyAssignments] = useState<AssignmentProjection[]>([]);

    const coursesApi = new CourseApi();

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        coursesApi.getMyCourses().then(({ data }) => {
            setMyCourses(data);
            fetchAssignments(data);
        });
    };

    const fetchAssignments = async (courses: CourseDetailsProjection[]) => {
        try {
            const courseIds = courses.map(course => course.id);
            let assignments: Assignment[] = [];

            for (let courseId of courseIds) {
                if (!courseId) continue;

                const { data } = await coursesApi.getCourseAssignments(courseId);


                assignments = [...assignments, ...data];
            }

            setMyAssignments(assignments);
        } catch (error) {
            console.error('Error fetching assignments:', error);
        }
    };

    const renderCourseSkeleton = () => (

        <SkeletonPlaceholder>
            <React.Fragment>
                {[...Array(10)].map((_, index) => (
                    <View key={index} style={styles.skeletonCard} />
                ))}
            </React.Fragment>
        </SkeletonPlaceholder>
    );

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.title}>My Courses</Text>
                {myCourses == null ? (
                    renderCourseSkeleton()
                ) : (
                    <FlatList
                        horizontal
                        data={myCourses}
                        renderItem={({ item }) => <CourseCard course={item} />}
                        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                        contentContainerStyle={styles.courseList}
                    />
                )}
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>My Assignments</Text>
                {myAssignments.length === 0 ? (
                    <Text>No Assignments available</Text>
                ) : (
                    <AssignmentList assignments={myAssignments} />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f8f8' },
    section: { padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    courseList: { flexDirection: 'row', gap: 10 },
    skeletonCard: { width: 120, height: 120, borderRadius: 10, marginRight: 10 },
});

export default DashboardPage;
