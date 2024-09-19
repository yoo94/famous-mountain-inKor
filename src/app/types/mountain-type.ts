export type MountainData = {
  frtrlId: string;
  frtrlNm: string;
  mtnCd: string;
  ctpvNm: string;
  addrNm: string;
  lat: number;
  lot: number;
  aslAltide: number;
  crtrDt: string;
};

export type SearchMountainProps = {
  onSearch: (searchTerm: string, searchBy: 'name' | 'city') => void;
};