import { create } from 'zustand';

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  availability: 'In Stock' | 'Low Stock' | 'Out of Stock';
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type OrderStatus = 'Confirmed' | 'Preparing' | 'Packed' | 'Out for Delivery' | 'Delivered';

export type Order = {
  id: string;
  customerName: string;
  customerMobile: string;
  customerEmail: string;
  customerAddress: string;
  items: CartItem[];
  totalAmount: number;
  deliveryDate: string;
  deliverySlot: string;
  status: OrderStatus;
  createdAt: string;
};

export type InventoryItem = {
  id: string;
  name: string;
  currentStock: number;
  expectedRequirementNormal: number;
  expectedRequirementPeak: number;
  status: 'Healthy' | 'Low' | 'Out of Stock';
  type: 'Flower' | 'Packaging';
};

export type DeliverySlot = {
  id: string;
  timeRange: string;
  capacity: number;
  booked: number;
};

export type AppState = {
  // Products
  products: Product[];
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // Orders
  orders: Order[];
  placeOrder: (orderData: Omit<Order, 'id' | 'status' | 'createdAt'>) => string;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Business Dashboard State
  isPeakDay: boolean;
  expectedOrders: number;
  simulatePeakDay: () => void;
  resetDemo: () => void;
  
  // Inventory & Logistics
  inventory: InventoryItem[];
  deliverySlots: DeliverySlot[];
  createPurchaseOrder: (itemId: string, amount: number) => void;
};

// Initial Demo Data
const initialProducts: Product[] = [
  { id: 'p1', name: 'Classic Rose Bouquet', price: 499, description: '12 fresh red roses.', category: 'Anniversary', image: 'https://live.staticflickr.com/7129/7664133294_97c7552027_c.jpg', availability: 'In Stock' },
  { id: 'p2', name: 'Pink Blossom Bouquet', price: 699, description: 'Beautiful pink seasonal flowers.', category: 'Birthday', image: 'https://live.staticflickr.com/5542/9074221145_4e0538e4f6_c.jpg', availability: 'In Stock' },
  { id: 'p3', name: 'Elegant Lily Arrangement', price: 899, description: 'White lilies in a glass vase.', category: 'Celebration', image: 'https://live.staticflickr.com/8015/7468290412_4afe233b47_c.jpg', availability: 'In Stock' },
  { id: 'p4', name: 'Sunshine Bouquet', price: 999, description: 'Bright sunflowers and yellow roses.', category: 'Birthday', image: 'https://live.staticflickr.com/4864/44835801585_a1f501dfda_c.jpg', availability: 'In Stock' },
  { id: 'p5', name: 'Premium Celebration Bouquet', price: 1499, description: 'Our finest mixed premium flowers.', category: 'Celebration', image: 'https://live.staticflickr.com/5443/8926285652_19fd57f53c_c.jpg', availability: 'In Stock' },
  { id: 'p6', name: 'Mixed Flower Basket', price: 999, description: 'A charming woven basket arrangement.', category: 'Festival', image: 'https://live.staticflickr.com/5334/7079604851_db40728cd7_c.jpg', availability: 'In Stock' },
  { id: 'p7', name: 'Luxury Rose Collection', price: 1799, description: '100 premium red roses.', category: 'Anniversary', image: 'https://live.staticflickr.com/65535/36849342466_a87e3a2124_c.jpg', availability: 'In Stock' },
  { id: 'p8', name: 'Festival Special Bouquet', price: 1299, description: 'Festive colors and traditional flowers.', category: 'Festival', image: 'https://live.staticflickr.com/2245/2430238598_0eb0a37b7b_c.jpg', availability: 'In Stock' },
];

const initialInventory: InventoryItem[] = [
  { id: 'i1', name: 'Red Roses', currentStock: 240, expectedRequirementNormal: 150, expectedRequirementPeak: 800, status: 'Healthy', type: 'Flower' },
  { id: 'i2', name: 'Pink Roses', currentStock: 120, expectedRequirementNormal: 80, expectedRequirementPeak: 400, status: 'Healthy', type: 'Flower' },
  { id: 'i3', name: 'Lilies', currentStock: 65, expectedRequirementNormal: 40, expectedRequirementPeak: 200, status: 'Healthy', type: 'Flower' },
  { id: 'i4', name: 'Gift Boxes', currentStock: 45, expectedRequirementNormal: 30, expectedRequirementPeak: 150, status: 'Low', type: 'Packaging' },
  { id: 'i5', name: 'Wrapping Paper', currentStock: 180, expectedRequirementNormal: 100, expectedRequirementPeak: 500, status: 'Healthy', type: 'Packaging' },
  { id: 'i6', name: 'Ribbons', currentStock: 250, expectedRequirementNormal: 120, expectedRequirementPeak: 600, status: 'Healthy', type: 'Packaging' },
];

const initialDeliverySlots: DeliverySlot[] = [
  { id: 's1', timeRange: '10 AM - 12 PM', capacity: 10, booked: 6 },
  { id: 's2', timeRange: '12 PM - 2 PM', capacity: 10, booked: 8 },
  { id: 's3', timeRange: '2 PM - 4 PM', capacity: 10, booked: 7 },
  { id: 's4', timeRange: '4 PM - 6 PM', capacity: 10, booked: 9 },
  { id: 's5', timeRange: '6 PM - 8 PM', capacity: 10, booked: 8 },
];

