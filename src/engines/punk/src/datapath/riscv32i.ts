import { Edge, Node, Position } from "reactflow";

const nodes: Node[] = [
  {
    id: "muxAlu",
    position: { x: 750, y: 300 },
    type:"mux",
    data: { label: "MUX" },
  },
  {
    id: "muxWb",
    position: { x: 1600, y: 500 },
    type:"mux",
    data: { label: "MUX" },
  },
  {
    id: "muxPc",
    position: { x: -400, y: 300 },
    type:"mux",
    data: { label: "MUX" },
  },
  {
    id: "adder",
    type: "adder",
    position: { x: -100, y: -100 },
    data: { label: "Add" },
  },
  {
    id: "adderIdex",
    type: "adder",
    position: { x: 800, y: 50 },
    data: { label: "Add" },
  },
  {
    id: "pc",
    position: { x: -250, y: 250 },
    type: "pc",
    data: { label: "PC" },
  },
  {
    id: "alu",
    type: "alu",
    position: { x: 900, y: 225 },
    data: { label: "Alu" },
  },
  {
    id: "dataMemory",
    type: "datamem",
    position: { x: 1200, y: 250 },
    data: { label: "DataMem" },
  },
  {
    id: "registers",
    type: "registers",
    position: { x: 300, y: 200 },
    data: { label: "registers" },
  },
  
  {
    id: "instructionMemory",
    type: "instrMemory",
    position: {x: -100, y: 250},
    data: {label: "Instruction Memory"},
  },
  {
    id: "ifid",
    type: "bufferifid",
    position: {x: 50, y: 100},
    data: {label: "buffer if/id"},
  },
  {
    id: "idex",
    type: "bufferidex",
    position: {x: 500, y: 100},
    data: {label: "buffer id/ex"},
  },
  {
    id: "exmem",
    type: "bufferexmem",
    position: {x: 1000, y: 100},
    data: {label: "buffer ex/mem"},
  },
  {
    id: "memwb",
    type: "buffermemwb",
    position: {x: 1400, y: 100},
    data: {label: "buffer mem/wb"},
  },


];
const edges: Edge[] = [
  { id: "e1-1", source: "pc", target: "instructionMemory", label: "0x00000000", sourceHandle:"output", targetHandle: "address" },
  { id: "e1-2", source: "pc", target: "adder", sourceHandle:"output", targetHandle: "input1" },
  { id: "e1-3", source: "pc", target: "ifid", sourceHandle:"output", targetHandle: "input1" },
  { id: "e1-4", source: "adder", target: "muxPc", sourceHandle:"output", targetHandle: "input1" },
  { id: "e1-5", source: "muxPc", target: "pc", sourceHandle:"output", targetHandle: "input" },
  { id: "e1-6", source: "instructionMemory", target: "ifid", sourceHandle:"readInstr", targetHandle: "input2" },

  { id: "e2-1", source: "ifid", target: "registers", sourceHandle:"output2", targetHandle: "readReg1"},
  { id: "e2-2", source: "ifid", target: "registers", sourceHandle:"output2", targetHandle: "readReg2"},
  { id: "e2-3", source: "ifid", target: "idex", sourceHandle:"output1", targetHandle: "input1"},
  { id: "e2-4", source: "ifid", target: "idex", sourceHandle:"output2", targetHandle: "input5", label: "instruction"},
  { id: "e2-5", source: "ifid", target: "idex", sourceHandle:"output2", targetHandle: "input4"},
  { id: "e2-6", source: "registers", target: "idex", sourceHandle:"readData1", targetHandle: "input2"},
  { id: "e2-7", source: "registers", target: "idex", sourceHandle:"readData2", targetHandle: "input3"},

  {id: "e3-1", source: "idex", target: "alu", sourceHandle:"output2", targetHandle: "input1"},
  {id: "e3-4", source: "idex", target: "adderIdex", sourceHandle: "output1", targetHandle: "input1"},
  {id: "e3-2", source: "idex", target: "muxAlu", sourceHandle:"output3", targetHandle: "input1"},
  {id: "e3-3", source: "idex", target: "exmem", sourceHandle:"output3", targetHandle: "input3"},
  {id: "e3-4", source: "idex", target: "muxAlu", sourceHandle:"output4", targetHandle: "input2"},
  {id: "e3-5", source: "idex", target: "adderIdex", sourceHandle:"output4", targetHandle: "input2"},
  {id: "e3-6", source: "muxAlu", target: "alu", sourceHandle: "output", targetHandle: "input2"},
  {id: "e3-7", source: "alu", target: "exmem", sourceHandle: "output", targetHandle: "input2"},
  {id: "e3-8", source: "adderIdex", target: "exmem", sourceHandle: "output", targetHandle: "input1"},
  {id: "e3-9", source: "idex", target: "exmem", sourceHandle: "output5", targetHandle: "input4"},
  
  {id: "e4-1", source: "exmem", target: "muxPc", sourceHandle: "output1", targetHandle: "input2"},
  {id: "e4-2", source: "exmem", target: "dataMemory", sourceHandle: "output2", targetHandle: "address"},
  {id: "e4-3", source: "exmem", target: "dataMemory", sourceHandle: "output3", targetHandle: "writeData"},
  {id: "e4-5", source: "exmem", target: "memwb", sourceHandle: "output2", targetHandle: "input2"},
  {id: "e4-6", source: "exmem", target: "memwb", sourceHandle: "output4", targetHandle: "input3"},
  {id: "e4-7", source: "dataMemory", target: "memwb", sourceHandle: "readData", targetHandle: "input1"},
  
  {id: "e5-1", source: "memwb", target: "muxWb", sourceHandle: "output1", targetHandle: "input1"},
  {id: "e5-2", source: "memwb", target: "muxWb", sourceHandle: "output2", targetHandle: "input2"},
  {id: "e5-3", source: "memwb", target: "registers", sourceHandle: "output3", targetHandle: "writeReg"},
  {id: "e5-4", source: "muxWb", target: "registers", sourceHandle: "output", targetHandle: "writeData", label: "WB Data"},
];

export default {
  nodes,
  edges,
};
