import { io } from "socket.io-client";
import { serverURL } from "v1/api/client";

const socket = io(serverURL);

export default socket;
