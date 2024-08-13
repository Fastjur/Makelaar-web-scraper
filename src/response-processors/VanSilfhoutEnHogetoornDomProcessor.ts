import { IMakelaarResponseProcessor } from "./IMakelaarResponseProcessor";
import { JSDOM } from "jsdom";
import { Huis, IHuis } from "../Huis";

export class VanSilfhoutEnHogetoornDomProcessor
  implements IMakelaarResponseProcessor
{
  processDom(responseData: unknown): IHuis[] {
    if (typeof responseData !== "string") {
      console.error("Invalid response data");
      return [];
    }
    const dom = new JSDOM(responseData);

    const aanbod = dom.window.document.querySelector("[data-name='aanbod']");
    const items = aanbod?.querySelectorAll(".objectcontainer");
    if (!items) {
      console.warn("No items found");
      return [];
    }

    const houses: IHuis[] = [];

    items.forEach((item) => {
      const adresBlock = item.querySelector(".straatnaamwoonplaats");
      const straatnaamHuisnummer =
        adresBlock?.querySelector(".objecttitle")?.textContent;
      const plaats = adresBlock?.children.item(1)?.textContent;
      const vraagprijs = item
        .querySelector(".shortSpecs")
        ?.children.item(0)
        ?.textContent?.replace(/Vraagprijs: /g, "");
      const oppervlakte = item
        .querySelector(".shortSpecs")
        ?.children.item(1)
        ?.textContent?.replace(/Oppervlakte: /g, "");
      const kamers = item
        .querySelector(".shortSpecs")
        ?.children.item(2)
        ?.textContent?.replace(/Kamers: /g, "");
      const huisUrl = item
        .querySelector(".objectcontainerimg")
        ?.getAttribute("href");

      const huis: Huis = new Huis(
        straatnaamHuisnummer || "ONBEKEND",
        plaats || "ONBEKEND",
        vraagprijs || "ONBEKEND",
        oppervlakte || "ONBEKEND",
        kamers || "ONBEKEND",
        huisUrl || "ONBEKEND",
      );
      houses.push(huis);

      // Pretty print
      // console.log('---')
      // console.log(huis.formatForLogging())
      // console.log('---\n')
    });

    console.table(houses);

    return houses;
  }
}
