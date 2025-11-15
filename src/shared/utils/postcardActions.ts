export const handleShare = async (imageUrl: string, title: string) => {
  if (navigator.canShare && navigator.canShare({ files: [] })) {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const file = new File([blob], `${title}.png`, { type: blob.type });

    try {
      await navigator.share({
        title: `${title} 엽서`,
        text: '내가 획득한 엽서를 공유합니다!',
        files: [file],
      });
    } catch (err) {
      console.error('공유 실패:', err);
    }
  } else {
    alert('이 브라우저에서는 이미지 공유를 지원하지 않습니다.');
  }
};

export const handleSave = (imageUrl: string, placeName: string) => {
  try {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${placeName}.png`;
    link.click();
  } catch (err) {
    console.error('이미지 저장 실패:', err);
  }
};

export async function downloadFromServer(url: string, fileName: string) {
  try {
    const resp = await fetch(`/api/file?url=${encodeURIComponent(url)}`);
    const json = await resp.json();

    const blob = new Blob([Uint8Array.from(json.arrayBuffer)], {
      type: json.type,
    });

    const blobUrl = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = fileName;
    a.click();

    URL.revokeObjectURL(blobUrl);
  } catch (err) {
    console.error('다운로드 실패:', err);
  }
}
