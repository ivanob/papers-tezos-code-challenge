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

function TableTezosTxns() {
  // const [count, setCount] = useState(0)

  return (
    <>
       <Grid templateColumns="repeat(3, 1fr)" gap={3} id="main">
      <GridItem rowSpan={2} colSpan={3} margin={"0px"}>
        <Heading as="h4" size="md">
          Meetings
        </Heading>
      </GridItem>
      
      <GridItem
        rowSpan={2}
        colSpan={3}
        h={90}
      >
        {/* <TableMeetings
          data={getDisplayableData(data, pagination)[0]}
          selectHandler={selectMeeting}
        /> */}
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

export default TableTezosTxns
