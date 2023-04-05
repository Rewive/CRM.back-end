import { Injectable } from '@nestjs/common';

interface AuthResponse {
  status: string;
}

@Injectable()
export class AppService {
  CheckAuth(): AuthResponse {
    return {status: "OK"};
  }
}
