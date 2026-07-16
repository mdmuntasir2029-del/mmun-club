export const ADMIN_EMAIL = "auraboy161@gmail.com";

export function isAdminEmail(email: string | null | undefined) {
  return email === ADMIN_EMAIL;
}
