import { IMakelaarResponseProcessor } from "./IMakelaarResponseProcessor";
import { Huis, IHuis } from "../Huis";

type RealtimeListingsJsonHouseResponse = {
  address: string;
  city: string;
  price: string;
  livingSurface: number;
  rooms: number;
  bedrooms: number;
  url: string;
  photo: string;
  statusOrig: string;
  isSales: boolean;
  salesPrice: number;
};

function isRealtimeListingsJsonHouseResponse(
  obj: unknown,
): obj is RealtimeListingsJsonHouseResponse {
  if (typeof obj !== "object" || obj == null) {
    return false;
  }
  return (
    "address" in obj &&
    typeof obj.address === "string" &&
    "city" in obj &&
    typeof obj.city === "string" &&
    "price" in obj &&
    typeof obj.price === "string" &&
    "livingSurface" in obj &&
    typeof obj.livingSurface === "number" &&
    "rooms" in obj &&
    typeof obj.rooms === "number" &&
    "bedrooms" in obj &&
    typeof obj.bedrooms === "number" &&
    "url" in obj &&
    typeof obj.url === "string" &&
    "photo" in obj &&
    typeof obj.photo === "string" &&
    "statusOrig" in obj &&
    typeof obj.statusOrig === "string" &&
    "isSales" in obj &&
    typeof obj.isSales === "boolean" &&
    "salesPrice" in obj &&
    typeof obj.salesPrice === "number"
  );
}

export class RealtimeListingsJsonResponseProcessor
  implements IMakelaarResponseProcessor
{
  private isWithinOurCriteria(
    response: RealtimeListingsJsonHouseResponse,
  ): boolean {
    return (
      response.city === "Delft" &&
      response.isSales &&
      response.salesPrice <= 435000 &&
      response.bedrooms >= 2 &&
      response.livingSurface >= 68 &&
      response.statusOrig !== "sold"
    );
  }

  processDom(responseData: unknown, makelaarUrl: string): IHuis[] {
    if (!Array.isArray(responseData)) {
      console.error("Invalid response data", responseData);
      return [];
    }
    const houses: IHuis[] = responseData
      .filter(isRealtimeListingsJsonHouseResponse)
      .filter(this.isWithinOurCriteria.bind(this))
      .map((response: RealtimeListingsJsonHouseResponse) => {
        return new Huis(
          response.address,
          response.city,
          response.price.replace("&euro;", "€"),
          `${response.livingSurface} m²`,
          response.rooms.toString(),
          new URL(response.url, makelaarUrl).href,
        );
      });

    console.table(houses);

    return houses;
  }
}
