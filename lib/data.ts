import { Product, Shade } from './types';

export const SHADES: Shade[] = [
  {
    id: "jujube",
    name: "07 Jujube (Táo đỏ)",
    hex: "#A64B3E",
    imageSrc: "https://romandbeauty.com/cdn/shop/files/07_JUJUBE_4.jpg",
  },
  {
    id: "cherry-bomb",
    name: "12 Cherry Bomb (Đỏ cherry)",
    hex: "#C4283C",
    imageSrc: "https://romandbeauty.com/cdn/shop/files/12_CHERRY_BOMB_4.jpg",
  },
  {
    id: "plum-coke",
    name: "17 Plum Coke (Mận đỏ cá tính)",
    hex: "#6B2737",
    imageSrc: "https://romandbeauty.com/cdn/shop/files/17_PLUM_COKE_4.jpg",
  },
  {
    id: "mulled-peach",
    name: "18 Mulled Peach (Cam đào san hô)",
    hex: "#E08A5B",
    imageSrc: "https://romandbeauty.com/cdn/shop/files/18_MULLED_PEACH_4.jpg",
  },
  {
    id: "almond-rose",
    name: "19 Almond Rose (Hồng đất)",
    hex: "#C98A82",
    imageSrc: "https://romandbeauty.com/cdn/shop/files/19_ALMOND_ROSE_4.jpg",
  },
  {
    id: "bare-grape",
    name: "25 Bare Grape (Hồng nho MLBB)",
    hex: "#8B5A6B",
    imageSrc: "https://romandbeauty.com/cdn/shop/files/25_BARE_GRAPE_4.jpg",
  },
];

export const HERO_PRODUCT: Product = {
  id: "juicy-lasting-tint",
  name: "Juicy Lasting Tint",
  category: "SON TINT BÓNG",
  price: 290000,
  description: "Cảm hứng từ sắc màu trái cây mọng nước, tạo lớp bóng gương trong suốt cùng lớp tint bám màu tự nhiên suốt ngày dài mà không hề gây nặng môi.",
  shades: SHADES,
};

export const OTHER_PRODUCTS: Product[] = [
  {
    id: "glasting-melting-balm",
    name: "Glasting Melting Balm",
    category: "SON DƯỠNG CÓ MÀU",
    price: 290000,
    description: "Cấp ẩm dồi dào với lớp bóng tan chảy mềm mượt trên môi.",
    imageSrc: "https://romandbeauty.com/cdn/shop/files/1_5657be7d-f915-49f8-8d24-3d4d558087eb.jpg",
  },
  {
    id: "han-all-fix-mascara",
    name: "Han All Fix Mascara",
    category: "MASCARA ĐỊNH HÌNH MI",
    price: 320000,
    description: "Làm dày mi, giữ nếp cong và chống trôi lem suốt cả ngày.",
    imageSrc: "https://romandbeauty.com/cdn/shop/files/JuicyLastingTint_Lifestyle_BareGrape.png",
  },
  {
    id: "idol-hack-trio",
    name: "Idol Hack Trio Set",
    category: "BỘ COMBO 3 MÓN",
    price: 690000,
    description: "Set 3 sản phẩm tuyển chọn cho bờ môi chuẩn phong cách idol Hàn Quốc.",
    imageSrc: "https://romandbeauty.com/cdn/shop/files/JuicyLastingTint_Lifestyle.png",
  },
  {
    id: "blur-fudge-tint",
    name: "Blur Fudge Tint",
    category: "SON KEM LÌ BƠ MỊN",
    price: 290000,
    description: "Chất son fudge mịn như nhung, che mờ rãnh môi hoàn hảo.",
    imageSrc: "https://romandbeauty.com/cdn/shop/files/07_JUJUBE_4.jpg",
  },
  {
    id: "dewy-ful-water-tint",
    name: "Dewy·ful Water Tint",
    category: "SON TINT NƯỚC",
    price: 290000,
    description: "Lớp màng nước mỏng nhẹ, cấp ẩm tức thì cho bờ môi rạng rỡ.",
    imageSrc: "https://romandbeauty.com/cdn/shop/files/18_MULLED_PEACH_4.jpg",
  },
  {
    id: "juicy-lasting-tint-mini",
    name: "The Juicy Lasting Tint Mini",
    category: "SON MINI TIỆN LỢI",
    price: 160000,
    description: "Phiên bản mini nhỏ gọn, bỏ túi dễ dàng dặm lại mọi lúc mọi nơi.",
    imageSrc: "https://romandbeauty.com/cdn/shop/files/12_CHERRY_BOMB_4.jpg",
  },
  {
    id: "glasting-color-gloss",
    name: "Glasting Color Gloss",
    category: "SON BÓNG BẮT SÁNG",
    price: 290000,
    description: "Hiệu ứng bắt sáng đa chiều với sắc tố màu rạng rỡ cuốn hút.",
    imageSrc: "https://romandbeauty.com/cdn/shop/files/19_ALMOND_ROSE_4.jpg",
  },
  {
    id: "lip-mate-pencil",
    name: "Lip Mate Pencil",
    category: "CHÌ KẺ VIỀN MÔI",
    price: 240000,
    description: "Định hình viền môi tự nhiên, tạo hiệu ứng môi đầy đặn quyến rũ.",
    imageSrc: "https://romandbeauty.com/cdn/shop/files/25_BARE_GRAPE_4.jpg",
  },
];

export const SPOTLIGHT_BULLETS = [
  {
    title: "Sắc Màu Trái Cây Tươi Mới",
    description: "Lấy cảm hứng từ sắc đào chín, dâu mọng và táo rừng, mang lại lớp màu ửng hồng trong trẻo và tràn đầy sức sống.",
  },
  {
    title: "Bóng Sáng Rực Rỡ Như Gương",
    description: "Lớp màng dầu thực vật cao cấp phản chiếu ánh sáng giúp môi căng mọng, khóa ẩm tối ưu mà không bết dính.",
  },
  {
    title: "Càng Thoa Càng Đằm Thắm",
    description: "Hạt sắc tố thẩm thấu êm dịu vào biểu bì môi, giữ lại lớp màu nền tự nhiên, bền màu thanh lịch sau nhiều giờ ăn uống.",
  },
  {
    title: "Nuôi Dưỡng & Cấp Ẩm Dài Lâu",
    description: "Bổ sung tinh chất dưỡng ẩm từ quả mọng tự nhiên, giúp làn môi luôn mịn màng, mềm mại suốt cả ngày dài.",
  },
];


