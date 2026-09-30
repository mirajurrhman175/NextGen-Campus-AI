import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  BellRing,
  BrainCircuit,
  CalendarDays,
  ClipboardCheck,
  FileCheck2,
  FileText,
  FolderOpen,
  MessageSquareText,
  NotebookPen,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import StudentLayout from "../../components/student/StudentLayout";
import DashboardStatCard from "../../components/student/DashboardStatCard";
import { getStudentDashboard } from "../../services/studentService";

const formatTitle = (value) => {
  if (!value) return "Student";
  return value.split(" ")[0];
};

const quickAccessItems = [
  { title: "Class Routine", path: "/student-routine", icon: CalendarDays },
  { title: "Exam Routine", path: "/student-exam-routine", icon: ClipboardCheck },
  { title: "Assignments", path: "/student-assignments", icon: FileText },
  { title: "Courses", path: "/student-courses", icon: BookOpen },
  { title: "Course Materials", path: "/student-materials", icon: FolderOpen },
  { title: "Notices", path: "/student-notices", icon: BellRing },
];

const aiTools = [
  {
    title: "AI Chat Assistant",
    description: "Ask questions and get academic explanations.",
    path: "/ai-chat",
    icon: MessageSquareText,
  },
  {
    title: "AI Study Planner",
    description: "Create a personalized study schedule.",
    path: "/study-planner",
    icon: BrainCircuit,
  },
  {
    title: "AI Assignment Helper",
    description: "Get guidance for understanding assignments.",
    path: "/ai-assignment-helper",
    icon: Sparkles,
  },
  {
    title: "AI Quiz Generator",
    description: "Generate practice quizzes from topics.",
    path: "/quiz-generator",
    icon: FileCheck2,
  },
  {
    title: "AI Note Summarizer",
    description: "Summarize lecture notes and study materials.",
    path: "/note-summarizer",
    icon: NotebookPen,
  },
];

const Dashboard = () => {
  const [summary, setSummary] = useState({
    enrolledCourses: 0,
    pendingAssignments: 0,
    upcomingExams: 0,
    newNotices: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getStudentDashboard();
        const data = response?.data || response || {};

        if (isMounted) {
          setSummary({
            enrolledCourses: Number(data.total_enrolled_courses ?? 0),
            pendingAssignments: Number(data.pending_assignments ?? 0),
            upcomingExams: Array.isArray(data.upcoming_exam_routines)
              ? data.upcoming_exam_routines.length
              : 0,
            newNotices: Array.isArray(data.latest_notices)
              ? data.latest_notices.length
              : 0,
          });
        }
      } catch {
        if (isMounted) {
          setError("Unable to load dashboard summary right now.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  const statCards = [
    {
      title: "Enrolled Courses",
      value: loading ? "..." : summary.enrolledCourses,
      subtitle: "Current active courses",
      icon: BookOpen,
      accent: "blue",
    },
    {
      title: "Pending Assignments",
      value: loading ? "..." : summary.pendingAssignments,
      subtitle: "Needs attention",
      icon: FileText,
      accent: "amber",
    },
    {
      title: "Upcoming Exams",
      value: loading ? "..." : summary.upcomingExams,
      subtitle: "This month",
      icon: ClipboardCheck,
      accent: "green",
    },
    {
      title: "New Notices",
      value: loading ? "..." : summary.newNotices,
      subtitle: "Unread academic updates",
      icon: BellRing,
      accent: "purple",
    },
  ];

  return (
    <StudentLayout
      title="Dashboard"
      subtitle="Here's what's happening with your academic activities."
    >
      <div className="space-y-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-600">
            Welcome back
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-800 sm:text-3xl">
            Welcome back, {formatTitle(user?.name || "Student")}!
          </h2>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Here's what's happening with your academic activities.
          </p>
        </section>

        {error && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            {error}
          </div>
        )}

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {statCards.map((card) => (
            <DashboardStatCard key={card.title} {...card} />
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">Today's Classes</h3>
              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                Live schedule
              </span>
            </div>

            <div className="space-y-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-slate-800">Web Engineering</p>
                    <p className="text-sm text-slate-500">CSE 3101</p>
                  </div>
                  <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
                    Today
                  </span>
                </div>
                <div className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-3">
                  <span>Mon, 10:00 AM</span>
                  <span>Room 402</span>
                  <span>Prof. Rahman</span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-slate-800">Database Systems</p>
                    <p className="text-sm text-slate-500">CSE 2205</p>
                  </div>
                  <span className="rounded-full bg-sky-100 px-2.5 py-1 text-xs font-medium text-sky-700">
                    Upcoming
                  </span>
                </div>
                <div className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-3">
                  <span>Tue, 11:30 AM</span>
                  <span>Room 305</span>
                  <span>Dr. Sultana</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">Upcoming Assignments</h3>
              <span className="text-xs font-medium text-blue-600">3 due soon</span>
            </div>

            <div className="space-y-3">
              {[
                { title: "AI Lab Report", course: "AI Fundamentals", due: "Due today", tone: "red" },
                { title: "Mobile UI Design", course: "Mobile Computing", due: "Due in 2 days", tone: "amber" },
                { title: "Research Summary", course: "Software Engineering", due: "Due in 5 days", tone: "blue" },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-slate-200 p-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-800">{item.title}</p>
                      <p className="text-sm text-slate-500">{item.course}</p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                        item.tone === "red"
                          ? "bg-rose-100 text-rose-700"
                          : item.tone === "amber"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {item.due}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">Upcoming Exams</h3>
              <Link to="/student-exam-routine" className="text-sm font-medium text-blue-600 hover:underline">
                View all
              </Link>
            </div>

            <div className="space-y-3">
              {[
                { course: "Algorithms", date: "12 Aug 2026", time: "09:00 AM" },
                { course: "Operating Systems", date: "15 Aug 2026", time: "11:00 AM" },
              ].map((exam) => (
                <div key={exam.course} className="rounded-xl border border-slate-200 p-3.5">
                  <p className="font-semibold text-slate-800">{exam.course}</p>
                  <p className="mt-1 text-sm text-slate-500">{exam.date} • {exam.time}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">Latest Notices</h3>
              <Link to="/student-notices" className="text-sm font-medium text-blue-600 hover:underline">
                View All Notices
              </Link>
            </div>

            <div className="space-y-3">
              {[
                { title: "Midterm exam timetable published", text: "Check the updated schedule and room arrangement.", date: "2 hours ago" },
                { title: "Workshop registration open", text: "Register before Friday for the AI and robotics workshop.", date: "Yesterday" },
              ].map((notice) => (
                <div key={notice.title} className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-800">{notice.title}</p>
                      <p className="mt-1 text-sm text-slate-500">{notice.text}</p>
                    </div>
                    <span className="text-xs text-slate-400">{notice.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800">Quick Access</h3>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {quickAccessItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  to={item.path}
                  className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-blue-50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                      <Icon size={20} />
                    </div>
                    <span className="text-sm font-medium text-blue-600">Open</span>
                  </div>
                  <p className="mt-4 font-semibold text-slate-800">{item.title}</p>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800">AI Learning Tools</h3>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {aiTools.map((tool) => {
              const Icon = tool.icon;

              return (
                <Link
                  key={tool.title}
                  to={tool.path}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-blue-50"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                    <Icon size={20} />
                  </div>
                  <p className="mt-4 text-base font-semibold text-slate-800">{tool.title}</p>
                  <p className="mt-2 text-sm text-slate-500">{tool.description}</p>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-blue-600">
                    Open <span className="ml-1">→</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </StudentLayout>
  );
};

export default Dashboard;