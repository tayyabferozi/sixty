
import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";

export const HubService = {
    Build,
    Get,
    Close
};

export const connection = new HubConnectionBuilder();

function Build() {
    return connection
        .withUrl("https://localhost:5001/hubs/Cal")
        .build();
}

function Get() {
    // Check if connection is started
    if (connection.connectionState == 0) {
        // Start connection
        connection
            .start({ withCredentials: false })
            .catch(err => alert(err.toString()));
    }
    return connection;
}



function Close() {
   
    return connection.close();
}
