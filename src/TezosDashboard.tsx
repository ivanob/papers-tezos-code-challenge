// import { useState } from 'react'
import {
  Grid,
  Button,
  GridItem,
  Heading,
  Spacer,
  ButtonGroup,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import TableTezosTxns from "./TableTezosTxns";
import "./TezosDashboard.css";
import { TezosBlock } from "./types";
import axios from 'axios';

const initializeData = (): TezosBlock[] => {
  return [
    {
      blockLevel: 1,
      proposer: "abc",
      timestamp: "2023-05-05T16:32:36Z",
      numTnxsBlock: 5,
    },
    {
      blockLevel: 2,
      proposer: "abc",
      timestamp: "2023-05-05T16:32:36Z",
      numTnxsBlock: 5,
    },
    {
      blockLevel: 3,
      proposer: "abc",
      timestamp: "2023-05-05T16:32:36Z",
      numTnxsBlock: 5,
    },
    {
      blockLevel: 4,
      proposer: "abc",
      timestamp: "2023-05-05T16:32:36Z",
      numTnxsBlock: 5,
    },
    {
      blockLevel: 5,
      proposer: "abc",
      timestamp: "2023-05-05T16:32:36Z",
      numTnxsBlock: 5,
    },
    {
      blockLevel: 6,
      proposer: "abc",
      timestamp: "2023-05-05T16:32:36Z",
      numTnxsBlock: 5,
    },
    {
      blockLevel: 7,
      proposer: "abc",
      timestamp: "2023-05-05T16:32:36Z",
      numTnxsBlock: 5,
    },
    {
      blockLevel: 8,
      proposer: "abc",
      timestamp: "2023-05-05T16:32:36Z",
      numTnxsBlock: 5,
    },
    {
      blockLevel: 9,
      proposer: "abc",
      timestamp: "2023-05-05T16:32:36Z",
      numTnxsBlock: 5,
    },
    {
      blockLevel: 10,
      proposer: "abc",
      timestamp: "2023-05-05T16:32:36Z",
      numTnxsBlock: 5,
    },
  ];
};

const getNumBlocks = async (setNumBlocks: any): Promise<void> => {
  const num = await axios.get('https://api.tzkt.io/v1/blocks/count')
  setNumBlocks(num.data)
};

const movePageBackwards = (currentPage: number, setCurrentPage: any) => () => {
  console.log('DOWN')
  setCurrentPage(currentPage+1)
}

const movePageForwards = (currentPage: number, setCurrentPage: any) => () => {
  console.log('UP')
  setCurrentPage(currentPage-1)
}

function TezosDashboard() {
  const MAX_NUMBER_ELEMENTS_PER_PAGE = 10;
  const [blocks] = useState<TezosBlock[]>(initializeData());
  const [numBlocks, setNumBlocks] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  // const [count, setCount] = useState(0)
  useEffect(() => {
    // Fetch data from API or any other source
    // fetch("https://example.com/data")
    //   .then((response) => response.json())
    //   .then((data) => setData(data))
    //   .catch((error) => console.log(error));
    console.log("load data");
    getNumBlocks(setNumBlocks);
  }, []);

  return (
    <>
      <Grid templateColumns="repeat(3, 1fr)" gap={3} id="main">
        <GridItem rowSpan={2} colSpan={3} margin={"0px"}>
          <Heading as="h4" size="md">
            Tezos Blocks
          </Heading>
        </GridItem>

        <GridItem
          rowSpan={2}
          colSpan={3}
          h={20 + 35 * MAX_NUMBER_ELEMENTS_PER_PAGE}
        >
          <TableTezosTxns data={blocks} />
        </GridItem>
        <GridItem w="100%" h="10">
          <Text>{`Showing ${(numBlocks-blocks.length)-MAX_NUMBER_ELEMENTS_PER_PAGE*currentPage} to ${numBlocks-MAX_NUMBER_ELEMENTS_PER_PAGE*currentPage} of ${numBlocks} results (current page: ${currentPage})`}</Text>
        </GridItem>
        <Spacer />
        <GridItem w="100%" h="10">
          <ButtonGroup variant="outline" spacing="6" float={"right"}>
            <Button
              size="sm"
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              onClick={movePageBackwards(currentPage, setCurrentPage)}
              isDisabled={false}
            >
              Previous
            </Button>
            <Button
              size="sm"
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              onClick={movePageForwards(currentPage, setCurrentPage)}
              isDisabled={currentPage===0}
            >
              Next
            </Button>
          </ButtonGroup>
        </GridItem>
      </Grid>
    </>
  );
}

export default TezosDashboard;
