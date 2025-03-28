import { Amulet } from "../models/Amulet";
import { Order, OrderDetail } from "../models/Order";


export const mockOrders: Order[] = [
  { id: 1, cusId: "C001", totalPrice: 500 },
  { id: 2, cusId: "C001", totalPrice: 1200 },
  { id: 3, cusId: "C001", totalPrice: 800 },

];

export const mockOrderDetails: OrderDetail[] = [
  { id: 1, productId: 101, orderId: 1 },
  { id: 2, productId: 102, orderId: 1 },

  { id: 3, productId: 103, orderId: 2 },
  { id: 4, productId: 101, orderId: 2 },
  { id: 5, productId: 104, orderId: 2 },

  { id: 6, productId: 102, orderId: 3 },
  { id: 7, productId: 105, orderId: 3 },
];

export const mockAmulets: Amulet[] = [
  {
    id: 101,
    name: "พระสมเด็จ",
    templeName: "วัดระฆัง",
    price: 200,
    type: "เนื้อผง",
    image: "https://example.com/images/amulet-101.jpg"
  },
  {
    id: 102,
    name: "หลวงปู่ทวด",
    templeName: "วัดช้างให้",
    price: 150,
    type: "เนื้อว่าน",
    image: "https://example.com/images/amulet-102.jpg"
  },
  {
    id: 103,
    name: "พระกริ่ง",
    templeName: "วัดสุทัศน์",
    price: 300,
    type: "โลหะ",
    image: "https://example.com/images/amulet-103.jpg"
  },
  {
    id: 104,
    name: "พระปิดตา",
    templeName: "วัดบางนมโค",
    price: 250,
    type: "เนื้อดิน",
    image: "https://example.com/images/amulet-104.jpg"
  },
  {
    id: 105,
    name: "พระผง",
    templeName: "วัดปากน้ำ",
    price: 100,
    type: "เนื้อผง",
    image: "https://example.com/images/amulet-105.jpg"
  }
];
