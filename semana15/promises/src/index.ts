import { setTimeout } from "timers";

const printMsgAfterTime = (time: number, msg: string) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log(msg);
      resolve();
    }, time);
  });
};

const main = async () => {
  await printMsgAfterTime(5000, "oi");
};

main();
