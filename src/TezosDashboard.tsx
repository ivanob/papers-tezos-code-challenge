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

const initializeData = (): TezosBlock[] => {
  return [{
    blockLevel: 1,
    proposer: 'abc',
    timestamp: '2023-05-05T16:32:36Z',
    numTnxsBlock: 5
  },
  {
    blockLevel: 2,
    proposer: 'abc',
    timestamp: '2023-05-05T16:32:36Z',
    numTnxsBlock: 5
  },
  {
    blockLevel: 3,
    proposer: 'abc',
    timestamp: '2023-05-05T16:32:36Z',
    numTnxsBlock: 5
  },
  {
    blockLevel: 4,
    proposer: 'abc',
    timestamp: '2023-05-05T16:32:36Z',
    numTnxsBlock: 5
  },
  {
    blockLevel: 5,
    proposer: 'abc',
    timestamp: '2023-05-05T16:32:36Z',
    numTnxsBlock: 5
  },
  {
    blockLevel: 6,
    proposer: 'abc',
    timestamp: '2023-05-05T16:32:36Z',
    numTnxsBlock: 5
  },
  {
    blockLevel: 7,
    proposer: 'abc',
    timestamp: '2023-05-05T16:32:36Z',
    numTnxsBlock: 5
  },
  {
    blockLevel: 8,
    proposer: 'abc',
    timestamp: '2023-05-05T16:32:36Z',
    numTnxsBlock: 5
  },
  {
    blockLevel: 9,
    proposer: 'abc',
    timestamp: '2023-05-05T16:32:36Z',
    numTnxsBlock: 5
  },
  {
    blockLevel: 10,
    proposer: 'abc',
    timestamp: '2023-05-05T16:32:36Z',
    numTnxsBlock: 5
  }]
}

const MAX_NUMBER_ELEMENTS_PER_PAGE = 10;

function TezosDashboard() {
  const [blocks] = useState<TezosBlock[]>(initializeData());
  // const [count, setCount] = useState(0)
  useEffect(() => {
    // Fetch data from API or any other source
    // fetch("https://example.com/data")
    //   .then((response) => response.json())
    //   .then((data) => setData(data))
    //   .catch((error) => console.log(error));
    console.log('load data')
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
        <TableTezosTxns data={blocks}/>
      </GridItem>
      <GridItem w="100%" h="10">
        <Text>{`Showing ${0} to ${
          0
        } of ${0} results`}</Text>
      </GridItem>
      <Spacer />
      <GridItem w="100%" h="10">
        <ButtonGroup variant="outline" spacing="6" float={"right"}>
          <Button
            size="sm"
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onClick={()=>{}}
            isDisabled={false}
          >
            Previous
          </Button>
          <Button
            size="sm"
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onClick={()=>{}}
            isDisabled={
              false
            }
          >
            Next
          </Button>
        </ButtonGroup>
      </GridItem>
    </Grid>
    </>
  )
}

export default TezosDashboard
