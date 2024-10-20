export interface TokenPayload {
  sub: string;
  jti?: string;
  exp?: number;
  iat?: number;
}
