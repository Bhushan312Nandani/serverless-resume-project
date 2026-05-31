### 3. Serverless Resume-as-a-Service README

(Already decent — here's a polished version)

```markdown
# Serverless Resume-as-a-Service (AWS)

First hands-on enterprise-grade serverless project on AWS.

## Overview

Secure HTML resume publishing system using:
- Password-protected **Lambda Function URL**
- Presigned S3 POST uploads
- Strict content-type & size limits (500KB max)
- Static website hosting on S3

## Architecture Highlights
- Zero-trust frontend (HTML/JS)
- Password gatekeeper Lambda
- Strict security policies (IAM)
- Fully stays within AWS Free Tier

## Tech Stack
- AWS Lambda, S3, IAM Policies
- HTML + Vanilla JavaScript

**Repository includes** full source, policies, and deployment instructions.

Built during DecodeLabs Internship.