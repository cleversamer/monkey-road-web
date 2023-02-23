import { io } from "socket.io-client";
import { serverURL } from "v2/api/client";

const socket = io(serverURL);

export default socket;
