import { User } from '@prisma/client';

export type SelectType<T> = {
  [k in keyof T]: boolean;
};

export const RegularUserSelectField: SelectType<Omit<User, 'password'>> = {
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
  modifier_id: true,
  username: true,
  mobile: true,
  display_name: true,
  gender: true,
  user_type: true,
  login_error_count: true,
};
