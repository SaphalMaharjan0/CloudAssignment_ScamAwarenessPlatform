const SERVERLESS_BASE = "https://karcluj449.execute-api.us-east-1.amazonaws.com";

// 1. S3 Direct Upload Flow
export async function uploadEvidenceToS3(file: File): Promise<string> {
  // Step A: Request the Pre-signed URL from API Gateway -> Lambda
  const presignRes = await fetch(
    `${SERVERLESS_BASE}/evidence/presigned-url?fileName=${encodeURIComponent(file.name)}&fileType=${encodeURIComponent(file.type)}`
  );
  if (!presignRes.ok) {
    throw new Error("Could not retrieve upload authorization from serverless service.");
  }
  const { uploadUrl, fileKey } = await presignRes.json();

  // Step B: Upload file directly to the S3 bucket
  const uploadRes = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });

  if (!uploadRes.ok) {
    throw new Error("Direct S3 upload failed.");
  }

  return fileKey; // Pass this fileKey to your Spring Boot backend to store in PostgreSQL
}

// 2. SNS Alert Broadcast Flow
export async function sendCommunityScamAlert(title: string, description: string) {
  const res = await fetch(`${SERVERLESS_BASE}/alerts/broadcast`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description }),
  });

  if (!res.ok) {
    throw new Error("Failed to send community alert.");
  }

  return res.json();
}
