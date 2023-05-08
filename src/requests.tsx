import axios, { AxiosResponse } from "axios";

export async function fetchTezosBlocks(
  lastBlockToFetch: number
): Promise<AxiosResponse<any>> {
  try {
    const response: AxiosResponse = await axios.get(
      `https://api.tzkt.io/v1/blocks?level.ge=${
        lastBlockToFetch - 10
      }&level.le=${lastBlockToFetch}`
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchNumTezosBlocks(): Promise<AxiosResponse<any>> {
  try {
    const response: AxiosResponse = await axios.get(
      "https://api.tzkt.io/v1/blocks/count"
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getNumTxnsInBlock(level: number): Promise<AxiosResponse<any>> {
    try {
      const response: AxiosResponse = await axios.get(
        `https://api.tzkt.io/v1/operations/transactions/count?level=${level}`
      );
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }