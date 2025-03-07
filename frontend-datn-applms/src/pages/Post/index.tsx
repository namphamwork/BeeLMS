import {
    Button,
    Grid,
    List,
    ListItem,
    Stack,
    Typography
} from "@mui/material";
import { Post, posts } from "./data";

interface Category {
  id: string;
  title: string;
}

const PostPage: React.FC = () => {
  const categories: Category[] = [
    { id: "1", title: "Thông tin học tập" },
    { id: "2", title: "Thông tin hoạt động" },
    { id: "3", title: "Thông tin học phí" },
    { id: "4", title: "Thông tin việc làm" },
  ];

  const renderPosts = (_: string, posts: Post[]) => {
    return posts.slice(0, 10).map((post: Post, index: number) => (
      <ListItem key={index}>
        <Typography sx={{ textWrap: "wrap" }}>{post.title}</Typography>
      </ListItem>
    ));
  };

  const renderData = (category: Category, index: number) => {
    return (
      <Grid
        key={index}
        item
        xs={12 / 3}
        sx={{ border: "0.5px solid", borderRadius: 3 }}
      >
        <Typography variant="h5" className="text-center font-bold uppercase">
          {category.title}
        </Typography>
        <List>
          {renderPosts(
            category.title,
            posts.filter((post) => post.category === category.title)
          )}
        </List>
        <Stack
          direction={"row"}
          sx={{ justifyContent: "flex-end", marginRight: 2, marginBottom: 2 }}
        >
          <Button className="w-fit" variant="contained" color="primary">
            Xem thêm
          </Button>
        </Stack>
      </Grid>
    );
  };

  return (
    <Grid container spacing={2} gap={2} className="px-4 py-4 w-full">
      {categories.map((category: Category, index: number) =>
        renderData(category, index)
      )}
    </Grid>
  );
};

export default PostPage;
