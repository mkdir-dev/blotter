export interface JwtPayload {
  sub: string;
  username: string;
  email: string;
}

export interface JwtPayloadWithRT extends JwtPayload {
  refreshToken?: string;
}
