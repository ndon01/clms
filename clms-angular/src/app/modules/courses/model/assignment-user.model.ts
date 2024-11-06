export type UserDetails = {
  id: number;
  firstName: string | null;
  lastName: string | null;
  username: string;
  roles: any[];
  permissions: any[];
}
export type UserDetailsProjection = Partial<UserDetails>;
