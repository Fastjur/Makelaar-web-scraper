export interface HuisDTO {
  straatnaamHuisnummer: string;
  plaats: string;
  vraagprijs: string;
  oppervlakte: string;
  kamers: string;
  url: string;
}

export function isHuisDTO(obj: unknown): obj is HuisDTO {
  if (!(typeof obj === "object") || obj == null) {
    return false;
  }
  return (
    "straatnaamHuisnummer" in obj &&
    typeof obj.straatnaamHuisnummer === "string" &&
    "plaats" in obj &&
    typeof obj.plaats === "string" &&
    "vraagprijs" in obj &&
    typeof obj.vraagprijs === "string" &&
    "oppervlakte" in obj &&
    typeof obj.oppervlakte === "string" &&
    "kamers" in obj &&
    typeof obj.kamers === "string" &&
    "url" in obj &&
    typeof obj.url === "string"
  );
}

export interface IHuis extends HuisDTO {
  formatForLogging(): string;
  formatForTelegram(): string;
}

export class Huis implements IHuis {
  straatnaamHuisnummer: string;
  plaats: string;
  vraagprijs: string;
  oppervlakte: string;
  kamers: string;
  url: string;

  constructor(
    straatnaamHuisnummer: string,
    plaats: string,
    vraagprijs: string,
    oppervlakte: string,
    kamers: string,
    url: string,
  ) {
    this.straatnaamHuisnummer = straatnaamHuisnummer;
    this.plaats = plaats;
    this.vraagprijs = vraagprijs;
    this.oppervlakte = oppervlakte;
    this.kamers = kamers;
    this.url = url;
  }

  formatForLogging(): string {
    return `Adres: ${this.straatnaamHuisnummer}
Plaats: ${this.plaats}
Vraagprijs: ${this.vraagprijs}
Oppervlakte: ${this.oppervlakte}
Kamers: ${this.kamers}
URL: ${this.url}`;
  }

  formatForTelegram(): string {
    return `Adres: ${this.straatnaamHuisnummer}, ${this.plaats}
Plaats: ${this.plaats}
Vraagprijs: ${this.vraagprijs}
Oppervlakte: ${this.oppervlakte}
Kamers: ${this.kamers}
URL: ${this.url}`;
  }
}
