export interface User {
  _id:string;
  user_name?: string | null;      // User name, default is null
  email: string;                  // Email is required
  document?: string | null;       // Document, default is null
  password: string;               // Password is required
  is_dermatologist?: boolean;     // Boolean flag for dermatologist, default is false
  role?: string;                  // Role field
}
