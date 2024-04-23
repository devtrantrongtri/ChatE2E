import { Injectable } from "@nestjs/common"
import { PassportSerializer } from "@nestjs/passport"

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    done(null, user)
  }
  deserializeUser(
    payload: any,
    done: (err: Error, payload: string) => void
  ): any {
    done(null, payload)
  }
}

/*
serializeUser(user: any, done: (err: Error, user: any) => void): any {
    // Lưu trữ thông tin người dùng vào phiên
    const serializedUser = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role // Ví dụ: admin, user
    };
    done(null, serializedUser);
}

deserializeUser(payload: any, done: (err: Error, payload: string) => void): any {
    // Trích xuất thông tin người dùng từ phiên
    const user = {
        id: payload.id,
        username: payload.username,
        email: payload.email,
        role: payload.role
    };
    done(null, user);
}



*/