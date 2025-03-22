import { OptionType, OptionData } from "./types";
import axios from "axios";

export async function fetchOptions(
  optionType: OptionType
): Promise<OptionData[]> {
  const response = await axios.get(`http://localhost:3030/${optionType}`);
  return response.data;
}

export async function fetchOrderNumber(): Promise<number> {
  const response = await axios.post("http://localhost:3030/order");
  return response.data.orderNumber;
}
