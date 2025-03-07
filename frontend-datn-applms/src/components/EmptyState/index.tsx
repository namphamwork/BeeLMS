import React from 'react';

export const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <img
        src="/images/emptyState.gif"
        alt="Empty State"
        width={500}
        height={500}
      />
      <h2 className="text-2xl font-bold mb-2">Chưa có dữ liệu</h2>
      <p className="text-gray-600">
        Hiện tại nội dung này chưa có dữ liệu. Vui lòng thử lại sau!
      </p>
    </div>
  );
};