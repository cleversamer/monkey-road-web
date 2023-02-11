import { io } from "socket.io-client";
import { serverURL } from "api/client";

const socket = io(serverURL);

socket.on("connect", () => {
  console.log("Connected");
});

export default socket;
