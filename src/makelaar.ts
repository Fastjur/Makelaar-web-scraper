export type Makelaar = {
  name: string;
  url: string;
  scrapeUrl: string;
  debugResponseFile?: string;
  platformType: PlatformType;
};

export enum PlatformType {
  VanSilfhoutEnHogetoorn = "VanSilfhoutEnHogetoorn",
  VanDaalMakelaardij = "VanDaalMakelaardij",
}
