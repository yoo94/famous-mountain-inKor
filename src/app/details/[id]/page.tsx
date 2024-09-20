import { parseStringPromise } from 'xml2js';
import Image from 'next/image';
interface MountainDetailPageProps {
  params: { id: string };
}

interface XMLItem {
  mntnnm: string[];
  mntninfohght: string[];
  mntninfodscrt: string[];
  crcmrsghtnginfodscrt: string[];
  crcmrsghtnginfoetcdscrt: string[];
  pbtrninfodscrt: string[];
  mntnattchimageseq?: string[];
}

interface MountainDetail {
  name: string;
  height: string;
  description: string;
  lodgingInfo: string;
  courseInfo: string;
  transportationInfo: string;
  image: string | null;
}

interface XMLResponse {
  response: {
    body: [
      {
        items: [
          {
            item: XMLItem[];
          }
        ];
      }
    ];
  };
}
function decodeHTMLEntities(text: string): string {
  const entities: Record<string, string> = {
    '&lt;': '<',
    '&gt;': '>',
    '&amp;': '&',
    '&quot;': '"',
    '&#39;': "'",
    '&nbsp;': ' ',
  };

  // Use regex to match and replace known HTML entities
  return text.replace(/&[a-z]+;/g, (match) => entities[match] || match);
}
async function fetchMountainDetailData(frtrlNm: string): Promise<MountainDetail[]> {
  const serviceKey = process.env.NEXT_PUBLIC_API_KEY;
  const url = `http://openapi.forest.go.kr/openapi/service/trailInfoService/getforeststoryservice?serviceKey=${serviceKey}&mntnNm=${frtrlNm}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('데이터를 불러오는데 실패했습니다.');
  }

  const xmlText = await response.text();

  // Parse XML using xml2js
  const result: XMLResponse = await parseStringPromise(xmlText);

  // Extract relevant data from the XML
  const items = result.response.body[0].items[0].item;
  const mountainDetails: MountainDetail[] = items.map((item: XMLItem) => {
    const mountainName = decodeHTMLEntities(item.mntnnm[0]);
    const mountainDesc = decodeHTMLEntities(item.mntninfodscrt[0]);
    const lodgingInfo = decodeHTMLEntities(item.crcmrsghtnginfodscrt[0]);
    const courseInfo = decodeHTMLEntities(item.crcmrsghtnginfoetcdscrt[0]);
    const transportationInfo = decodeHTMLEntities(item.pbtrninfodscrt[0]);
    const height = item.mntninfohght[0];
    const mountainImage = item.mntnattchimageseq ? item.mntnattchimageseq[0] : null;

    return {
      name: mountainName,
      height: height,
      description: mountainDesc,
      lodgingInfo: lodgingInfo,
      courseInfo: courseInfo,
      transportationInfo: transportationInfo,
      image: mountainImage,
    };
  });

  return mountainDetails;
}

const MountainDetailsPage = async ({ params }: MountainDetailPageProps) => {
  const frtrlNm = params.id;
  const detailData: MountainDetail[] = await fetchMountainDetailData(frtrlNm);

  return (
    <div className="container mx-auto p-4">
      {detailData.map((detail, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg p-6 mb-8 border border-gray-300 text-green-950">
          {detail.image && (
            <div className="w-full h-64 overflow-hidden rounded-t-lg mb-4">
              <Image src={detail.image} alt={`${detail.name} 이미지`} width={100} height={300} className="object-cover w-full h-full" />
            </div>
          )}
          <h1 className="text-3xl font-bold mb-4 text-center">{detail.name}</h1>
          <p className="text-gray-600 mb-6 text-center">높이: {detail.height}m</p>

          {/* 산 설명 섹션 */}
          <div className="border-t border-gray-300 mt-4 pt-4">
            <h2 className="text-lg font-semibold mb-2">산 설명</h2>
            <p className="text-gray-700 whitespace-pre-line">{detail.description?.replace(/<BR>/g, '\n')}</p>
          </div>

          {/* 숙식 정보 섹션 */}
          <div className="border-t border-gray-300 mt-4 pt-4">
            <h2 className="text-lg font-semibold mb-2">숙식 정보</h2>
            <p className="text-gray-700 whitespace-pre-line">{detail.lodgingInfo?.replace(/<BR>/g, '\n')}</p>
          </div>

          {/* 추천 코스 섹션 */}
          <div className="border-t border-gray-300 mt-4 pt-4">
            <h2 className="text-lg font-semibold mb-2">추천 코스</h2>
            <p className="text-gray-700 whitespace-pre-line">{detail.courseInfo?.replace(/<BR>/g, '\n')}</p>
          </div>

          {/* 교통 정보 섹션 */}
          <div className="border-t border-gray-300 mt-4 pt-4">
            <h2 className="text-lg font-semibold mb-2">교통 정보</h2>
            <p className="text-gray-700 whitespace-pre-line">{detail.transportationInfo?.replace(/<BR>/g, '\n')}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MountainDetailsPage;
