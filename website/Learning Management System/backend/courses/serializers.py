from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Category, Course, Enrollment

User = get_user_model()

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    instructor_name = serializers.ReadOnlyField(source='instructor.username')
    category_name = serializers.ReadOnlyField(source='category.name')

    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'price', 'instructor', 'instructor_name', 'category', 'category_name', 'created_at']
        read_only_fields = ['instructor']

class EnrollmentSerializer(serializers.ModelSerializer):
    course_name = serializers.ReadOnlyField(source='course.title')

    class Meta:
        model = Enrollment
        fields = ['id', 'course', 'course_name', 'student', 'enrolled_at']
        read_only_fields = ['student']