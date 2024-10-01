'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import SearchMountain from '@/app/components/mountain-search';
import MountainList from '@/app/components/mountain-list';
import Pagination from '@/app/components/mountail-pagination';

export default function Page() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/auth/login');
    }
  }, [session, router]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-green-950">한국의 100대 명산</h1>
      <SearchMountain />
      <MountainList />
      <Pagination />
    </div>
  );
}
