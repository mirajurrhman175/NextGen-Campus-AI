import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";

import AdminDashboard from "./pages/Admin/Dashboard";
import AdminProfile from "./pages/Admin/Profile";
import UserManagement from "./pages/Admin/UserManagement";
import CourseManagement from "./pages/Admin/CourseManagement";
import RoutineManagement from "./pages/Admin/Routine";
import ExamRoutineManagement from "./pages/Admin/ExamRoutine";
import NoticeManagement from "./pages/Admin/Notices";
import EnrollmentManagement from "./pages/Admin/Enrollments";
import TeacherDashboard from "./pages/Teacher/Dashboard";
import TeacherCourses from "./pages/Teacher/Courses";
import TeacherStudents from "./pages/Teacher/Students";
import TeacherAssignments from "./pages/Teacher/Assignments";
import TeacherAssignmentForm from "./pages/Teacher/AssignmentForm";
import TeacherCTNotices from "./pages/Teacher/CTNotices";
import TeacherCourseMaterials from "./pages/Teacher/CourseMaterials";
import TeacherProfile from "./pages/Teacher/Profile";
import TeacherAIQuiz from "./pages/Teacher/AIQuiz";
import StudentDashboard from "./pages/Student/Dashboard";
import GenericPage from "./pages/Student/GenericPage";

import AIChat from "./pages/AI/AIChat";
import StudyPlanner from "./pages/AI/StudyPlanner";
import AssignmentHelper from "./pages/AI/AssignmentHelper";
import QuizGenerator from "./pages/AI/QuizGenerator";
import NoteSummarizer from "./pages/AI/NoteSummarizer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/courses" element={<CourseManagement />} />
        <Route path="/admin/routine" element={<RoutineManagement />} />
        <Route path="/admin/exam-routine" element={<ExamRoutineManagement />} />
        <Route path="/admin/notices" element={<NoticeManagement />} />
        <Route path="/admin/enrollments" element={<EnrollmentManagement />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/profile" element={<TeacherProfile />} />
        <Route path="/teacher/courses" element={<TeacherCourses />} />
        <Route path="/teacher/students" element={<TeacherStudents />} />
        <Route path="/teacher/assignments" element={<TeacherAssignments />} />
        <Route path="/teacher/assignments/create" element={<TeacherAssignmentForm />} />
        <Route path="/teacher/assignments/:id/edit" element={<TeacherAssignmentForm />} />
        <Route path="/teacher/ct-notices" element={<TeacherCTNotices />} />
        <Route path="/teacher/course-materials" element={<TeacherCourseMaterials />} />
        <Route path="/teacher/ai-quiz" element={<TeacherAIQuiz />} />

        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student-profile" element={<GenericPage title="Profile" subtitle="Student profile overview" description="Manage your profile information and academic details here." />} />
        <Route path="/student-routine" element={<GenericPage title="Routine" subtitle="Class timetable" description="View your weekly class routine and timetable updates." />} />
        <Route path="/student-exam-routine" element={<GenericPage title="Exam Routine" subtitle="Upcoming examinations" description="Check exam dates, rooms, and schedules for your current semester." />} />
        <Route path="/student-notices" element={<GenericPage title="Notices" subtitle="Academic announcements" description="Stay updated with official notices and important announcements." />} />
        <Route path="/student-assignments" element={<GenericPage title="Assignments" subtitle="Pending tasks" description="Track assignments, due dates, and submission status." />} />
        <Route path="/student-courses" element={<GenericPage title="Courses" subtitle="Current course list" description="Review your enrolled courses and academic progress." />} />
        <Route path="/student-materials" element={<GenericPage title="Course Materials" subtitle="Study resources" description="Access notes, slides, documents, and course resources." />} />
        
        <Route path="/ai-chat" element={<AIChat />} />
        
        <Route path="/study-planner" element={<StudyPlanner />} />
        
        <Route path="/ai-assignment-helper" element={<AssignmentHelper />} />
        
        <Route path="/quiz-generator" element={<QuizGenerator />}/>
        
        <Route path="/note-summarizer" element={<NoteSummarizer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;