
export type TBoardRoomBanterSubscription = {
  _id: string;
  userId: string;
  name: string;
  email: string;
  phoneNumber: string;
  startDate: Date;
  endDate: Date;
  status: "active" | "paused" | "expired" | "pending";
  pauseDate?: Date;
  resumeDate?: Date;
  razorpaySubscriptionId: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  isAddedToWhatsappGroup?: boolean;
  isSuspended?: boolean;
  isRemoved?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
