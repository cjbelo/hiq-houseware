import { v4 as uuid } from "uuid";

const descriptions = [
  "GARTERIZE SMALL KURONA",
  "GARTERIZE SMALL PLAIN",
  "STRAINER",
  "SMALL GARTERIZE LACK",
  "TOKUKO FRYING TURNER #1",
  "SOUP SHELL",
  "CASSEROLE POT / DH",
  "BILAO",
  "ALUMINUM PLATE",
  "TABO C/A",
];

const getRandomNumber = (n: number) => {
  return Math.floor(Math.random() * n);
};

let x = [];
for (let i = 0; i < 30; i++) {
  const rand = getRandomNumber(10);
  const rand2 = getRandomNumber(1000);
  let tmp = {
    id: uuid(),
    stockNumber: String(rand2).padStart(4, "0"),
    supplierCode: `J-${String(rand2).padStart(4, "0")}`,
    description: descriptions[rand],
    catCode: "LOCAL",
    deptCode: "DEPTCODE",
    markUp: Number(`2.${rand}`),
  };
  x.push(tmp);
}

export const data = x;
