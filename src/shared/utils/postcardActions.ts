// 공유
export const handleShare = () => {
  if (navigator.share) {
    navigator.share({
      title: '엽서 공유',
      text: '글다',
      url: window.location.href,
    });
  } else {
    alert('이 브라우저에서는 공유 기능을 지원하지 않습니다.');
  }
};

// 저장
export const handleSave = () => {
  const imageUrl = '/assets/Card.png';
  const link = document.createElement('a');
  link.href = imageUrl;
  link.download = '글다.png';
  link.click();
};
