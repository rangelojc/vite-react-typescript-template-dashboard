export interface User {
  id: number;
  uuid: string;
  name: string;
  email: string;
  password_hash: string;
  promotion_code: string | null;
  my_promotion_code: string | null;
  is_active: 0 | 1;
  is_blocked: 0 | 1;
  role: UserRole;
  created_at: string;
  last_login_at: string | null;
  login_fail_count: number;
  terms_accepted: 0 | 1;
  recaptcha_score: number | null;
}

export type UserRole = "user" | "admin" | string;

export interface UserUpdateRequest {
  email: string;
  role: string;
  my_promotion_code: string;
  promotion_code: string;
}
