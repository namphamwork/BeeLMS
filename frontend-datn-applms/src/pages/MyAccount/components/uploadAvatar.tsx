import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
} from "@mui/material";
import { green } from "@mui/material/colors";
import { toast } from "react-toastify";
import { urlUpload } from "../../../constant/config";
import {
  useUpdateUserMutation,
  useUploadAvatarMutation,
} from "../../../service/userAPI";
import { UserInfoProps } from "../MyAccount";

export const UploadAvatar: React.FC<UserInfoProps> = ({ user }) => {
  // const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [postImage] = useUploadAvatarMutation();
  const [uploadAvatar] = useUpdateUserMutation();
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const avatarForm = new FormData();
      avatarForm.append("image", file);
      try {
        const result = await postImage(avatarForm).unwrap();

        console.log(result);
        if (result.statusCode !== 200) {
          toast.error("Tải ảnh lên thất bại");
        } else {
          const resultChangeAvatar = await uploadAvatar({
            id: user?._id,
            body: { ...user, avatar: result.data.filename },
          }).unwrap();
          if (resultChangeAvatar.statusCode !== 200) {
            toast.error("Cập nhật ảnh đại diện thất bại. Vui lòng thử lại!");
          } else {
            toast.success("Cập nhật ảnh đại diện thành công");
          }
        }
      } catch (error) {
        toast.error("Cập nhật ảnh đại diện thất bại. Vui lòng thử lại!");
        console.error("Lỗi khi upload ảnh:", error);
      }
    }
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <h1 className="text-sm text-center my-3">AVATAR</h1>
      </Box>
      <Divider />
      <CardContent className="text-center flex items-center justify-center">
        <Avatar
          alt="Remy Sharp"
          src={
            user?.avatar == "avatar.png"
              ? "/public/images/avatar.png"
              : urlUpload + "/images/" + user?.avatar
          }
          sx={{ bgcolor: green[500], width: 100, height: 100 }}
        />
      </CardContent>
      <p className="text-center text-gray-500">
        Thay đổi ảnh đại diện để trông bạn xinh đẹp hơn
      </p>

      <CardActions className="flex justify-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="upload-avatar"
        />
        <label htmlFor="upload-avatar">
          <Button variant="contained" component="span">
            Cập nhật
          </Button>
        </label>
      </CardActions>
    </Card>
  );
};
