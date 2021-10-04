import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("Investment")
export class Investment {

    @JsonProperty("id", String)
    id: string = "";

    @JsonProperty("title", String)
    title: string = "";

    @JsonProperty("city", String)
    city: string = "";

    @JsonProperty("ppi", String)
    ppi: string = "";
    
    @JsonProperty("school", String)
    school: string = "";

    @JsonProperty("uai", String)
    uai: string = "";

    @JsonProperty("progressState", String)
    progressState: string = "";

    @JsonProperty("company", String, true)
    company: string = "";

    @JsonProperty("deliveryYear", String, true)
    deliveryYear: string = "";

    @JsonProperty("individualizationYear", String, true)
    individualizationYear: string = "";

    @JsonProperty("representative", String, true)
    representative: string = "";

    @JsonProperty("marketNotification", String, true)
    marketNotification: string = "";

    @JsonProperty("lotsNumber", Number, true)
    lotsNumber: string = "";

    @JsonProperty("longitude", Number, true)
    longitude: number = NaN;

    @JsonProperty("latitude", Number, true)
    latitude: number = NaN;
    
}