const generateDemoOrders = (): Order[] => {
  const orders: Order[] = [];
  const statuses: OrderStatus[] = ['Delivered', 'Out for Delivery', 'Packed', 'Preparing', 'Confirmed'];
  for (let i = 1; i <= 20; i++) {
    orders.push({
      id: `BN-10${20 - i + 10}`,
      customerName: `Customer ${i}`,
      customerMobile: '9876543210',
      customerEmail: `customer${i}@example.com`,
      customerAddress: `Address ${i}, City`,
      items: [{ product: initialProducts[i % 8], quantity: 1 }],
      totalAmount: initialProducts[i % 8].price + 50,
      deliveryDate: new Date().toISOString().split('T')[0],
      deliverySlot: initialDeliverySlots[i % 5].timeRange,
      status: statuses[i % 5],
      createdAt: new Date(Date.now() - i * 3600000).toISOString(),
    });
  }
  return orders;
};

export const useStore = create<AppState>((set) => ({
  products: initialProducts,
  cart: [],
  orders: generateDemoOrders(),
  isPeakDay: false,
  expectedOrders: 20, // normal day
  inventory: initialInventory,
  deliverySlots: initialDeliverySlots,

  addToCart: (product) => set((state) => {
    const existing = state.cart.find((item) => item.product.id === product.id);
    if (existing) {
      return { cart: state.cart.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) };
    }
    return { cart: [...state.cart, { product, quantity: 1 }] };
  }),

  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter((item) => item.product.id !== productId)
  })),

  updateCartQuantity: (productId, quantity) => set((state) => ({
    cart: state.cart.map((item) => item.product.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item)
  })),

  clearCart: () => set({ cart: [] }),

  placeOrder: (orderData) => {
    let newOrderId = '';
    set((state) => {
      const id = `BN-${1000 + state.orders.length + 30}`; // Generate ID
      newOrderId = id;
      const newOrder: Order = {
        ...orderData,
        id,
        status: 'Confirmed',
        createdAt: new Date().toISOString(),
      };
      
      // Update delivery slots
      const newSlots = state.deliverySlots.map(slot => {
        if (slot.timeRange === orderData.deliverySlot) {
          return { ...slot, booked: slot.booked + 1 };
        }
        return slot;
      });

      // Update inventory (simplified logic, deduct some items)
      const newInventory = state.inventory.map(item => {
        let deduction = 0;
        if (item.type === 'Flower') deduction = 12 * orderData.items.reduce((acc, curr) => acc + curr.quantity, 0); // rough est
        if (item.type === 'Packaging') deduction = 1 * orderData.items.reduce((acc, curr) => acc + curr.quantity, 0);
        
        const newStock = Math.max(0, item.currentStock - deduction);
        let status = item.status;
        if (newStock < 50) status = 'Low';
        if (newStock === 0) status = 'Out of Stock';

        return { ...item, currentStock: newStock, status };
      });

      return {
        orders: [newOrder, ...state.orders],
        cart: [],
        deliverySlots: newSlots,
        inventory: newInventory,
        expectedOrders: state.expectedOrders + 1
      };
    });
    return newOrderId;
  },

  updateOrderStatus: (orderId, status) => set((state) => ({
    orders: state.orders.map((order) => order.id === orderId ? { ...order, status } : order)
  })),

  simulatePeakDay: () => set((state) => {
    // Update inventory status to show pressure
    const newInventory = state.inventory.map(item => {
      const required = item.expectedRequirementPeak;
      let status: 'Healthy' | 'Low' | 'Out of Stock' = 'Healthy';
      if (item.currentStock < required) status = 'Low';
      if (item.currentStock < required * 0.2) status = 'Out of Stock';
      return { ...item, status };
    });

    // Update delivery slots to show high utilization
    const newSlots = state.deliverySlots.map(slot => ({
      ...slot,
      booked: Math.min(slot.capacity, Math.floor(slot.capacity * 0.95))
    }));

    return {
      isPeakDay: true,
      expectedOrders: 70,
      inventory: newInventory,
      deliverySlots: newSlots,
    };
  }),

  resetDemo: () => set({
    isPeakDay: false,
    expectedOrders: 20,
    inventory: initialInventory,
    deliverySlots: initialDeliverySlots,
    orders: generateDemoOrders(),
    cart: []
  }),

  createPurchaseOrder: (itemId, amount) => set((state) => ({
    inventory: state.inventory.map(item => {
      if (item.id === itemId) {
        const newStock = item.currentStock + amount;
        let status: 'Healthy' | 'Low' | 'Out of Stock' = 'Healthy';
        if (newStock < item.expectedRequirementPeak && state.isPeakDay) status = 'Low';
        else if (newStock < item.expectedRequirementNormal && !state.isPeakDay) status = 'Low';
        return { ...item, currentStock: newStock, status };
      }
      return item;
    })
  })),

}));
