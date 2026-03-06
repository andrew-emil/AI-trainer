import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Notification, INotification } from "../database/models/notification.model";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class NotificationRepo {
    constructor(
        @InjectModel(Notification.name)
        private readonly notificationModel: Model<INotification>,
    ) { }

    async create(data: Partial<INotification>) {
        return this.notificationModel.create(data);
    }

    async findByUserId(userId: string, limit = 20, page = 1) {
        return this.notificationModel
            .find({ userId })
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip((page - 1) * limit)
            .lean()
            .exec();
    }

    async markRead(notificationId: string) {
        return this.notificationModel.updateOne(
            { _id: notificationId },
            { $set: { read: true } },
        );
    }

    async markAllRead(userId: string) {
        return this.notificationModel.updateMany(
            { userId },
            { $set: { read: true } },
        );
    }

    async countUnread(userId: string) {
        return this.notificationModel.countDocuments({ userId, read: false });
    }

    async delete(notificationId: string, userId: string) {
        const deletedNotification = await this.notificationModel.deleteOne({ _id: notificationId, userId });
        if (!deletedNotification.deletedCount) {
            throw new RpcException({
                status: 404,
                message: "Notification not found"
            })
        }
        const count = await this.notificationModel.countDocuments({ userId, read: false });
        return { deletedNotification, count };
    }
}