// Auth feature exports
export { AuthService } from './services/auth.service';

// Re-export types from centralized types
export type { RegisterResponse, AuthError } from '@/src/types/auth';

// Re-export validation schemas from centralized validation
export { RegisterSchema, type RegisterInput } from '@/src/validation/auth';


