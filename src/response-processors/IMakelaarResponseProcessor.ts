import { IHuis } from "../Huis";
import { PlatformType } from "../makelaar";
import { VanSilfhoutEnHogetoornDomProcessor } from "./VanSilfhoutEnHogetoornDomProcessor";
import { RealtimeListingsJsonResponseProcessor } from "./RealtimeListingsJsonResponseProcessor";

export interface IMakelaarResponseProcessor {
  processDom(response: unknown, makelaarUrl: string): IHuis[];
}

export const makelaarResponseProcessors: Record<
  PlatformType,
  IMakelaarResponseProcessor
> = {
  VanSilfhoutEnHogetoorn: new VanSilfhoutEnHogetoornDomProcessor(),
  RealtimeListingsJson: new RealtimeListingsJsonResponseProcessor(),
};
