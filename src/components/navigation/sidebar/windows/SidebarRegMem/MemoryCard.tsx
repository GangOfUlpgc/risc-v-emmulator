import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { rv32i } from "../../../../../cpus/riscv-rv32i";

const colors: { [state: string]: string } = {
  fetch: "yellow.100",
  decode: "blue.100",
  execute: "green.100",
  memory: "purple.100",
  writeback: "pink.100",
  idle: "transparent",
};

interface props {
  address: number;
}

function MemoryCardElement({ address }: props) {
  const rom = rv32i.useMem((state) => state.rom);
  const pc = rv32i.useMem((state) => state.pc);
  const value = rom[address]?.value | 0;
  const status = getStatus();

  function getStatus() {
    if (pc == address) return "fetch";
    if (pc == address + 4) return "decode";
    if (pc == address + 8) return "execute";
    if (pc == address + 12) return "memory";
    if (pc == address + 16) return "writeback";
    return "idle";
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      minW="6rem"
      flexGrow="1"
      backgroundColor={colors[status]}
    >
      <Text
        textAlign="center"
        flexBasis="50%"
        textColor="gray.600"
        fontWeight="semibold"
      >
        0x{address.toString(16).padStart(8, "0")}
      </Text>
      <Text
        textAlign="center"
        flexBasis="50%"
        textColor="gray.600"
        fontWeight="semibold"
      >
        {value ? "0x" + value.toString(16).padStart(8, "0") : "0x00000000"}
      </Text>
    </Box>
  );
}

export default function MemoryCard() {
  const [items, setItems] = useState(Array.from({ length: 70 }));
  const showMoreAddress = () => {
    setItems((prevItems) => prevItems.concat(Array.from({ length: 20 })));
  };

  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      gap="4"
      bgColor="white"
      px="1"
      borderRadius="xl"
      py="1"
      mx="2"
      mb="3"
    >
      <Box
        display="flex"
        justifyContent="center"
        minW="6rem"
        py="0.1rem"
        bgColor="gray.100"
        px="4"
        mx="1"
        my="2"
        fontWeight="semibold"
        borderRadius="lg"
        flexGrow="1"
      >
        <Text textAlign="center" flexBasis="50%" textColor="gray.600">
          Address
        </Text>
        <Text textAlign="center" flexBasis="50%" textColor="gray.600">
          Instruction
        </Text>
      </Box>
      <Box
        id="registerContainer"
        display="flex"
        flexDirection="column"
        overflow="auto"
      >
        <InfiniteScroll
          scrollableTarget="registerContainer"
          dataLength={items.length}
          next={showMoreAddress}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {items.map((item, index) => (
            <MemoryCardElement key={index} address={index * 4} />
          ))}
        </InfiniteScroll>
      </Box>
    </Box>
  );
}
