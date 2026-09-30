import { useState, useRef, useEffect } from "react";
import {
  LayoutDashboard, User, MessageSquare, CalendarDays, Puzzle,
  BookOpen, Bell, Settings, LogOut, Search, Send, Plus,
  Paperclip, Download, TrendingUp, Users, GraduationCap, Brain,
  Zap, Star, CheckCircle2, Clock, Menu, X,
  BarChart2, Award, Target, ArrowRight,
  MoreHorizontal, Pencil, Trash2, Shield, Activity, FileText,
  Check, RefreshCw, AlertTriangle, Layers, UserCheck, Globe,
  ChevronRight, Flame
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, AreaChart, Area,
  PieChart as RPieChart, Pie, Cell, Legend
} from "recharts";



// ─── Logo ─────────────────────────────────────────────────────────────────────

function Logo({ onClick, compact = false }: { onClick?: () => void; compact?: boolean }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-xl bg-[#2563EB] flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
        <Brain size={16} className="text-white" />
      </div>
      {!compact && (
        <span className="font-bold text-[#1F2937] text-sm leading-tight">
          AI Campus<br />
          <span className="text-[#2563EB]">Assistant</span>
        </span>
      )}
    </button>
  );
}




// ─── Sidebar ──────────────────────────────────────────────────────────────────

const sidebarItems = [
  { label: "Dashboard", icon: LayoutDashboard, page: "admin-dashboard" as Page },
  { label: "Profile", icon: Settings, page: "admin-profile" as Page },
  { label: "Users", icon:  User, page: "users" as Page }, 
  { label: "Courses", icon: BookOpen, page: "courses" as Page }, 
  { label: "Enrollments", icon: GraduationCap, page: "enrollments" as Page },
  { label: "Routine", icon: CalendarDays, page: "routine" as Page },
  { label: "Exam-Routine", icon: CalendarDays, page: "exam-routine" as Page },
  { label: "Notice", icon: Bell, page: "notice" as Page },
];


