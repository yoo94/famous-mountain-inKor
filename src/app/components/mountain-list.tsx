'use client';
import { MountainData } from '../types/mountain-type';
import React, { useEffect, useState } from 'react';
import { useSearchStore } from '@/stores/use-search-condition-store';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

async function fetchMountainList(
  searchPage: number,
  numOfRows = 10,
  srchFrtrlNm: string,
  srchCtpvNm: string
): Promise<MountainData[]> {
  const serviceKey = process.env.NEXT_PUBLIC_API_KEY;
  const url = `https://apis.data.go.kr/B553662/top100FamtListBasiInfoService/getTop100FamtListBasiInfoList?serviceKey=${serviceKey}&pageNo=${searchPage}&numOfRows=${numOfRows}&type=json&srchFrtrlNm=${srchFrtrlNm}&srchCtpvNm=${srchCtpvNm}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();
  return data.response.body.items.item as MountainData[];
}

export default function MountainList() {
  const { searchTerm, searchBy, searchPage } = useSearchStore();
  const [mountains, setMountains] = useState<MountainData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getMountains() {
      setLoading(true);
      try {
        const data = await fetchMountainList(
          searchPage,
          10,
          searchBy === 'name' ? searchTerm : '',
          searchBy === 'city' ? searchTerm : ''
        );
        setMountains(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getMountains();
  }, [searchTerm, searchBy, searchPage]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {mountains.length > 0 ? (
        mountains.map((mountain) => (
          <div
            key={mountain.frtrlId}
            className="border border-gray-300 rounded-2xl shadow-lg p-6 bg-white hover:bg-gray-50 transition duration-200 ease-in-out"
          >
            <h3 className="text-xl font-bold text-green-600 mb-2">{mountain.frtrlNm}</h3>
            <p className="text-gray-700">
              <span className="font-semibold">주소:</span> {mountain.addrNm}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">고도:</span> {mountain.aslAltide}m
            </p>
            <Button className="bg-green-300 text-green-950 font-semibold py-2 px-4 rounded-lg hover:bg-green-100 transition-colors duration-200 ease-in-out w-full mt-4">
              <Link href={`/details/${mountain.frtrlNm}`} className="block w-full text-center">
                상세보기
              </Link>
            </Button>
          </div >
        ))
      ) : (
        <div className="text-center text-gray-500 col-span-3">
          검색 결과가 없습니다.
        </div>
      )
      }
    </div >
  );
}
