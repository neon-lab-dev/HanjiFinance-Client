export type TCourseOrder = {
  _id: string;
  orderId: string;
  userId: string;
  userCustomId: string;
  name:string;
  email:string;
  phoneNumber:string;
  courseId: string;
  courseTitle: string;
  coursePrice: number;
  totalAmount: number;
  razorpayOrderId?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