function Sidebar({
  currentPage, navigate, collapsed, setCollapsed,
}: {
  currentPage: Page; navigate: (p: Page) => void;
  collapsed: boolean; setCollapsed: (v: boolean) => void;
}) {
  return (
    <aside className={cn(
      "flex-shrink-0 h-screen sticky top-0 bg-white border-r border-blue-50 flex flex-col transition-all duration-300 overflow-hidden",
      collapsed ? "w-16" : "w-60"
    )}>
      <div className="h-16 flex items-center justify-between px-4 border-b border-blue-50 flex-shrink-0">
        {!collapsed ? (
          <>
            <Logo onClick={() => navigate("admin-dashboard")} />
            <button onClick={() => setCollapsed(true)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
              <Menu size={16} />
            </button>
          </>
        ) : (
          <button onClick={() => setCollapsed(false)} className="mx-auto p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
            <Menu size={16} />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
        {!collapsed && (
          <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest px-3 mb-2">Main</p>
        )}
        {sidebarItems.map(({ label, icon: Icon, page }) => {
          const active = currentPage === page && ["admin-dashboard","admin-profile","users","courses","enrollments", "routine", "exam-routine", "notice"].includes(page);
          const isActive = currentPage === page;
          return (
            <button key={label} onClick={() => navigate(page)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                isActive ? "bg-[#2563EB] text-white shadow-md shadow-blue-500/20" : "text-[#4B5563] hover:bg-blue-50 hover:text-[#2563EB]",
                collapsed && "justify-center px-0"
              )}
              title={collapsed ? label : undefined}>
              <Icon size={18} className="flex-shrink-0" />
              {!collapsed && <span>{label}</span>}
            </button>
          );
        })}

        <div className={cn("my-3", collapsed ? "border-t border-gray-100 mx-2" : "")} />
        {!collapsed && (
          <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest px-3 mb-2">Demo Roles</p>
        )}
        {roleItems.map(({ label, icon: Icon, page }) => (
          <button key={label} onClick={() => navigate(page)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
              currentPage === page
                ? "bg-amber-50 text-amber-700"
                : "text-[#6B7280] hover:bg-amber-50 hover:text-amber-700",
              collapsed && "justify-center px-0"
            )}
            title={collapsed ? label : undefined}>
            <Icon size={18} className="flex-shrink-0" />
            {!collapsed && <span>{label}</span>}
          </button>
        ))}
      </nav>

      <div className="p-2 border-t border-gray-100 flex-shrink-0">
        {!collapsed && (
          <div className="flex items-center gap-2.5 px-3 py-2.5 mb-1 rounded-xl bg-blue-50">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2563EB] to-[#60A5FA] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">SJ</div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#1F2937] truncate">Sarah Johnson</p>
              <p className="text-[10px] text-gray-400 truncate">CS — Semester 5</p>
            </div>
          </div>
        )}
        <button onClick={() => navigate("landing")}
          className={cn("w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-red-400 hover:bg-red-50 transition-all", collapsed && "justify-center px-0")}
          title={collapsed ? "Logout" : undefined}>
          <LogOut size={16} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

// ─── Dashboard Layout ─────────────────────────────────────────────────────────

function DashboardLayout({
  currentPage, navigate, children, title, subtitle,
}: {
  currentPage: Page; navigate: (p: Page) => void;
  children: React.ReactNode; title: string; subtitle?: string;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <div className="hidden md:flex">
        <Sidebar currentPage={currentPage} navigate={navigate} collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {mobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileSidebarOpen(false)} />
          <div className="relative z-50">
            <Sidebar currentPage={currentPage} navigate={(p) => { navigate(p); setMobileSidebarOpen(false); }}
              collapsed={false} setCollapsed={() => {}} />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center px-4 sm:px-6 gap-4 flex-shrink-0">
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setMobileSidebarOpen(true)}>
            <Menu size={20} className="text-gray-500" />
          </button>
          <div>
            <h1 className="font-bold text-[#1F2937] text-base sm:text-lg leading-tight">{title}</h1>
            {subtitle && <p className="text-xs text-gray-400 hidden sm:block">{subtitle}</p>}
          </div>
          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 border border-gray-100">
              <Search size={14} className="text-gray-400" />
              <input placeholder="Search..." className="bg-transparent text-sm text-gray-600 outline-none w-32" />
            </div>
            <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <Bell size={18} className="text-gray-500" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2563EB] to-[#60A5FA] flex items-center justify-center text-white text-xs font-bold cursor-pointer flex-shrink-0">
              SJ
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ label, value, sub, icon: Icon, color, trend }: {
  label: string; value: string; sub?: string;
  icon: React.ElementType; color: string; trend?: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
          <p className="mt-1.5 text-2xl font-bold text-[#1F2937]">{value}</p>
          {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
          {trend && (
            <p className="text-xs font-semibold text-emerald-500 mt-1 flex items-center gap-1">
              <TrendingUp size={11} /> {trend}
            </p>
          )}
        </div>
        <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center shadow-md`}>
          <Icon size={20} className="text-white" />
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// Admin Dashboard
// ══════════════════════════════════════════════════════════════════════════════

const userTable = [
  { name: "Sarah Johnson", id: "STU-0382", role: "Student", dept: "CS", status: "Active", joined: "Aug 2024" },
  { name: "Dr. Marcus Chen", id: "FAC-0091", role: "Teacher", dept: "CS", status: "Active", joined: "Jan 2023" },
  { name: "Priya Patel", id: "STU-0519", role: "Student", dept: "Engineering", status: "Active", joined: "Aug 2024" },
  { name: "James Wilson", id: "STU-0287", role: "Student", dept: "Mathematics", status: "Suspended", joined: "Jan 2024" },
  { name: "Dr. Linda Kim", id: "FAC-0048", role: "Teacher", dept: "Physics", status: "Active", joined: "Mar 2022" },
];

function AdminDashboard({ navigate }: { navigate: (p: Page) => void }) {
  const [tab, setTab] = useState<"users" | "courses" | "activity">("users");

  return (
    <DashboardLayout currentPage="admin-dashboard" navigate={navigate} title="Admin Dashboard" subtitle="System Administration & Platform Analytics">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Users" value="13,284" sub="+124 this month" icon={Users} color="bg-[#2563EB]" trend="+2.4%" />
        <StatCard label="Students" value="12,440" sub="Active this semester" icon={GraduationCap} color="bg-emerald-500" />
        <StatCard label="Faculty" value="844" sub="12 departments" icon={BookOpen} color="bg-purple-500" />
        <StatCard label="Departments" value="12" sub="All operational" icon={Layers} color="bg-amber-500" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-[#1F2937] mb-1">User Growth</h3>
          <p className="text-xs text-gray-400 mb-4">Students & Faculty — Jan–Jun 2025</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={userGrowthData}>
              <defs>
                <linearGradient id="studGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E5E7EB" }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="students" stroke="#2563EB" strokeWidth={2.5} fill="url(#studGrad)" name="Students" />
              <Line type="monotone" dataKey="faculty" stroke="#F59E0B" strokeWidth={2} dot={false} name="Faculty" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-[#1F2937] mb-1">Feature Usage</h3>
          <p className="text-xs text-gray-400 mb-4">Platform feature distribution</p>
          <div className="flex items-center gap-3">
            <ResponsiveContainer width="55%" height={180}>
              <RPieChart>
                <Pie data={systemUsagePie} cx="50%" cy="50%" innerRadius={42} outerRadius={72} dataKey="value" paddingAngle={3}>
                  {systemUsagePie.map(({ color }, i) => <Cell key={i} fill={color} />)}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v) => [`${v}%`, "Usage"]} />
              </RPieChart>
            </ResponsiveContainer>
            <div className="space-y-2 flex-1">
              {systemUsagePie.map(({ name, value, color }) => (
                <div key={name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                  <span className="text-xs text-gray-600 flex-1">{name}</span>
                  <span className="text-xs font-bold text-[#1F2937]">{value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center border-b border-gray-100 px-5 gap-1 overflow-x-auto">
          {(["users", "courses", "activity"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={cn("py-4 px-4 text-sm font-bold border-b-2 -mb-px transition-colors whitespace-nowrap capitalize",
                tab === t ? "border-[#2563EB] text-[#2563EB]" : "border-transparent text-gray-400 hover:text-gray-600")}>
              {t === "users" ? "User Management" : t === "courses" ? "Course Management" : "Recent Activity"}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2 py-2 flex-shrink-0">
            <div className="hidden sm:flex items-center gap-2 bg-gray-50 rounded-lg px-2.5 py-2 border border-gray-100">
              <Search size={13} className="text-gray-400" />
              <input placeholder="Search..." className="bg-transparent text-xs text-gray-600 outline-none w-20" />
            </div>
            <button className="text-xs bg-[#2563EB] text-white px-3 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors">
              + Add User
            </button>
          </div>
        </div>

        <div className="p-5">
          {tab === "users" && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-gray-400 font-bold border-b border-gray-100">
                    {["Name / ID", "Role", "Department", "Status", "Joined", "Actions"].map(h => (
                      <th key={h} className="text-left pb-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {userTable.map(({ name, id, role, dept, status, joined }) => (
                    <tr key={id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2563EB] to-[#60A5FA] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                          </div>
                          <div>
                            <p className="font-bold text-[#1F2937] text-sm">{name}</p>
                            <p className="text-[10px] text-gray-400">{id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5">
                        <span className={cn("text-xs font-bold px-2.5 py-1 rounded-lg",
                          role === "Teacher" ? "bg-purple-50 text-purple-700" : "bg-blue-50 text-[#2563EB]")}>
                          {role}
                        </span>
                      </td>
                      <td className="py-3.5 text-sm text-gray-600">{dept}</td>
                      <td className="py-3.5">
                        <span className={cn("text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5 w-fit",
                          status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600")}>
                          <span className={cn("w-1.5 h-1.5 rounded-full", status === "Active" ? "bg-emerald-500" : "bg-red-500")} />
                          {status}
                        </span>
                      </td>
                      <td className="py-3.5 text-xs text-gray-400">{joined}</td>
                      <td className="py-3.5">
                        <div className="flex gap-1">
                          <button className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors"><Pencil size={13} className="text-[#2563EB]" /></button>
                          <button className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={13} className="text-red-400" /></button>
                          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"><MoreHorizontal size={13} className="text-gray-400" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === "courses" && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-gray-400 font-bold border-b border-gray-100">
                    {["Course", "Department", "Instructor", "Enrolled", "Status", "Actions"].map(h => (
                      <th key={h} className="text-left pb-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { code: "CS401", name: "Machine Learning", dept: "Computer Science", inst: "Dr. M. Chen", enrolled: 48, cap: 60, status: "Active" },
                    { code: "MATH301", name: "Advanced Calculus", dept: "Mathematics", inst: "Dr. A. Rivera", enrolled: 72, cap: 80, status: "Active" },
                    { code: "PHY201", name: "Quantum Mechanics", dept: "Physics", inst: "Dr. L. Kim", enrolled: 35, cap: 50, status: "Active" },
                    { code: "ENG101", name: "Technical Writing", dept: "English", inst: "Prof. R. Scott", enrolled: 100, cap: 100, status: "Full" },
                    { code: "BUS401", name: "Strategic Management", dept: "Business", inst: "Dr. P. Nguyen", enrolled: 55, cap: 70, status: "Active" },
                  ].map(({ code, name, dept, inst, enrolled, cap, status }) => (
                    <tr key={code} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-3.5">
                        <p className="font-bold text-[#1F2937]">{code}</p>
                        <p className="text-xs text-gray-400">{name}</p>
                      </td>
                      <td className="py-3.5 text-sm text-gray-600">{dept}</td>
                      <td className="py-3.5 text-sm text-gray-700">{inst}</td>
                      <td className="py-3.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-[#1F2937]">{enrolled}/{cap}</span>
                          <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className={cn("h-full rounded-full", enrolled === cap ? "bg-amber-400" : "bg-[#2563EB]")} style={{ width: `${(enrolled / cap) * 100}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5">
                        <span className={cn("text-xs font-bold px-2.5 py-1 rounded-lg",
                          status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700")}>
                          {status}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <div className="flex gap-1">
                          <button className="p-1.5 hover:bg-blue-50 rounded-lg"><Pencil size={13} className="text-[#2563EB]" /></button>
                          <button className="p-1.5 hover:bg-red-50 rounded-lg"><Trash2 size={13} className="text-red-400" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === "activity" && (
            <div className="space-y-2">
              {[
                { icon: Users, color: "bg-blue-100 text-[#2563EB]", event: "New user registration", detail: "Aisha Patel (STU-0671) joined — Computer Science", time: "2 min ago" },
                { icon: BookOpen, color: "bg-emerald-100 text-emerald-700", event: "Course enrollments", detail: "42 new enrollments in CS401 — Machine Learning", time: "18 min ago" },
                { icon: AlertTriangle, color: "bg-amber-100 text-amber-700", event: "Storage alert", detail: "Storage usage reached 78% of total capacity", time: "1 hour ago" },
                { icon: Shield, color: "bg-purple-100 text-purple-700", event: "Access control updated", detail: "Admin permissions updated for 3 faculty members", time: "2 hours ago" },
                { icon: Brain, color: "bg-indigo-100 text-indigo-700", event: "AI usage spike", detail: "AI Chat: 2,340 queries processed in the last hour", time: "3 hours ago" },
                { icon: Activity, color: "bg-rose-100 text-rose-600", event: "Maintenance completed", detail: "Scheduled server maintenance done — 99.98% uptime", time: "6 hours ago" },
                { icon: Globe, color: "bg-cyan-100 text-cyan-700", event: "System backup", detail: "Automated daily backup completed successfully", time: "8 hours ago" },
              ].map(({ icon: Icon, color, event, detail, time }) => (
                <div key={event + time} className="flex items-start gap-3 p-3.5 rounded-xl hover:bg-gray-50 transition-colors cursor-default">
                  <div className={`w-9 h-9 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#1F2937]">{event}</p>
                    <p className="text-xs text-gray-400 truncate">{detail}</p>
                  </div>
                  <p className="text-[10px] text-gray-300 flex-shrink-0 font-medium">{time}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}