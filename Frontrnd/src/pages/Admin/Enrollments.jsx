import { useEffect, useState } from "react";
import DashboardLayout from "../../components/admin/DashboardLayout";
import LoadingSpinner from "../../components/admin/LoadingSpinner";
import api from "../../services/api";

const Enrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEnrollments = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/enrollments");
        const data = response?.data?.data ?? response?.data ?? [];
        setEnrollments(Array.isArray(data) ? data : []);
      } catch {
        setError("No enrollment API is currently available in the backend for admin operations.");
      } finally {
        setLoading(false);
      }
    };

    loadEnrollments();
  }, []);

  return (
    <DashboardLayout title="Enrollments" subtitle="Enrollment information and operations">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-shadow duration-300 hover:shadow-lg">
        {loading ? (
          <div className="flex justify-center p-8">
            <LoadingSpinner size="lg" />
          </div>
        ) : error ? (
          <div className="rounded-t-2xl border-b border-amber-200 bg-amber-50 px-6 py-4">
            <p className="text-sm font-medium text-amber-800">{error}</p>
          </div>
        ) : enrollments.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm text-slate-500">No enrollment records found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Student</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Course</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.map((item, idx) => (
                  <tr key={item.id} className={`border-b border-slate-100 transition-colors duration-200 hover:bg-slate-50 ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                    <td className="px-6 py-4 font-medium text-slate-800">{item.student?.name || item.student_id || "-"}</td>
                    <td className="px-6 py-4 text-slate-600">{item.course?.course_name || item.course_id || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Enrollments;