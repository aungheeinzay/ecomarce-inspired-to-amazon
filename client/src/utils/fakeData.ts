import type { order } from "@/types/order";

export const Products = [{
    id:1,
    name: "Product 1",
    price: 29.99,
    category: "tshirt",
    size:["small", "medium", "large"],
    color:["red", "blue", "green"],
    rating: 4.5,
    images:[{
        url:"https://www.ryderwear.com/cdn/shop/products/advance-oversized-t-shirt-black-clothing-ryderwear-285430_1080x.jpg?v=1671085618",
        alt:"Image 1"
    },{
        url:"https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/T12415s5.jpg?im=Resize,width=750",
        alt:"Image 2"
    },{
        url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ0b8uHJgJ_xQaX8Rk9Y8UHcz6lVKKBGqSEA&s",
        alt:"Image 3" 
    }],
    

},
{
    id:2,
    name: "tshirt",
    price: 29.99,
    category: "tshirt",
    size:["small", "medium", "large"],
    color:["red", "blue", "green"],
    rating: 4.5,
    images:[{
        url:"https://m.media-amazon.com/images/I/81M6E5ykdmL._SS1000_.jpg",
        alt:"Image 1"
    },{
        url:"https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/T12415s5.jpg?im=Resize,width=750",
        alt:"Image 2"
    },{
        url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ0b8uHJgJ_xQaX8Rk9Y8UHcz6lVKKBGqSEA&s",
        alt:"Image 3" 
    }],
    

},
{
    id:3,
    name: "Product 2",
    price: 39.99,
    category: "tshirt",
    size:["small", "medium", "large"],
    color:["red", "blue", "green"],
    rating: 4.5,
    images:[{
        url:"https://www.shutterstock.com/image-photo/beautiful-young-woman-natural-makeup-600nw-2066153771.jpg",
        alt:"Image 1"
    },{
        url:"https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/T12415s5.jpg?im=Resize,width=750",
        alt:"Image 2"
    },{
        url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ0b8uHJgJ_xQaX8Rk9Y8UHcz6lVKKBGqSEA&s",
        alt:"Image 3" 
    }],
    

},
{
    id:3,
    name: "Product 3",
    price: 49.99,
    category: "tshirt",
    size:["small", "medium", "large"],
    color:["red", "blue", "green"],
    rating: 2.5,
    images:[{
        url:"https://www.popflexactive.com/cdn/shop/files/IFeelCuteCropTop-Black-2023_68240.jpg?v=1717508870",
        alt:"Image 1"
    },{
        url:"https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/T12415s5.jpg?im=Resize,width=750",
        alt:"Image 2"
    },{
        url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ0b8uHJgJ_xQaX8Rk9Y8UHcz6lVKKBGqSEA&s",
        alt:"Image 3" 
    }],
    

},
{
    id:4,
    name: "Product 4",
    price: 59.99,
    category: "tshirt",
    size:["small", "medium", "large"],
    color:["red", "blue", "green"],
    rating: 4.5,
    images:[{
        url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5QC0Cl0HDbrH3kfUapzJ4upfTup4Qwspjxw&s",
        alt:"Image 1"
    },{
        url:"https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/T12415s5.jpg?im=Resize,width=750",
        alt:"Image 2"
    },{
        url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ0b8uHJgJ_xQaX8Rk9Y8UHcz6lVKKBGqSEA&s",
        alt:"Image 3" 
    }],
    

}
]

export const fakeOrders: order[] = [
  {
    id: "ord_1001",
    userId: "usr_001",
    customer: "Alice Johnson",
    items: [
      {
        productId: "prd_001",
        name: "Wireless Mouse",
        quantity: 2,
        price: 25.5,
        image: "https://example.com/mouse.jpg"
      },
      {
        productId: "prd_002",
        name: "Mechanical Keyboard",
        quantity: 1,
        price: 80,
        image: "https://example.com/keyboard.jpg"
      }
    ],
    bill: 131,
    status: "paid",
    createdAt: "2025-09-20T10:15:00Z"
  },
  {
    id: "ord_1002",
    userId: "usr_002",
    customer: "Michael Smith",
    items: [
      {
        productId: "prd_003",
        name: "Gaming Headset",
        quantity: 1,
        price: 60,
        image: "https://example.com/headset.jpg"
      }
    ],
    bill: 60,
    status: "pending",
    createdAt: "2025-09-21T14:42:00Z"
  },
  {
    id: "ord_1003",
    userId: "usr_003",
    customer: "Sophia Lee",
    items: [
      {
        productId: "prd_004",
        name: "Smartphone Case",
        quantity: 3,
        price: 15,
        image: "https://example.com/case.jpg"
      },
      {
        productId: "prd_005",
        name: "Screen Protector",
        quantity: 2,
        price: 10,
        image: "https://example.com/protector.jpg"
      }
    ],
    bill: 65,
    status: "shipped",
    createdAt: "2025-09-19T09:30:00Z"
  },
  {
    id: "ord_1004",
    userId: "usr_004",
    customer: "David Brown",
    items: [
      {
        productId: "prd_006",
        name: "Bluetooth Speaker",
        quantity: 1,
        price: 120,
        image: "https://example.com/speaker.jpg"
      }
    ],
    bill: 120,
    status: "delivered",
    createdAt: "2025-09-18T17:25:00Z"
  },
  {
    id: "ord_1005",
    userId: "usr_005",
    customer: "Emma Wilson",
    items: [
      {
        productId: "prd_007",
        name: "USB-C Hub",
        quantity: 2,
        price: 45,
        image: "https://example.com/hub.jpg"
      }
    ],
    bill: 90,
    status: "cancelled",
    createdAt: "2025-09-15T08:10:00Z"
  }
];
