import axios, { AxiosResponse } from "axios";

export async function fetchTezosBlocks(
  lastBlockToFetch: number,
  limit: number = 10
): Promise<AxiosResponse<any>> {
  try {
    console.log('entra', lastBlockToFetch, limit)
    const response: AxiosResponse = await axios.get(
      `https://api.tzkt.io/v1/blocks?level.ge=${lastBlockToFetch-10}&level.le=${lastBlockToFetch}`
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchNumTezosBlocks(
  ): Promise<AxiosResponse<any>> {
    try {
      const response: AxiosResponse = await axios.get(
        'https://api.tzkt.io/v1/blocks/count'
      );
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
