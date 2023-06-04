/* eslint-disable import/no-extraneous-dependencies */
import request from '@/service/request';
import { AxiosPromise } from 'axios';

export type ISongListTypeResponse = {
  code: number;
  all: {
    name: string;
    resourceCount: number;
    imgId: number;
    imgUrl: object;
    type: number;
    category: number;
    resourceType: number;
    hot: boolean;
    activity: boolean;
  };
  sub: {
    name: string;
    resourceCount: number;
    imgId: number;
    imgUrl: object;
    type: number;
    category: number;
    resourceType: number;
    hot: boolean;
    activity: boolean;
  }[];
  categories: { 0: string; 1: string; 2: string; 3: string; 4: string };
};

export const getSongListType = () =>
  <AxiosPromise<ISongListTypeResponse>>request.get('/playlist/catlist');
// request.get('/playlist/catlist') as AxiosPromise<ISongListTypeResponse>;

interface IGetTopPlaylistParams {
  order?: 'new' | 'hot';
  cat?: string;
  limit?: number;
  offset?: number;
}

type IGetTopPlaylistResponse = {
  playlists: {
    name: string;
    id: number;
    trackNumberUpdateTime: number;
    status: number;
    userId: number;
    createTime: number;
    updateTime: number;
    subscribedCount: number;
    trackCount: number;
    cloudTrackCount: number;
    coverImgUrl: string;
    coverImgId: number;
    description: string;
    tags: string[];
    playCount: number;
    trackUpdateTime: number;
    specialType: number;
    totalDuration: number;
    creator: {
      defaultAvatar: boolean;
      province: number;
      authStatus: number;
      followed: boolean;
      avatarUrl: string;
      accountStatus: number;
      gender: number;
      city: number;
      birthday: number;
      userId: number;
      userType: number;
      nickname: string;
      signature: string;
      description: string;
      detailDescription: string;
      avatarImgId: number;
      backgroundImgId: number;
      backgroundUrl: string;
      authority: number;
      mutual: boolean;
      expertTags: object;
      experts: object;
      djStatus: number;
      vipType: number;
      remarkName: object;
      authenticationTypes: number;
      avatarDetail: object;
      anchor: boolean;
      avatarImgIdStr: string;
      backgroundImgIdStr: string;
      avatarImgId_str: string;
    };
    tracks: object;
    subscribers: {
      defaultAvatar: boolean;
      province: number;
      authStatus: number;
      followed: boolean;
      avatarUrl: string;
      accountStatus: number;
      gender: number;
      city: number;
      birthday: number;
      userId: number;
      userType: number;
      nickname: string;
      signature: string;
      description: string;
      detailDescription: string;
      avatarImgId: number;
      backgroundImgId: number;
      backgroundUrl: string;
      authority: number;
      mutual: boolean;
      expertTags: object;
      experts: object;
      djStatus: number;
      vipType: number;
      remarkName: object;
      authenticationTypes: number;
      avatarDetail: object;
      anchor: boolean;
      avatarImgIdStr: string;
      backgroundImgIdStr: string;
      avatarImgId_str: string;
    }[];
    subscribed: boolean;
    commentThreadId: string;
    newImported: boolean;
    adType: number;
    highQuality: boolean;
    privacy: number;
    ordered: boolean;
    anonimous: boolean;
    coverStatus: number;
    recommendInfo: object;
    socialPlaylistCover: object;
    recommendText: object;
    coverText: object;
    relateResType: object;
    relateResId: object;
    shareCount: number;
    coverImgId_str: string;
    alg: string;
    commentCount: number;
  }[];
  total: number;
  code: number;
  more: boolean;
  cat: string;
};
export const getTopPlaylist = async (params?: IGetTopPlaylistParams) => {
  const res = request.get('/top/playlist', {
    params,
  }) as AxiosPromise<IGetTopPlaylistResponse>;
  return (await res).data.playlists;
};
