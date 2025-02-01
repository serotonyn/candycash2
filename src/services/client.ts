import PocketBase from "pocketbase";

import { TypedPocketBase } from "@/pocketbase-types";

let client: PocketBase | null = null;

if (!client) {
  client = new PocketBase("http://127.0.0.1:8090") as TypedPocketBase;
}

export default client;
