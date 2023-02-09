import { io } from "socket.io-client";
import { serverURL } from "api/client";

const socket = io(serverURL);

export default socket;
