import { MountainData } from '../types/mountain-type';
import React, { useEffect, useState } from 'react';

async function fetchMountainList(pageNo = 1, numOfRows = 10, srchFrtrlNm = ''): Promise<MountainData[]> {
  const serviceKey = 'pYpBESj9KAnG2Pz1YSPDBZdaZ1hX/GBZuhOb2to/Y0EspudSkT4dDZbtH0YgB9fy/j82zaICpPy9efyNwYOC9w==';
  const url = `http://apis.data.go.kr/B553662/top100FamtListBasiInfoService/getTop100FamtListBasiInfoList?serviceKey=${serviceKey}&pageNo=${pageNo}&numOfRows=${numOfRows}&type=json&srchFrtrlNm=${srchFrtrlNm}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();
  return data.response.body.items.item as MountainData[];
}

type MountainListProps = {
  searchTerm: string;
};

export default function MountainList({ searchTerm }: MountainListProps) {
  const [mountains, setMountains] = useState<MountainData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getMountains() {
      setLoading(true);
      try {
        const data = await fetchMountainList(1, 10, searchTerm);  // 검색어가 변경될 때마다 데이터를 가져옴
        setMountains(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getMountains();
  }, [searchTerm]);  // 검색어가 변경될 때마다 데이터를 다시 가져옴

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {mountains.length > 0 ? (
        mountains.map((mountain) => (
          <div key={mountain.frtrlId} className="border border-gray-300 rounded-2xl shadow-lg p-6 bg-white hover:bg-gray-50 transition duration-200 ease-in-out">
            <h3 className="text-xl font-bold text-green-600 mb-2">{mountain.frtrlNm}</h3>
            <p className="text-gray-700">
              <span className="font-semibold">주소:</span> {mountain.addrNm}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">고도:</span> {mountain.aslAltide}m
            </p>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">검색 결과가 없습니다.</div>
      )}
    </div>
  );
}
