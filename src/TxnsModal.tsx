import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getTxnsInBlock } from "./requests";
import { TezosTransaction } from "./types";

const handleMoveBack = (selectedTnx: any, setSelectedTnx: any) => {
  if (selectedTnx > 1) {
    setSelectedTnx(selectedTnx - 1);
  }
};

const handleMoveAhead = (
  selectedTnx: any,
  setSelectedTnx: any,
  maxTnxs: number
) => {
  if (selectedTnx < maxTnxs) {
    setSelectedTnx(selectedTnx + 1);
  }
};

function TxnsModal(props: { isOpen: any; onClose: any; blockLevel: number }) {
  const [txnsPerBlock, setTxnsPerBlock] = useState<TezosTransaction[]>([]);
  const [selectedTnx, setSelectedTnx] = useState<number>(1);

  useEffect(() => {
    if (props.isOpen) {
      getTxnsInBlock(props.blockLevel).then((resp) => {
        const tnxs: TezosTransaction[] = resp.data.map((tnx: any) => ({
          sender: {
            alias: tnx.sender?.alias,
            address: tnx.sender?.address
          },
          target: {
            alias: tnx.target?.alias,
            address: tnx.target?.address
          },
          amount: tnx.amount,
          status: tnx.status,
        }));
        setTxnsPerBlock(tnxs);
        console.log(tnxs);
        setSelectedTnx(1);
      });
    }
  }, [props.isOpen]);
  return (
    <>
      <Modal size="xl" isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Transactions on block with level {props.blockLevel} ({selectedTnx}{" "}
            of {txnsPerBlock.length})
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text as='kbd' style={{ height: "300px" }} size="lg">
              {JSON.stringify(txnsPerBlock[selectedTnx - 1], null, "\t")}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={props.onClose}>
              Close
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleMoveBack(selectedTnx, setSelectedTnx)}
            >
              {"<"}
            </Button>
            <Button
              variant="ghost"
              onClick={() =>
                handleMoveAhead(
                  selectedTnx,
                  setSelectedTnx,
                  txnsPerBlock.length
                )
              }
            >
              {">"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default TxnsModal;
