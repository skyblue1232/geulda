// pages/api/file.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export interface FileResponse {
  type: string;
  arrayBuffer: number[];
}

export interface ErrorResponse {
  error: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FileResponse | ErrorResponse>,
) {
  try {
    const { url } = req.query;

    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'Missing url' });
    }

    const response = await fetch(url.trim());

    if (!response.ok) {
      return res.status(500).json({ error: 'Failed to fetch file' });
    }

    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();

    return res.status(200).json({
      type: blob.type,
      arrayBuffer: Array.from(new Uint8Array(buffer)),
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Unexpected server error' });
  }
}
