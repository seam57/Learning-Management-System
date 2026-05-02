import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const Dashboard = () => {
    const [courses, setCourses] = useState([]);
    const [myEnrollments, setMyEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState({
        total_users: 0,
        total_courses: 0,
        total_enrollments: 0,
        role_wise_count: { instructor: 0, student: 0 }
    });

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            // আপনার ব্যাকএন্ড অনুযায়ী সঠিক পাথ: api/courses/courses/
            const coursesRes = await axiosInstance.get('courses/courses/');
            setCourses(coursesRes.data);

            // আপনার ব্যাকএন্ড অনুযায়ী সঠিক পাথ: api/courses/enrollments/
            const enrollmentsRes = await axiosInstance.get('courses/enrollments/');
            setMyEnrollments(enrollmentsRes.data);

            // আপনার ব্যাকএন্ড অনুযায়ী সঠিক পাথ: api/courses/dashboard-summary/
            const summaryRes = await axiosInstance.get('courses/dashboard-summary/');
            setSummary(summaryRes.data);

            setLoading(false);
        } catch (err) {
            console.error("Error fetching data", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const handleEnroll = (courseId) => {
        // এনরোল করার জন্য পাথ: api/courses/enrollments/
        axiosInstance.post('courses/enrollments/', { course: courseId })
            .then(res => {
                alert("Congratulations! Successfully enrolled.");
                fetchDashboardData();
            })
            .catch(err => {
                alert(err.response?.data?.detail || "Enrollment failed!");
            });
    };

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
            <div className="spinner-border text-primary" role="status"></div>
        </div>
    );

    return (
        <div className="container mt-5">
            {/* --- Summary Cards Section --- */}
            <div className="row mb-5">
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm text-white" style={{ background: 'linear-gradient(45deg, #4e73df, #224abe)', borderRadius: '15px' }}>
                        <div className="card-body text-center p-4">
                            <h6 className="text-uppercase small fw-bold opacity-75">Total Courses</h6>
                            <h2 className="display-6 fw-bold">{summary.total_courses}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm text-white" style={{ background: 'linear-gradient(45deg, #1cc88a, #13855c)', borderRadius: '15px' }}>
                        <div className="card-body text-center p-4">
                            <h6 className="text-uppercase small fw-bold opacity-75">Students</h6>
                            <h2 className="display-6 fw-bold">{summary.role_wise_count?.student || 0}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm text-white" style={{ background: 'linear-gradient(45deg, #36b9cc, #258391)', borderRadius: '15px' }}>
                        <div className="card-body text-center p-4">
                            <h6 className="text-uppercase small fw-bold opacity-75">Instructors</h6>
                            <h2 className="display-6 fw-bold">{summary.role_wise_count?.instructor || 0}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm text-white" style={{ background: 'linear-gradient(45deg, #f6c23e, #dda20a)', borderRadius: '15px' }}>
                        <div className="card-body text-center p-4">
                            <h6 className="text-uppercase small fw-bold opacity-75">My Enrollments</h6>
                            <h2 className="display-6 fw-bold">{myEnrollments.length}</h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Enrolled Courses Section --- */}
            <div className="d-flex align-items-center mb-4">
                <div style={{ width: '5px', height: '30px', backgroundColor: '#198754', marginRight: '10px', borderRadius: '5px' }}></div>
                <h3 className="fw-bold mb-0">My Enrolled Courses</h3>
            </div>

            <div className="row mb-5">
                {myEnrollments.length > 0 ? (
                    myEnrollments.map(item => (
                        <div className="col-md-4 mb-4" key={item.id}>
                            <div className="card h-100 border-0 shadow-sm" style={{ borderRadius: '12px', borderLeft: '5px solid #198754' }}>
                                <div className="card-body p-4">
                                    <h5 className="card-title fw-bold mb-3">{item.course_name}</h5>
                                    <button className="btn btn-success w-100 rounded-pill fw-bold">Continue Learning</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center py-4 bg-light rounded">
                        <p className="text-muted mb-0">No enrollments found.</p>
                    </div>
                )}
            </div>

            <hr className="my-5 opacity-25" />

            {/* --- Available Courses Section --- */}
            <div className="d-flex align-items-center mb-4">
                <div style={{ width: '5px', height: '30px', backgroundColor: '#0d6efd', marginRight: '10px', borderRadius: '5px' }}></div>
                <h3 className="fw-bold mb-0">Available Courses</h3>
            </div>

            <div className="row">
                {courses.length > 0 ? (
                    courses.map(course => {
                        const isEnrolled = myEnrollments.some(e => e.course === course.id);
                        return (
                            <div className="col-md-4 mb-4" key={course.id}>
                                <div className="card h-100 border-0 shadow-sm overflow-hidden" style={{ borderRadius: '15px' }}>
                                    <div className="card-body p-4 d-flex flex-column">
                                        <div className="mb-2">
                                            <span className="badge bg-light text-primary border border-primary-subtle rounded-pill">{course.category_name}</span>
                                        </div>
                                        <h5 className="card-title fw-bold text-dark">{course.title}</h5>
                                        <p className="card-text text-muted flex-grow-1" style={{ fontSize: '0.9rem' }}>
                                            {course.description?.substring(0, 90)}...
                                        </p>
                                        <div className="mt-4 pt-3 border-top d-flex justify-content-between align-items-center">
                                            <h5 className="mb-0 fw-bold text-success">{course.price} <small className="small text-muted">TK</small></h5>
                                            <button
                                                className={`btn btn-sm px-4 rounded-pill fw-bold ${isEnrolled ? 'btn-secondary disabled' : 'btn-primary'}`}
                                                onClick={() => !isEnrolled && handleEnroll(course.id)}
                                            >
                                                {isEnrolled ? 'Enrolled' : 'Enroll Now'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="col-12 text-center py-4">
                        <p className="text-muted">No courses available.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;