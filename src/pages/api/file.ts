// pages/api/file.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export interface FileResponse {
  type: string;
  arrayBuffer: number[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FileResponse | any>,
) {
  try {
    const { url } = req.query;

    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'Missing url' });
    }

    // S3에 서버에서 직접 요청 → CORS 없음
    const response = await fetch(url.trim());

    if (!response.ok) {
      return res.status(500).json({ error: 'Failed to fetch file' });
    }

    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();

    res.status(200).send({
      type: blob.type,
      arrayBuffer: Array.from(new Uint8Array(buffer)),
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Unexpected server error' });
  }
}
