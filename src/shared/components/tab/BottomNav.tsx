import Link from 'next/link';
import { useRouter } from 'next/router';
import { TabItem } from './TabItem';
import type { IconName } from '@/shared/icons/iconNames';

interface NavItem {
  id: string;
  label: string;
  icon: IconName;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'main', label: 'main', icon: 'HouseSimple', href: '/main' },
  { id: 'route', label: 'Route', icon: 'MapPin_', href: '/route' },
  { id: 'events', label: 'Events', icon: 'CalendarBlank', href: '/events' },
  { id: 'chatbot', label: 'ChatBot', icon: 'ChatCircle', href: '/chatbot' },
  { id: 'mypage', label: 'MyPage', icon: 'User', href: '/mypage' },
];

export const BottomNav = () => {
  const router = useRouter();

  return (
    <nav
      className="
        fixed bottom-[2rem] left-[2.4rem]
        w-[calc(100%-4.8rem)]
        flex justify-between items-center
        py-[1rem]
        rounded-[37.07px]
        bg-mint-50 border border-mint-300
      "
    >
      {NAV_ITEMS.map((item) => {
        const isActive = router.pathname === item.href;

        return (
          <Link
            key={item.id}
            href={item.href}
            className="flex-1 flex justify-center"
          >
            <TabItem label={item.label} icon={item.icon} isActive={isActive} />
          </Link>
        );
      })}
    </nav>
  );
};
