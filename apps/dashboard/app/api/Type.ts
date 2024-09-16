export interface Transaction {
    id: number;
    senderId: string;
    receiverId: string;
    points: number;
    description: string;
    link: string;
    domainId: string;
    createdAt: Date;
  }

export interface User {
    discordUsername: string;
    discordUserAvatar: string;
    pointsSent: number;
    pointsReceived: number;
    balance: number;
  }