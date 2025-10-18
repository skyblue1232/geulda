import LocationBubble from '@/shared/components';

export default function LocationBubblePage() {
  return (
    <main className='flex items-center justify-center min-h-screen bg-gray-100'>
      <LocationBubble
        name='한강공원 잠원지구'
        imageSrc='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format'
      />
    </main>
  );
}