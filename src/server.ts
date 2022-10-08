// Timestamp microservice

// Takes a given natural or unix time, and returns a JSON object
// that has both the natural and unix time in it.
import express from "express";
import { AddressInfo } from "net";
import { DateTime } from "luxon";

const app = express();

interface ResponseObject {
    unix: string | null;
    natural: string | null;
}

interface RequestObject {
    params: string[];
}

app.get("*", (request: RequestObject, response) => {
    const params = request.params[0];
    const timestamp = params.split("/")[1];
    const jsonObj: ResponseObject = {
        unix: null,
        natural: null,
    };

    // Check to see if the date recieved is a unix timestamp, or something else.
    // Then process based on that.
    if (/^\d{10}$/.test(timestamp)) {
        jsonObj.unix = timestamp;
        jsonObj.natural = DateTime.fromSeconds(Number(timestamp)).toFormat("LLLL dd, yyyy");
        response.json(jsonObj);
    } else if (/^.{3,9}\s\d{1,2},\s\d{4}$/.test(timestamp)) {
        jsonObj.natural = timestamp;
        jsonObj.unix =  DateTime.fromFormat(timestamp, "LLLL dd, yyyy").toMillis().toString();
        response.json(jsonObj);
    } else {
        response.send("Invalid time data");
    }
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
    let port: number;
    const addressInfo = listener.address();

    if (typeof addressInfo === "string") {
        port = Number(process.env.PORT);
    }

    port = (addressInfo as AddressInfo).port;

    console.log("Microservice is listening on port:", port);
});
