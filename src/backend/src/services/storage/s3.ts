import AWS from "aws-sdk";

// Configurar AWS
AWS.config.update({
  region: process.env.AWS_REGION || "us-east-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

export class S3Service {
  private bucket: string;

  constructor(bucket: string = process.env.S3_BUCKET_NAME || "") {
    this.bucket = bucket;
  }

  // Subir un buffer a S3
  async uploadBuffer(
    buffer: Buffer,
    key: string,
    contentType?: string
  ): Promise<string> {
    try {
      const params = {
        Bucket: this.bucket,
        Key: key,
        Body: buffer,
        ContentType: contentType,
      };

      const result = await s3.upload(params).promise();
      return result.Location;
    } catch (error) {
      console.error("Error uploading buffer to S3:", error);
      throw error;
    }
  }

  // Obtener archivo de S3
  async getFile(key: string): Promise<AWS.S3.GetObjectOutput> {
    try {
      const params = {
        Bucket: this.bucket,
        Key: key,
      };

      return await s3.getObject(params).promise();
    } catch (error) {
      console.error("Error retrieving file from S3:", error);
      throw error;
    }
  }

  // Obtener URL firmada
  getSignedUrl(key: string, expiresIn: number = 60): string {
    const params = {
      Bucket: this.bucket,
      Key: key,
      Expires: expiresIn,
    };

    return s3.getSignedUrl("getObject", params);
  }

  // Eliminar archivo
  async deleteFile(key: string): Promise<void> {
    try {
      const params = {
        Bucket: this.bucket,
        Key: key,
      };

      await s3.deleteObject(params).promise();
    } catch (error) {
      console.error("Error deleting file from S3:", error);
      throw error;
    }
  }
}

// Singleton instance
export const s3Service = new S3Service();
