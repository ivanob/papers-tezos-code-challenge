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
import { fetchNumTezosBlocks, fetchTezosBlocks } from "./requests";

const movePageBackwards = (currentPage: number, setCurrentPage: any) => () => {
  console.log('DOWN')
  setCurrentPage(currentPage+1)
  // loadData(numBlocks-currentPage*MAX_NUMBER_ELEMENTS_PER_PAGE)
}

const movePageForwards = (currentPage: number, setCurrentPage: any) => () => {
  console.log('UP')
  setCurrentPage(currentPage-1)
  // loadData(numBlocks-currentPage*MAX_NUMBER_ELEMENTS_PER_PAGE)
}

function TezosDashboard() {
  const MAX_NUMBER_ELEMENTS_PER_PAGE = 10;
  const [numBlocks, setNumBlocks] = useState<number>(0);
  const [blocks, setBlocks] = useState<TezosBlock[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  // const [count, setCount] = useState(0)
  useEffect(() => { //ComponentDidMount
    console.log("load data");
    fetchNumTezosBlocks().then((response1) => {
      setNumBlocks(response1.data)
      console.log(response1.data)
      fetchTezosBlocks(response1.data - currentPage*MAX_NUMBER_ELEMENTS_PER_PAGE).then((response) => {
        const blocksFetched: TezosBlock[] = response.data.map((b: any) => ({
          blockLevel: b.level,
          timestamp: b.timestamp,
          proposer: b.proposer?.alias,
          numTnxsBlock: 0,
          hash: b.hash
        }));
        console.log(blocksFetched)
        setBlocks(blocksFetched);
      })
      .catch((error) => console.error(error));
    })
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
          h={50 + 35 * MAX_NUMBER_ELEMENTS_PER_PAGE}
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
