export interface Post {
  id: number;
  title: string;
  category: string;
}

export const posts = [
  // Thông tin học tập
  {
    id: 1,
    title:
      "🔥 Khai giảng khóa học lập trình Front-end cấp tốc cho người mới bắt đầu",
    category: "Thông tin học tập",
  },
  {
    id: 2,
    title: "📚 Ưu đãi 50% học phí cho khóa học Tiếng Anh giao tiếp",
    category: "Thông tin học tập",
  },
  {
    id: 3,
    title: "🎓 Chương trình học bổng toàn phần cho sinh viên xuất sắc",
    category: "Thông tin học tập",
  },
  {
    id: 4,
    title: '👨‍💻 Hội thảo "Làm thế nào để trở thành một lập trình viên giỏi"',
    category: "Thông tin học tập",
  },
  {
    id: 5,
    title: "💻 Buổi chia sẻ từ các chuyên gia về xu hướng công nghệ mới nhất",
    category: "Thông tin học tập",
  },
  {
    id: 6,
    title:
      '🌐 Khóa học online "Thiết kế Web Responsive với HTML, CSS và JavaScript"',
    category: "Thông tin học tập",
  },
  {
    id: 7,
    title: "🎥 Hướng dẫn sử dụng phần mềm đồ họa chuyên nghiệp",
    category: "Thông tin học tập",
  },
  {
    id: 8,
    title: "📝 Cơ hội tham gia viết bài cho tạp chí khoa học của trường",
    category: "Thông tin học tập",
  },
  {
    id: 9,
    title:
      "🔬 Hội thảo về các công trình nghiên cứu mới nhất trong lĩnh vực STEM",
    category: "Thông tin học tập",
  },
  {
    id: 10,
    title: "🌍 Chương trình học bổng trao đổi sinh viên quốc tế",
    category: "Thông tin học tập",
  },
  {
    id: 11,
    title: "📖 Triển lãm sách và tài liệu giáo dục với nhiều ưu đãi",
    category: "Thông tin học tập",
  },
  {
    id: 12,
    title: "🧠 Khóa học phát triển tư duy logic và giải quyết vấn đề",
    category: "Thông tin học tập",
  },
  {
    id: 13,
    title: "🎨 Lớp học vẽ tranh miễn phí cho sinh viên",
    category: "Thông tin học tập",
  },
  {
    id: 14,
    title: "🎵 Khóa học nhạc cụ dành cho người mới bắt đầu",
    category: "Thông tin học tập",
  },
  {
    id: 15,
    title: "🌱 Hội thảo về phát triển bền vững và bảo vệ môi trường",
    category: "Thông tin học tập",
  },

  // Thông tin hoạt động
  {
    id: 16,
    title:
      '🚀 Đăng ký tham gia Hackathon "Code for Change" - Lập trình vì cộng đồng',
    category: "Thông tin hoạt động",
  },
  {
    id: 17,
    title:
      "✍️ Các buổi Workshop miễn phí về Design Thinking và Product Management",
    category: "Thông tin hoạt động",
  },
  {
    id: 18,
    title:
      '🏆 Cuộc thi thiết kế đồ họa "Pixel Perfect" với giải thưởng hấp dẫn',
    category: "Thông tin hoạt động",
  },
  {
    id: 19,
    title: "🎨 Triển lãm nghệ thuật của các tác giả trẻ tài năng",
    category: "Thông tin hoạt động",
  },
  {
    id: 20,
    title: "🏋️‍♀️ Tham gia lớp tập Yoga miễn phí dành cho sinh viên",
    category: "Thông tin hoạt động",
  },
  {
    id: 21,
    title: "🎵 Đêm nhạc acoustic với các nghệ sĩ thực tập sinh tại trường",
    category: "Thông tin hoạt động",
  },
  {
    id: 22,
    title: "🌳 Chiến dịch trồng cây xanh trong khuôn viên trường học",
    category: "Thông tin hoạt động",
  },
  {
    id: 23,
    title: "🏀 Giải bóng rổ sinh viên với nhiều giải thưởng hấp dẫn",
    category: "Thông tin hoạt động",
  },
  {
    id: 24,
    title: "📖 Ngày hội sách với nhiều ưu đãi và hoạt động thú vị",
    category: "Thông tin hoạt động",
  },
  {
    id: 25,
    title: "🍲 Lễ hội ẩm thực quốc tế với các món ăn đặc sắc từ nhiều quốc gia",
    category: "Thông tin hoạt động",
  },
  {
    id: 26,
    title: "🎬 Chiếu phim miễn phí với các bộ phim hay nhất năm",
    category: "Thông tin hoạt động",
  },
  {
    id: 27,
    title: "🌍 Chương trình trao đổi văn hóa với sinh viên quốc tế",
    category: "Thông tin hoạt động",
  },
  {
    id: 28,
    title: "📢 Buổi chia sẻ về kỹ năng giao tiếp và thuyết trình hiệu quả",
    category: "Thông tin hoạt động",
  },
  {
    id: 29,
    title: '🎭 Vở kịch "Romeo và Juliet" do các diễn viên sinh viên thể hiện',
    category: "Thông tin hoạt động",
  },
  {
    id: 30,
    title: "🎸 Đêm nhạc Rock với các ban nhạc sinh viên tài năng",
    category: "Thông tin hoạt động",
  },

  // Thông tin học phí
  {
    id: 31,
    title: "💰 Hỗ trợ tài chính cho sinh viên gặp khó khăn về kinh tế",
    category: "Thông tin học phí",
  },
  {
    id: 32,
    title: "🤑 Chương trình trả góp học phí với lãi suất ưu đãi",
    category: "Thông tin học phí",
  },
  {
    id: 33,
    title: "💸 Cơ hội làm thêm trong khuôn viên trường để kiếm thêm thu nhập",
    category: "Thông tin học phí",
  },
  {
    id: 34,
    title: "💳 Hướng dẫn cách đăng ký vay vốn sinh viên với thủ tục đơn giản",
    category: "Thông tin học phí",
  },
  {
    id: 35,
    title: "💵 Ưu đãi giảm 10% học phí cho sinh viên đóng học phí đúng hạn",
    category: "Thông tin học phí",
  },
  {
    id: 36,
    title: "💼 Cơ hội làm việc bán thời gian tại các văn phòng trong trường",
    category: "Thông tin học phí",
  },
  {
    id: 37,
    title: "💱 Hướng dẫn cách xin học bổng từ các tổ chức phi lợi nhuận",
    category: "Thông tin học phí",
  },
  {
    id: 38,
    title: "💲 Ưu đãi giảm 20% học phí cho sinh viên đạt thành tích xuất sắc",
    category: "Thông tin học phí",
  },
  {
    id: 39,
    title:
      "💷 Chương trình vay vốn sinh viên với lãi suất 0% trong năm đầu tiên",
    category: "Thông tin học phí",
  },
  {
    id: 40,
    title:
      "💴 Cơ hội nhận học bổng toàn phần dành cho sinh viên nghèo vượt khó",
    category: "Thông tin học phí",
  },
  {
    id: 41,
    title: "💶 Hướng dẫn cách quản lý tài chính hiệu quả cho sinh viên",
    category: "Thông tin học phí",
  },
  {
    id: 42,
    title: "💳 Chương trình thanh toán học phí online với nhiều ưu đãi",
    category: "Thông tin học phí",
  },
  {
    id: 43,
    title:
      "💰 Cơ hội làm việc tạm thời trong dịp nghỉ lễ để kiếm thêm thu nhập",
    category: "Thông tin học phí",
  },
  {
    id: 44,
    title: "💸 Ngày hội việc làm bán thời gian dành cho sinh viên",
    category: "Thông tin học phí",
  },
  {
    id: 45,
    title: "💵 Ưu đãi giảm 15% học phí cho sinh viên đăng ký sớm",
    category: "Thông tin học phí",
  },

  // Thông tin việc làm
  {
    id: 46,
    title:
      "🌐 Cơ hội việc làm tại công ty công nghệ hàng đầu cho sinh viên năm cuối",
    category: "Thông tin việc làm",
  },
  {
    id: 47,
    title: "💼 Ngày hội tuyển dụng với sự tham gia của nhiều doanh nghiệp lớn",
    category: "Thông tin việc làm",
  },
  {
    id: 48,
    title: "👔 Hướng dẫn viết CV và phỏng vấn xin việc hiệu quả",
    category: "Thông tin việc làm",
  },
  {
    id: 49,
    title: "🏢 Cơ hội thực tập hưởng lương tại các công ty danh tiếng",
    category: "Thông tin việc làm",
  },
  {
    id: 50,
    title:
      "🕵️‍♀️ Chia sẻ kinh nghiệm từ các cựu sinh viên thành công trong sự nghiệp",
    category: "Thông tin việc làm",
  },
  {
    id: 51,
    title:
      '💼 Hội thảo "Bí quyết để có một CV nổi bật trong mắt nhà tuyển dụng"',
    category: "Thông tin việc làm",
  },
  {
    id: 52,
    title: "🏭 Tham quan các nhà máy sản xuất hàng đầu trong ngành",
    category: "Thông tin việc làm",
  },
  {
    id: 53,
    title: "👩‍💼 Buổi chia sẻ kinh nghiệm từ các doanh nhân thành đạt",
    category: "Thông tin việc làm",
  },
  {
    id: 54,
    title:
      "🔍 Hướng dẫn tìm kiếm và ứng tuyển việc làm trên các trang web việc làm",
    category: "Thông tin việc làm",
  },
  {
    id: 55,
    title:
      "💻 Khóa học lập trình online miễn phí để nâng cao kỹ năng nghề nghiệp",
    category: "Thông tin việc làm",
  },
  {
    id: 56,
    title: "🤝 Ngày hội giao lưu gặp gỡ với các nhà tuyển dụng hàng đầu",
    category: "Thông tin việc làm",
  },
  {
    id: 57,
    title: "💼 Cơ hội việc làm tại các công ty khởi nghiệp đầy triển vọng",
    category: "Thông tin việc làm",
  },
  {
    id: 58,
    title: "💰 Hướng dẫn cách đàm phán lương thưởng hiệu quả",
    category: "Thông tin việc làm",
  },
  {
    id: 59,
    title: '📈 Hội thảo "Nghề nghiệp tương lai trong thời đại công nghệ số"',
    category: "Thông tin việc làm",
  },
  {
    id: 60,
    title: '🏆 Cuộc thi "Elevator Pitch" với giải thưởng hấp dẫn',
    category: "Thông tin việc làm",
  },
];
