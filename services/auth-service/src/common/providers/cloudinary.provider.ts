import { Injectable, Logger } from '@nestjs/common';
import { v2 as cloudinary } from "cloudinary";

@Injectable()
export class CloudinaryProvider {
    private readonly logger = new Logger(CloudinaryProvider.name);

    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
            api_key: process.env.CLOUDINARY_API_KEY!,
            api_secret: process.env.CLOUDINARY_API_SECRET!,
        });
    }

    async deleteImage(publicId?: string | null) {
        if (!publicId) return;

        const res = await cloudinary.uploader.destroy(publicId, {
            resource_type: "image",
            invalidate: true,
        });

        if (res.result !== "ok" && res.result !== "not found") {
            this.logger.warn(`Failed to delete image from Cloudinary: ${publicId}`);
        }
    }
}
