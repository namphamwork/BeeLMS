import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Toolbar,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { emailValidator, passwordValidator } from "../../../helper/validators";
// import Slide from '@mui/material/Slide';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "600px",
  width: "80%",
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  overflow: "hidden",
};
interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}

export interface FormData {
  username: string;
  email: string;
  password: string;
  role: string;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const handleSubmitForm = (data: FormData) => {
    onSubmit(data);
    onClose();
  };
  useEffect(() => {
    if (open) {
      reset({ role: "learner" }); 
    }
  }, [open, reset]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Toolbar
          sx={{
            alignItems: "center",
            justifyContent: "center",
            background: "#387ADF",
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            fontFamily="'Roboto', sans-serif"
            color="#333"
           
          >
            Thông tin người dùng
          </Typography>
        </Toolbar>
        <form
          className="p-4"
          onSubmit={handleSubmit(handleSubmitForm)}
          style={{ width: "100%", margin: "auto" }}
        >
          <TextField
            {...register("username", { required: "Tên đăng nhập là bắt buộc" })}
            label="Tên đăng nhập"
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            {...register("email", emailValidator)}
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            {...register("password", passwordValidator)}
            label="Mật khẩu"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel
              id="role-select-label"
              sx={{ fontFamily: "'Roboto', sans-serif" }}
            >
              Vai trò
            </InputLabel>
            <Select
              {...register("role", { required: "Vai trò là bắt buộc" })}
              labelId="role-select-label"
              label="Vai trò"
              error={!!errors.role}
              sx={{ fontFamily: "'Roboto', sans-serif" }}
              defaultValue={"learner"}
            >
              <MenuItem value="admin">Quản trị viên</MenuItem>
              <MenuItem value="subadmin">Nhân viên quản trị</MenuItem>
              <MenuItem value="instructor">Giảng viên</MenuItem>
              <MenuItem value="learner" >Học viên</MenuItem>
            </Select>
            {errors.role && (
              <span className="text-red-500 text-sm">
                {errors.role.message}
              </span>
            )}
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, fontFamily: "'Roboto', sans-serif" }}
          >
            Thêm
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddUserModal;
