// import { useState } from 'react'
import {
  Grid,
  Button,
  GridItem,
  Heading,
  Spacer,
  ButtonGroup,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import TableTezosTxns from "./TableTezosTxns";
import "./TezosDashboard.css";
import { TezosBlock } from "./types";
import {
  fetchNumTezosBlocks,
  fetchTezosBlocks,
  getNumTxnsInBlock,
} from "./requests";
import TxnsModal from "./TxnsModal";

const movePageBackwards = (currentPage: number, setCurrentPage: any) => () => {
  console.log("PageDOWN");
  setCurrentPage(currentPage + 1);
};

const movePageForwards = (currentPage: number, setCurrentPage: any) => () => {
  console.log("PageUP");
  setCurrentPage(currentPage - 1);
};

function TezosDashboard() {
  const MAX_NUMBER_ELEMENTS_PER_PAGE = 10;
  const [numBlocks, setNumBlocks] = useState<number>(0);
  const [blocks, setBlocks] = useState<TezosBlock[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedBlock, setSelectedBlock] = useState(0);
  const { onOpen, isOpen, onClose } = useDisclosure();

  const onOpenModal = (blockLevel: number) => {
    setSelectedBlock(blockLevel)
    onOpen();
  }

  useEffect(() => {
    //ComponentDidMount
    console.log("fetching data");
    fetchNumTezosBlocks().then((response1) => {
      setNumBlocks(response1.data-1);
      fetchTezosBlocks(
        response1.data - 1 - currentPage * MAX_NUMBER_ELEMENTS_PER_PAGE
      )
        .then((response) => {
          const blocksFetched: TezosBlock[] = response.data.map((b: any) => ({
            blockLevel: b.level,
            timestamp: b.timestamp,
            proposer: {
              alias: b.proposer?.alias,
              address: b.proposer?.address
            },
            numTnxsBlock: 0,
            hash: b.hash,
          }));
          const promises = blocksFetched.map(async (block: TezosBlock) => {
            return getNumTxnsInBlock(block.blockLevel);
          });
          Promise.allSettled(promises).then((settled) => {
            Promise.allSettled(
              settled.map((s: any, i) => {
                blocksFetched[i].numTnxsBlock = s.value.data;
              })
            ).then((s) => {
              console.log(blocksFetched)
              setBlocks(blocksFetched);
            });
          });
        })
        .catch((error) => console.error(error));
    });
  }, [currentPage]);

  return (
    <>
      <TxnsModal isOpen={isOpen} onClose={onClose} blockLevel={selectedBlock}/>
      <Grid templateColumns="repeat(3, 1fr)" gap={3} id="main">
        <GridItem rowSpan={2} colSpan={3} margin={"0px"}>
          <Heading as="h4" size="md">
            Tezos Blocks Viewer
          </Heading>
            Blocks in the table are clickable
        </GridItem>

        <GridItem
          rowSpan={2}
          colSpan={3}
          h={50 + 35 * MAX_NUMBER_ELEMENTS_PER_PAGE}
        >
          <TableTezosTxns data={blocks} onOpen={onOpenModal} />
        </GridItem>
        <GridItem w="100%" h="10">
          <Text>{`Showing ${
            numBlocks -
            blocks.length -
            MAX_NUMBER_ELEMENTS_PER_PAGE * currentPage
          } to ${
            numBlocks - MAX_NUMBER_ELEMENTS_PER_PAGE * currentPage
          } of ${numBlocks} results (current page: ${currentPage})`}</Text>
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
              isDisabled={currentPage === 0}
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
