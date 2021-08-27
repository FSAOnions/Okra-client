"use strict";

// const fs = require("fs");
// const promise = fs.promises;
// const stream = require("stream");
//const zlib = require("zlib");
import zlib from "react-zlib-js";
import { Buffer } from "buffer";
//import { promises } from "fs";

//const RNFS = require("react-native-fs");
import fs from "react-native-fs";
// const { promisify } = require("util");
// const { default: axios } = require("axios");
import axios from "axios";
const localHost = "http://10.0.0.206:8080";

export default async function main(operation, file) {
  switch (operation) {
    case "unzip": {
      // const unzip = zlib.createUnzip();
      console.log(`${localHost}/${file}.gz`);
      const { data } = await axios.get(`${localHost}/${file}.gz`, {
        responseType: "arraybuffer",
      });

      //console.log("data", data);
      //  const decode = data.toString("base64");
      const buffer = Buffer.from(data);
      //.toString('binary');

      //.toString('base64')
      const result = new Promise((resolve) => {
        zlib.unzip(buffer, async function (err, unzipped) {
          // const path = fs.DocumentDirectoryPath + "/object.obj";
          // const result = await fs.writeFile(
          //   path,
          //   Buffer.from(unzipped, "binary").toString()
          // );
          //const file = await promises.readFile(unzipped, "binary")
          //const file = await promises.writeFile(`${file}.obj`, unzipped);
          Buffer.from(unzipped, "binary").toString().obj;
          resolve("result");
          //resolve(unzipped);
        });
      });

      //console.log("unzippedd", hello);
      // const source2 = await promise.readFile(data);
      // const source = await promise.createReadStream(`${file}.gz`);
      // const destination = await promise.createWriteStream(`${file}.obj`);
      // console.log(source2);
      // const ret = await promisify(stream.pipeline)(source, unzip, destination);
      // return ret;
      return await result;
    }
  }
}
