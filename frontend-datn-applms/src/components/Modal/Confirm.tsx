import { ReactNode, useEffect, useState } from "react";

interface ConfirmModalProps {
  title: string;
  description: string;
  onSuccess: () => void;
  onCancel: () => void;
  onBackdrop?: () => void;
  isShow: boolean;
  icon?: ReactNode;
  colorButton?: string;
}
export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  description,
  onSuccess,
  onCancel,
  onBackdrop,
  isShow,
  icon,
  colorButton,
}) => {
  const [showModal, setShowModal] = useState(isShow);

  useEffect(() => {
    setShowModal(isShow);
  }, [isShow]);

  const handleDeleteClick = () => {
    onSuccess();
    setShowModal(false);
  };

  const handleCancel = () => {
    onCancel();

    setShowModal(false);
  };

  const handleBackdrop = () => {
    if (onBackdrop) {
      onBackdrop();
    }

    setShowModal(false);
  };

  return (
    <div
      className={`min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover ${
        showModal ? "" : "hidden"
      }`}
      id="modal-id"
      onClick={handleBackdrop}
    >
      <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
      <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white">
        <div className="">
          <div className="text-center p-5 flex-auto justify-center">
            {icon}

            <h2 className="text-xl font-bold py-4 ">{title}</h2>
            <p className="text-sm text-gray-500 px-8">{description}</p>
          </div>
          <div className="p-3 mt-2 text-center space-x-4 md:block">
            <button
              className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
              onClick={handleCancel}
            >
              Hủy
            </button>
            <button
              onClick={handleDeleteClick}
              className={`mb-2 md:mb-0 ${
                colorButton
                  ? colorButton
                  : "bg-blue-500 border-blue-500 hover:bg-blue-600"
              }  border px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg`}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
