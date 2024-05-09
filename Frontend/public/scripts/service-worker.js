// self.addEventListener('fetch', event => {
//     const url = new URL(event.request.url);
    
//     // Chỉ kiểm tra các yêu cầu đi đến API hoặc nơi cần bảo mật
//     if (url.pathname.startsWith('/')) {
//       // Giả sử token được lưu trong header Authorization
//       const authHeader = event.request.headers.get('Authorization');
//       if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         // Nếu không có token hoặc token không hợp lệ, trả về response lỗi
//         event.respondWith(new Response('Unauthorized', { status: 401 }));
//         return;
//       }
//     }
  
//     // Cho phép yêu cầu tiếp tục nếu không phải là API hoặc đã có token hợp lệ
//     event.respondWith(fetch(event.request));
//   });
self.addEventListener('install', event => {
    // Kích hoạt Service Worker ngay lập tức
    event.waitUntil(self.skipWaiting());
  });
  
  self.addEventListener('activate', event => {
    // Claim any clients immediately
    event.waitUntil(self.clients.claim());
  });
  
  self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    
    // Kiểm tra chỉ các yêu cầu đến server của bạn, ví dụ 'http://localhost:8000/'
    if (url.origin === 'http://localhost:8000' && url.pathname.startsWith('/')) {
      const cookies = event.request.headers.get('Cookie') || '';
      const connectSidCookie = cookies.split(';').find(cookie => cookie.trim().startsWith('connect.sid='));
  
      if (!connectSidCookie) {
        // Nếu không tìm thấy `connect.sid`, trả về phản hồi "Unauthorized"
        event.respondWith(new Response('Unauthorized', { status: 401 }));
        return;
      }
    }
  
    event.respondWith(fetch(event.request));
  });
  
  