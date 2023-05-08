import {
  TableContainer,
  Table,
  Th,
  Tr,
  Thead,
  Tbody,
  Td,
  Checkbox,
} from "@chakra-ui/react";
import { TezosBlock } from "./types";

function TableTezosTxns(props: { data: TezosBlock[] }) {
  // const [count, setCount] = useState(0)

  return (
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
              <Tr key={i}>
                <Td>{b.blockLevel}</Td>
                <Td>{b.proposer}</Td>
                <Td>{b.timestamp}</Td>
                <Td>{b.numTnxsBlock}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default TableTezosTxns;
