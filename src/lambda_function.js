import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

// IMPORTANT: Ensure the region matches your S3 bucket's region
const s3Client = new S3Client({ region: "YOUR_AWS_REGION" }); 

export const handler = async (event) => {
  // 1. THE SECURITY GATEWAY
  const clientSecret = event.queryStringParameters?.secret;
  const serverSecret = process.env.UPLOAD_PASSWORD;

  if (!serverSecret || clientSecret !== serverSecret) {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: "Access Denied: Invalid or missing security token." })
    };
  }

  // 2. THE NORMAL UPLOAD LOGIC
  const fileName = `resume-${Date.now()}.html`;
  const bucketName = "YOUR_BUCKET_NAME_HERE"; // ⚠️ Change this

  try {
    const { url, fields } = await createPresignedPost(s3Client, {
      Bucket: bucketName,
      Key: fileName,
      Conditions: [
        ["content-length-range", 1, 524288], // Limits file size from 1 Byte to 500 KB
        ["eq", "$Content-Type", "text/html"] // Strictly blocks images/scripts
      ],
      Fields: {
        "Content-Type": "text/html",
      },
      Expires: 300, 
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        uploadUrl: url,
        fields: fields, 
        // ⚠️ Ensure the region matches your bucket
        fileUrl: `http://${bucketName}.s3-website.YOUR_AWS_REGION.amazonaws.com/${fileName}`
      })
    };
  } catch (err) {
    return { 
        statusCode: 500, 
        body: JSON.stringify({ error: err.message }) 
    };
  }
};