import axios from 'axios';

type CloudinaryUploadResponse = {
  secure_url: string;
  public_id: string;
  resource_type: 'image' | 'video' | 'raw';
};

export enum ImageType {
  AVATAR = 'avatar',
  CERTIFICATE = 'certificate',
  TRANSFORMATION = 'transformation',
}

export async function uploadImageToCloudinary(file: File, type: ImageType) {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  if (!cloudName) {
    throw new Error(
      'Cloudinary configuration is missing. Please set VITE_CLOUDINARY_CLOUD_NAME in your environment variables.',
    );
  }

  const presetByType = {
    avatar: 'pp_avatar_unsigned',
    certificate: 'pp_certificate_unsigned',
    transformation: 'pp_transformation_unsigned',
  } as const;

  const folderByType = {
    avatar: `/avatars`,
    certificate: `/certificates`,
    transformation: `/transformations`,
  } as const;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', presetByType[type]);
  formData.append('folder', folderByType[type]);

  try {
    const { data } = await axios.post<CloudinaryUploadResponse>(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    if (!data) {
      throw new Error('Failed to upload image to Cloudinary');
    }

    return { secureUrl: data.secure_url, publicId: data.public_id };
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw error;
  }
}
