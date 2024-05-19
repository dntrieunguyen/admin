const HTTP_CODES = {
   // Code success 2xx - START
   OK: 200,
   CREATED: 201,
   // Code success 2xx - END

   // Code Error 4xx - START
   BAD_REQUEST: 400,
   UNAUTHORIZED: 401,
   FORBIDDEN: 403,
   NOT_FOUND: 404,
   // Code Error 4xx - END

   // Code server Error 5xx - START
   INTERNAL_SERVER_ERROR: 500,
   SERVICE_UNAVAILABLE: 503,
   // Code server Error 5xx - END
};

const HTTP_MESSAGES = {
   // message success
   [HTTP_CODES.OK]: 'Thành công: Xử lý yêu cầu thành công.',
   [HTTP_CODES.CREATED]: 'Thành công: Yêu cầu đã được tạo thành công.',

   // message Error 4xx
   [HTTP_CODES.BAD_REQUEST]: 'Lỗi: Yêu cầu không hợp lệ.',
   [HTTP_CODES.UNAUTHORIZED]: 'Lỗi: Không được phép truy cập.',
   [HTTP_CODES.FORBIDDEN]: 'Lỗi: Không có quyền thực hiện yêu cầu này.',
   [HTTP_CODES.NOT_FOUND]: 'Lỗi: Không tìm thấy tài nguyên.',

   // message server Error 5xx
   [HTTP_CODES.INTERNAL_SERVER_ERROR]:
      'Lỗi: Đã xảy ra lỗi nội bộ trên máy chủ.',
   [HTTP_CODES.SERVICE_UNAVAILABLE]: 'Lỗi: Dịch vụ hiện không khả dụng.',
};

const MESSAGE = {
   // success
   LOGIN: 'Đăng nhập thành công.',
   LOGOUT: 'Đăng xuất thành công.',
   REGISTER: 'Đăng ký thành công.',
   UNAUTHORIZED: 'Tính năng yêu cầu phải đăng nhập.',
   DO_NOT_HAVE_PERMISSION: 'Không được cấp quyền sử dụng tính năng này',
   UPLOAD_AVATAR_SUCCESSFULLY: 'Tải file thành công.',
   CHANGE_AVATAR_SUCCESSFULLY: 'Thay hình ảnh thành công.',

   // failure
   CAN_NOT_UPLOAD_AVATAR: 'Lỗi! Không thể upload hình ảnh. ',
};

export { HTTP_MESSAGES, HTTP_CODES, MESSAGE };
