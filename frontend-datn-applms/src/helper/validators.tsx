import { RegisterOptions } from 'react-hook-form';

export const emailValidator = {
  require:false,
  // required: { value: true, message: 'Email là bắt buộc' },
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Email không hợp lệ',
  },
  
};

export const phoneValidator = {
  // required: { value: true, message: 'Số điện thoại là bắt buộc' },
  require:false,
  pattern: {
    value: /^\d{10,11}$/,
    message: 'Số điện thoại không hợp lệ',
  },
};


export const usernameValidator: RegisterOptions = {
  required: "Tài khoản đăng nhập không được bỏ trống",
};
export const passwordValidator: RegisterOptions = {
  required: 'Mật khẩu không được bỏ trống',
  // minLength: {
  //   value: 8,
  //   message: 'Mật khẩu cần ít nhất 8 ký tự',
  // },
};

type ConfirmPasswordValidatorProps = {
  getValues: (field: string) => any;
};

export const confirmPasswordValidator = {
  required: 'Xác nhận mật khẩu không được bỏ trống',
  validate: ({
    getValues,
  }: ConfirmPasswordValidatorProps): string | boolean => {
    const password = getValues('password');
    return (
      typeof password === 'string' &&
      password !== '' &&
      password === getValues('confirmPassword') ||
      'Mật khẩu không khớp'
    );
  },
};

export const formatDateTime = (dateTimeString: string) => {
  const dateTime = new Date(dateTimeString);
  return dateTime.toLocaleString();
};

export const formatTime = (dateString: string) => {
  const currentDate = new Date();
  const targetDate = new Date(dateString);

  if (currentDate.toDateString() === targetDate.toDateString()) {
    const hours = targetDate.getHours().toString().padStart(2, '0');
    const minutes = targetDate.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  } else {
    const hours = targetDate.getHours().toString().padStart(2, '0');
    const minutes = targetDate.getMinutes().toString().padStart(2, '0');
    const day = targetDate.getDate().toString().padStart(2, '0');
    const month = (targetDate.getMonth() + 1).toString().padStart(2, '0');
    return `${hours}:${minutes} ngày ${day}/${month}`;
  }
}