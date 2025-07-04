const navigations = [
  {
    name: "Quick Links",
    icon: "apps",
    path: "/quickLinks"
  },

  {
    name: "Dashboard",
    path: "/dashboard/default",
    icon: "dashboard"
  },

  {
    name: "Human Resources",
    icon: "people", // Changed to more appropriate forms icon
    children: [

      ,
      {
        name: "HR Master",
        icon: "support_agent",
        children: [
          { name: "Master", path: "/human-resources/master", iconText: "HM" },
          { name: "Leave Type", path: "/leave-master/type", iconText: "LT" }
          // { name: "Leave Group", path: "/leave-master/leave-group", iconText: "LG" }
        ]
      },
      {
        name: "Staff Details",
        path: "/human_resources/staff-details",
        iconText: "SD"
      },
      {
        name: "Staff Attendance",
        path: "/human_resources/staff-attendance",
        iconText: "SA"
      },
      {
        name: "Staff Leave",
        path: "/human_resources/staff-leave",
        iconText: "SL"
      },
      {
        name: "Staff Leave Report",
        path: "/#",
        iconText: "LR"
      }
    ]
  },
  {
    name: "Front Office",
    icon: "person",
    children: [
      { name: "Admission Enquiry", path: "/front-office/admission-enquiry", iconText: "AE" },
      { name: "Visitor Book", path: "/front-office/visitor-book", iconText: "VB" }
    ]
  },
  {
    name: "Fees Collection",
    icon: "attach_money",
    children: [
      { name: "Collect Fees", path: "/fees/collect", iconText: "CF" },
      { name: "Fees Reports", path: "/fees/reports", iconText: "FR" }
    ]
  },
  {
    name: "Online Course",
    icon: "cast_for_education",
    children: [
      { name: "Course List", path: "/online-course/list", iconText: "CL" },
      { name: "Assignments", path: "/online-course/assignments", iconText: "AS" }
    ]
  },
  {
    name: "Multi Branch",
    icon: "account_tree",
    children: [{ name: "Manage Branches", path: "/multi-branch/manage", iconText: "MB" }]
  },
  {
    name: "Gmeet Live Classes",
    icon: "videocam",
    children: [
      { name: "Schedule Class", path: "/gmeet/schedule", iconText: "SC" },
      { name: "Join Class", path: "/gmeet/join", iconText: "JC" }
    ]
  },
  {
    name: "Zoom Live Classes",
    icon: "video_call",
    children: [
      { name: "Schedule Zoom", path: "/zoom/schedule", iconText: "SZ" },
      { name: "Join Zoom", path: "/zoom/join", iconText: "JZ" }
    ]
  },
  {
    name: "Behaviour Records",
    icon: "fact_check",
    children: [
      { name: "Add Record", path: "/behaviour/add", iconText: "AR" },
      { name: "Record List", path: "/behaviour/list", iconText: "RL" }
    ]
  },
  {
    name: "Forms",
    icon: "description", // Changed to more appropriate forms icon
    children: [
      {
        name: "App Form",
        path: "/material/form",
        iconText: "AF"
      },
      {
        name: "Simple Form",
        path: "/material/form/simple", // ✅ same path as route
        iconText: "SF"
      },
      {
        name: "Stepper Form",
        path: "/material/form/stepper", // You'll need to add this route
        iconText: "ST"
      }
    ]
  }
];

export default navigations;
