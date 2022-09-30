const Dashboard = () => import("../pages/admin/Dashboard.vue");
const Jobseeker = () => import("../pages/admin/Jobseeker.vue");
const Industry = () => import("../pages/admin/Industry.vue");
const Recruiter = () => import("../pages/admin/Recruiter.vue");
const Jobs = () => import("../pages/admin/Jobs.vue");
const Settings = () => import("../pages/admin/Settings.vue");

export default [
  { path: "dashboard", component: Dashboard },
  { path: "jobseeker", component: Jobseeker },
  { path: "industry", component: Industry },
  { path: "recruiter", component: Recruiter },
  { path: "jobs", component: Jobs },
  { path: "settings", component: Settings }
];
