import {
  TableContainer,
  Table,
  Th,
  Tr,
  Thead,
  Tbody,
  Td,
  Box
} from "@chakra-ui/react";
import { TezosBlock } from "./types";

function TableTezosTxns(props: { data: TezosBlock[], onOpen: any }) {
  return (
    <>
    <TableContainer>
      <Table size="sm" variant="striped" className="table-meetings">
        <Thead>
          <Tr>
            <Th>Block level</Th>
            <Th>Proposer</Th>
            <Th>Timestamp</Th>
            <Th>Num transactions in block</Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.data.map((b: TezosBlock, i: number) => {
            return (
              <Box as="tr" key={i} onClick={() => props.onOpen(b.blockLevel)} cursor="pointer">
                <Td>{b.blockLevel}</Td>
                <Td>{b.proposer.alias} ({b.proposer.address})</Td>
                <Td>{b.timestamp}</Td>
                <Td>{b.numTnxsBlock}</Td>
              </Box>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
    </>
  );
}

export default TableTezosTxns;
