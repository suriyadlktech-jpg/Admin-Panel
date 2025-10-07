

// API Endpoints
export const API_ENDPOINTS = {
  USER_DETAIL: "/admin/getall/users",
  GET_INDIVIDUAL_USER_DETAIL:"/admin/get/user/profile/detail",
  GET_USER_ANALYTICAL_DATA:"/admin/get/user/analytical/data",
  GET_USER_TREE_LEVEL:"/admin/user/tree/level",
  BLOCK_USER:"/admin/block/user",
  USER_PROFILE_METRICKS:"admin/user/profile/metricks",
  GET_USER_REPORTS:"/admin/user/report",
  UPDATE_REPORT_ACTION:"/admin/report/action/update",



  USER_ANALYTICS_SUMMARY: "/summary",
  USER_ANALYTICS_FEEDS: "/feeds",
  USER_ANALYTICS_FOLLOWING: "/following",
  USER_ANALYTICS_INTERESTED: "/interested",
  USER_ANALYTICS_HIDDEN: "/hidden",
  USER_ANALYTICS_LIKED: "/liked",
  USER_ANALYTICS_DISLIKED: "/disliked",
  USER_ANALYTICS_COMMENTED: "/commented",
  USER_ANALYTICS_SHARED: "/shared",
  USER_ANALYTICS_DOWNLOADED: "/downloaded",
  USER_ANALYTICS_NON_INTERESTED:"/nonInterested",



  DASHBOARD_METRICKS:"/admin/dashboard/metricks/counts",
  DASHBOARD_USER_REGITRATION_CHART:"/admin/users/monthly-registrations",
  DASHBOARD_SUBSCRIPTION_RATIO_CHART:"/admin/user/subscriptionration",


  ADMIN_UPLOAD_FEED:"/admin/feed-upload",

  CHILD_ADMIN_REGISTER:"/auth/admin/register",
  GET_CHILD_ADMIN_LIST:"/admin/childadmin/list",
  GET_CHILD_ADMIN_PERMISSONS:"/admin/childadmin/permissions",
  UPDATE_CHILD_ADMIN_PERMISSIONS:"/admin/childadmin/permissions",


  ADMIN_GET_ALL_CREATOR:"/admin/getall/creators",


  ADMIN_GET_CATEGORY:"/admin/get/feed/category",
  ADMIN_UPLOAD_CATEGORY:"/admin/add/feed/category",
  ADMIN_GET_ALL_FEED:"/admin/get/all/feed",
  ADMIN_DELETE_CATEGORY:"/admin/feed/category",
  ADMIN_UPDATE_CATEGORY:"/admin/update/category",


  ADMIN_LOGIN:"/auth/admin/login",
  ADMIN_SENT_OTP:"/auth/admin/sent-otp",
  ADMIN_VERFY_EXISTING_OTP:"/auth/exist/admin/verify-otp",
  ADMIN_RESET_PASSWORD:"/auth/admin/reset-password",
  ADMIN_VERFY_TOKEN :"/api/admin/verify-token",



  ADMIN_GET_ALL_SUBSCRIPTION:'/admin/getall/subscriptions',
  ADMIN_DELETE_SUBSCRIPTION_PLAN:'/admin/delete/subscription',
  ADMIN_UPDATE_SUBSCRIPTION_PLAN:'/admin/update/subscription',
  ADMIN_CREATE_SUBSCRIPTION_PLAN:'/admin/create/subscription',




  // Add more endpoints here as needed
};
