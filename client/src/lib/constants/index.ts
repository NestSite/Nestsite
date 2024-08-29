export const GLOBAL = {
     APP_NAME: "WaveServe",
     APP_TITLE: "WaveServe Admin Dashboard",
     APP_LOGIN_TITLE: "Login to WaveServe",
     LOGIN_TEXT: "Login to your account",
     AUTH_SUBTEXT: "Our Mission today and tomorrow is to support Seekers in getting more of their TO-DO-LIST completed by nearby lovely Taskers who need income to keep grinding in the face of tough economies. ",
     AUTH_GREETING: "Have a great day doing this with us!     ",
     RECOVER_PASSWORD_TEXT: "Recover your Password",
     APP_DESC: "Your WaveServe Admin Dashboard",
     API_V1_URL: "https://waveserveapp.onrender.com/api/v1"
}

export const ROUTE = {
     HOME: "/",
     DASHBOARD: "/",
     PROFILE: "/profile",
     BOOKINGS: "/bookings",
     TASKERS: "/taskers/",
     SEEKERS: "/seekers",
     COMMUNITIES: "/communities",
     ANALYTICS: "/analytics",
     WITHDRAWALS: "/withdrawals",
     REVIEWS: "/reviews",

     //UPDATES
     UPDATES: "/updates",
     PUBLISH_NEW_POST: "/updates/new-post",

     // LIST BUILDERS
     LIST_BUILDERS: {
          INDEX: "/list-builders",
          TASKER_TITLE: "/list-builders/tasker-title",
          FAMILY: "/list-builders/family",
          VEHICLES: "/list-builders/vehicles",
          COUNTRIES: "/list-builders/countries",
     },
     // PAGE BUILDERS
     PAGES: "/pages",
     ABOUT_US: "/pages/about-us",
     FAQ: "/pages/faq",
     TERMS_OF_USE: "/pages/terms-of-use",
     PRIVACY_POLICY: "/pages/privacy-policy",

     AUTH: {
          LOGIN: "/",
          RECOVER_PASSWORD: "/recover-password/",
     },
     PROFILE_MANAGER: "/profile-manager/",
     SUBSCRIPTION_MANAGER: "/subscriptions",

     VERIFICATION_REQUEST: "/verification-request",
}

export const STATUS = {
     ACTIVE: { TEXT: "ACTIVE", COLOR: "cyan" },
     COMPLETED: { TEXT: "COMPLETED", COLOR: "green" },
     PAID: { TEXT: "PAID", COLOR: "green" },
     PUBLISHED: { TEXT: "PUBLISHED", COLOR: "green" },
     DRAFT: { TEXT: "DRAFT", COLOR: "green" },
     NEW: { TEXT: "NEW", COLOR: "green" },
     VERIFIED: { TEXT: "VERIFIED", COLOR: "rose" },
     UNVERIFIED: { TEXT: "UNVERIFIED", COLOR: "rose" },
     PENDING: { TEXT: "PENDING", COLOR: "amber" },
     RESTRICTED: { TEXT: "RESTRICTED", COLOR: "amber" },
     DOWNGRADE: { TEXT: "DOWNGRADE", COLOR: "rose" },
     UPGRADE: { TEXT: "UPGRADE", COLOR: "green" },
     CANCEL: { TEXT: "CANCEL", COLOR: "red" },
     CANCELLED: { TEXT: "CANCELLED", COLOR: "red" },
     REJECTED: { TEXT: "REJECTED", COLOR: "red" },
     BANNED: { TEXT: "BANNED", COLOR: "red" },
     RENEW: { TEXT: "RENEW", COLOR: "green" }
} as const;

export type StatusType = keyof typeof STATUS;

