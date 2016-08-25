export interface CoCacheStatisticsDto {
  size?:number;
  localDiskSize?:number;
  putCount?:number;
  addedCount?:number;
  updatedCount?:number;
  removedCount?:number;
  expiredCount?:number;
}

export interface CoCacheManagerInformationDto {
  name?:string;
  status?:string;
  clusterUUID?:string;
  statistics?:CoCacheStatisticsDto;
}

