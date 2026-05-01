import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const apiUrl=process.env.NEXT_PUBLIC_API_URL;
  // 1. 쿠키에서 토큰 꺼내기
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const { pathname } = request.nextUrl;

  // 2. 검문 제외 대상 (로그인, 회원가입, 정적 파일 등)
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/join") ||
    pathname.startsWith("/_next")
  ) {
    return NextResponse.next();
  }

  // 3. 액세스 토큰이 없는 경우
  if (!accessToken) {
    // 3-1. 리프레시 토큰은 있다면 갱신 시도
    if (refreshToken) {
      try {
        // 백엔드에 갱신 요청 (Spring Boot 주소)
        const refreshResponse = await fetch(
          `${apiUrl}/api/auth/refresh`,
          {
            method: "POST",
            headers: {
              Cookie: `refreshToken=${refreshToken}`, // 쿠키 전달
            },
          },
        );

        if (refreshResponse.ok) {
          const response = NextResponse.next();
          // 백엔드에서 준 새로운 쿠키들을 클라이언트에 전달 (Set-Cookie 전달)
          const setCookies = refreshResponse.headers.getSetCookie(); // 여러 개의 Set-Cookie를 배열로 가져옴
          if (setCookies.length > 0) {
            setCookies.forEach((cookie) => {
              response.headers.append("set-cookie", cookie);
            });
          }
         
          return response;
        }
      } catch (error) {
        console.error("토큰 갱신 실패:", error);
      }
    }

    // 4. 리프레시도 실패하거나 없다면 로그인 페이지로 리다이렉트
    const loginUrl = new URL("/login", request.url);
    // 원래 가려던 주소를 기억하게 함 (로그인 후 다시 돌아오기 위함)
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// 미들웨어가 실행될 경로 설정
export const config = {
  matcher: [
    /*
     * 아래 경로를 제외한 모든 경로에서 미들웨어 실행:
     * - api (API 라우트)
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
