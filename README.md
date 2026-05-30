# Serverless Resume-as-a-Service

This project is a fully serverless, enterprise-grade, cost-optimized architecture for securely uploading HTML resumes to an AWS S3 bucket using a secure, password-protected Lambda Function URL. 

*All private data has been removed. Be sure to replace the `<PLACEHOLDERS>` with your own AWS details before running.*

## Architecture Overview
* **Frontend:** HTML/JS with a password prompt (hides inputs for secure screencasting).
* **Backend:** AWS Lambda (Node.js) acting as a security gatekeeper.
* **Storage:** Amazon S3 (Static Website Hosting).
* **Security:** Cryptographic Pre-Signed POST requests, strict 500KB file limits, `text/html` enforcement, and reserved concurrency for DDoS protection.

---

## 🚀 Setup Instructions

### Step 1: Configure S3 (Storage)
1. Go to the AWS S3 Console and create a new bucket (e.g., `my-resume-bucket`). Uncheck "Block all public access".
2. Go to **Properties** -> Enable **Static Website Hosting**.
3. Go to **Permissions** -> **CORS**: Paste the contents of `/policies/s3-cors-policy.json`.
4. Go to **Permissions** -> **Bucket Policy**: Paste the contents of `/policies/s3-bucket-policy.json` (Replace `<YOUR_BUCKET_NAME>`).

### Step 2: Configure Lambda (Backend Gatekeeper)
1. Go to the AWS Lambda Console and create a Node.js function.
2. In the **Code** tab, paste the contents of `/src/lambda_function.js`. Ensure you update `YOUR_BUCKET_NAME_HERE` and `YOUR_AWS_REGION`. Click **Deploy**.
3. Go to **Configuration** -> **Permissions** -> Click your Execution Role. Attach the `AmazonS3FullAccess` IAM policy.
4. Go to **Configuration** -> **Environment variables**. Add a key called `UPLOAD_PASSWORD` and set your secret password (avoid special characters like `#`).
5. Go to **Configuration** -> **Function URL** -> Create a Function URL with `Auth type: NONE` and enable CORS.
6. *(Optional but Recommended)*: Go to **Configuration** -> **Concurrency** -> Set Reserved Concurrency to `2` to protect against DDoS attacks.

### Step 3: Configure Frontend (Website)
1. Open `/src/index.html` in a text editor.
2. Replace `YOUR_LAMBDA_URL_HERE` with the actual Function URL you generated in Step 2.
3. Save the file. You can now open this `index.html` file in your browser, enter your password, and upload your resume!

---

## 🔒 Included IAM Policies
In the `/policies` folder, you will find:
* `iam-developer-policy.json`: The least-privilege policy used to allow a developer account to build this without root access.
* `lambda-resource-policy.json`: The resource-based policy automatically applied when you create a public Function URL.
* `s3-bucket-policy.json`: Makes the uploaded files publicly readable.
* `s3-cors-policy.json`: Allows your browser to talk directly to S3.

## 💰 Cost Analysis
Because of the password gatekeeper, strict file size limits (500KB max), and concurrency limits, this architecture is designed to stay completely within the AWS Free Tier, costing **$0.00/month**.
