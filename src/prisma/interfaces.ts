import { User } from '@prisma/client';

export type SelectType = Record<keyof User, boolean>;

export const RegularUserSelectField: Omit<SelectType, 'password'> = {
  avatar: true,
  create_at: true,
  id: true,
  email: true,
  last_login: true,
  is_superuser: true,
  first_name: true,
  last_name: true,
  is_staff: true,
  is_active: true,
  date_joined: true,
  description: true,
  update_at: true,
  username: true,
  mobile: true,
  display_name: true,
  gender: true,
  user_type: true,
  login_error_count: true,
};
