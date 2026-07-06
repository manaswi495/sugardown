import express from 'express';
import multer from 'multer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Initialize AWS S3 Client conditionally
let s3Client: S3Client | null = null;
const bucketName = process.env.AWS_S3_BUCKET_NAME;

if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY && bucketName) {
  s3Client = new S3Client({
    region: process.env.AWS_REGION || 'ap-south-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
}

// Configure Multer to store file in memory before uploading to S3 or disk
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
});

// Create local uploads directory if it doesn't exist
const localUploadsDir = path.join(__dirname, '../../public/uploads');
if (!fs.existsSync(localUploadsDir)) {
  fs.mkdirSync(localUploadsDir, { recursive: true });
}

router.post('/', upload.array('files', 10), async (req, res) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const uploadedUrls: string[] = [];

    for (const file of files) {
      const fileExtension = path.extname(file.originalname);
      const fileName = `products-${uuidv4()}${fileExtension}`;

      if (s3Client && bucketName) {
        // Upload to S3
        const command = new PutObjectCommand({
          Bucket: bucketName,
          Key: `products/${fileName}`,
          Body: file.buffer,
          ContentType: file.mimetype,
        });
        await s3Client.send(command);
        uploadedUrls.push(`https://${bucketName}.s3.${process.env.AWS_REGION || 'ap-south-1'}.amazonaws.com/products/${fileName}`);
      } else {
        // Fallback to local storage
        const filePath = path.join(localUploadsDir, fileName);
        fs.writeFileSync(filePath, file.buffer);
        // For this monorepo, let's write directly to frontend/public so they are statically served.
        const frontendPublicPath = path.join(__dirname, '../../../frontend/public', fileName);
        if (fs.existsSync(path.join(__dirname, '../../../frontend/public'))) {
           fs.writeFileSync(frontendPublicPath, file.buffer);
        }
        uploadedUrls.push(`/${fileName}`);
      }
    }

    res.json({ 
      success: true, 
      urls: uploadedUrls,
      message: s3Client ? "Uploaded to AWS S3" : "Uploaded locally" 
    });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ error: 'Failed to upload files' });
  }
});

export default router;
