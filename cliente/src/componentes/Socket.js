//inicializacion del socket en el area de cliente
import io from "socket.io-client";

let socket = io("//localhost:5000");

export default socket;
