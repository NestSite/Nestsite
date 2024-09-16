export const GLOBAL = {
     APP_NAME: "Nestsite",
     APP_TITLE: "Nestsite Dashboard",
     APP_LOGIN_TITLE: "Login",
     LOGIN_TEXT: "Welcome, enter your details to login to your nestsite account.",
     APP_SIGN_UP_TITLE: "Get started",
     SIGN_UP_TEXT: "Welcome to Nestsite! Let's get started by creating your account.",
     AUTH_SUBTEXT: "Create, share and build your stellar world",
     AUTH_GREETING: "Have a great day doing this with us!     ",
     RECOVER_PASSWORD_TEXT: "Recover your Password",
     APP_DESC: "Your Nestsite Dashboard",
     API_V1_URL: "https://nestsite.onrender.com/api/v1"
}

export const ROUTE = {
     HOME: "/",
     DASHBOARD: "/",
     PROFILE: "/profile",
     SECURITY:"/security",
     ANALYTICS: "/analytics",
     PAYOUT:"#",
     WITHDRAWALS: "/withdrawals",
     REVIEWS: "/reviews",
     HASHED:'#',
     PORTFOLIO: {
          INDEX: "/portfolio",
          CUSTOMIZE: "/customize-portfolio",
          PROJECTS:"/projects"
          
     },
     STOREFRONT: {
          INDEX: "/storefront",
          CUSTOMIZE: "/storefront-portfolio",
          PRODUCTS:"/products",
          CATEGORY:'/category'
          
     },
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
     TERMS_OF_USE: "/pages/terms-of-use",
     PRIVACY_POLICY: "/pages/privacy-policy",

     AUTH: {
          LOGIN: "/",
          RECOVER_PASSWORD: "/recover-password/",
     },
     
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

