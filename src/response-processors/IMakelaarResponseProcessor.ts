import { IHuis } from "../Huis";
import { PlatformType } from "../makelaar";
import { VanSilfhoutEnHogetoornDomProcessor } from "./VanSilfhoutEnHogetoornDomProcessor";
import { VanDaalMakelaardijDomProcessor } from "./VanDaalMakelaardijDomProcessor";

export interface IMakelaarResponseProcessor {
  processDom(response: unknown): IHuis[];
}

export const makelaarResponseProcessors: Record<
  PlatformType,
  IMakelaarResponseProcessor
> = {
  VanSilfhoutEnHogetoorn: new VanSilfhoutEnHogetoornDomProcessor(),
  VanDaalMakelaardij: new VanDaalMakelaardijDomProcessor(),
};
