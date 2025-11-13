export const handleShare = (title: string, imageUrl: string, url?: string) => {
  if (navigator.share) {
    navigator
      .share({
        title: `${title} 엽서 공유`,
        text: '내가 획득한 엽서를 확인해보세요!',
        url: url ?? window.location.href,
      })
      .catch((err) => console.error('공유 실패:', err));
  } else {
    alert('이 브라우저에서는 공유 기능을 지원하지 않습니다.');
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
