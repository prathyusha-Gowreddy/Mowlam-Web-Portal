export const msalConfig = {
  auth: {
    clientId: "40887be8-0916-420f-9c7f-82cdcebaa058",  // ✅ Your Azure AD App’s Client ID
    authority: "https://login.microsoftonline.com/6f67b6e8-c2df-4762-8c6a-aefcb6a50973", // ✅ Your Tenant ID (can be 'common' for multi-tenant apps)
    redirectUri: "http://localhost:5173",              // ✅ Dynamic, must be registered in Azure Portal
  },
  cache: {
    cacheLocation: "localStorage",        // ✅ Persistent login across tabs
    storeAuthStateInCookie: false         // ✅ Usually false unless IE11 compatibility is needed
  }
};
