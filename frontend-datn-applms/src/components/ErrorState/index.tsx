import React from 'react';

export const ErrorState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <img
        src="/images/errorState.gif"
        alt="Empty State"
        width={500}
        height={500}
      />
      <h2 className="text-2xl font-bold mb-2">Tải dữ liệu thất bại!</h2>
      <p className="text-gray-600">
        Kiểm tra lại đường truyền của bạn hoặc hệ thống đang gặp vấn đề. Vui lòng thử lại sau!
      </p>
    </div>
  );
};