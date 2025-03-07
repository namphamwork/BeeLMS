import { Theme, createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

const theme: Theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    mode: "light",
    // primary: {
    //   main: "#000000",
    // },
    secondary: {
      main: "#FFEEE2",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
      paper: "#fff",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial"',

    fontSize: 14,

    htmlFontSize: 16,

    h1: {},
    h2: {},
    h3: {},
    h4: {},
    h5: {},
    h6: {},
    subtitle1: {},
    subtitle2: {},
    body1: {},
    body2: {},
    caption: {},
    button: {},
    overline: {},
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: 8,
          textTransform: "none", 
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", 
            transform: "translateY(-1px)",
          },
        },
        contained: {
          backgroundImage: "linear-gradient(to right, #7EB8EB, #7ED0E5)", 
          color: "#FFFFFF", // Màu chữ
          "&:hover": {
            backgroundImage: "linear-gradient(to right, #7ED0E5, #7EB8EB)", 
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
          },
        },
        outlined: {
          borderColor: "#7EB8EB", 
          color: "#7EB8EB", 
          "&:hover": {
            borderColor: "#7ED0E5",
            color: "#7ED0E5", 
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", 
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          "& .MuiTab-root": {
            backgroundColor: "transparent",
            transition: "all 0.3s ease",
            borderRadius: "10px 10px 0 0",
            "&:hover": {
              backgroundColor: "rgba(230, 230, 230, 0.3)", 
            },
            "&.Mui-selected": {
              fontWeight:700,
              // backgroundImage: "linear-gradient(to right, #cccc, #dddd)", // 
              color: "#333",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", //
              borderRadius: "10px 10px 0 0",
              border:'0.5px solid #dddd'
                      
            },
          },
        },
        indicator: {
          height: 4, // Tăng độ dày của indicator
          backgroundColor: "#66A5AD", // Màu sắc của indicator
        },
      },
    },
     MuiDialog: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)', // Màu nền của dialog
          backdropFilter: 'blur(5px)', // Hiệu ứng làm mờ nền
        },
        paper: {
          backgroundColor: '#fff', // Màu nền của phần nội dung dialog
          borderRadius: '8px', // Bo góc của phần nội dung dialog
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', // Đổ bóng
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: '1.25rem', // Kích thước font của tiêu đề
          fontWeight: 600, // Độ đậm của tiêu đề
          color: '#333', // Màu của tiêu đề
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          fontSize: '1rem', // Kích thước font của nội dung
          color: '#555', // Màu của nội dung
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '16px', // Khoảng cách giữa nội dung và nút
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          // Tùy chỉnh kiểu dáng cho Avatar
          borderRadius: "50%", // Hình tròn
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Đổ bóng
          transition: "all 0.3s ease", // Hiệu ứng chuyển động
          "&:hover": {
            // Tùy chỉnh khi hover
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            transform: "scale(1.05)", // Phóng to nhỏ khi hover
          },
        },
        img: {
          // Tùy chỉnh hình ảnh trong Avatar
          objectFit: "cover", // Hiển thị toàn bộ hình ảnh
        },
        colorDefault: {
          // Tùy chỉnh màu nền mặc định
          backgroundColor: "#8CB9BD",
          color: "#333",
        },
      },
    },
  },
  shadows: [
    "none",

    "0px 1px 3px rgba(0,0,0,0.08)",
    "0px 1px 3px rgba(0,0,0,0.12)",
    "0px 1px 3px rgba(0,0,0,0.16)",

    "0px 1px 4px rgba(0,0,0,0.08)",
    "0px 1px 4px rgba(0,0,0,0.12)",
    "0px 1px 4px rgba(0,0,0,0.16)",

    "0px 1px 5px rgba(0,0,0,0.08)",
    "0px 1px 5px rgba(0,0,0,0.12)",
    "0px 1px 5px rgba(0,0,0,0.16)",

    "0px 2px 4px rgba(0,0,0,0.08)",
    "0px 2px 4px rgba(0,0,0,0.12)",
    "0px 2px 4px rgba(0,0,0,0.16)",

    "0px 2px 5px rgba(0,0,0,0.08)",
    "0px 2px 5px rgba(0,0,0,0.12)",
    "0px 2px 5px rgba(0,0,0,0.16)",

    "0px 3px 4px rgba(0,0,0,0.08)",
    "0px 3px 4px rgba(0,0,0,0.12)",
    "0px 3px 4px rgba(0,0,0,0.16)",

    "0px 4px 6px rgba(0,0,0,0.08)",
    "0px 4px 6px rgba(0,0,0,0.12)",
    "0px 4px 6px rgba(0,0,0,0.16)",

    "0px 6px 8px rgba(0,0,0,0.08)",
    "0px 6px 8px rgba(0,0,0,0.12)",
    "0px 6px 8px rgba(0,0,0,0.16)",
  ],
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      // most basic recommended timing
      standard: 300,
      // this is to be used in complex animations
      complex: 375,
      // recommended when something is entering screen
      enteringScreen: 225,
      // recommended when something is leaving screen
      leavingScreen: 195,
    },
    easing: {
      // This is the most common easing curve.
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      // Objects enter the screen at full velocity from off-screen and
      // slowly decelerate to a resting point.
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      // Objects leave the screen at full velocity. They do not decelerate when off-screen.
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      // The sharp curve is used by objects that may return to the screen at any time.
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    },
  },
  // spacing: [0, 4, 8, 16, 32, 64],

  // Thêm border radius
  shape: {
    borderRadius: 8,
  },
});

export default theme;
