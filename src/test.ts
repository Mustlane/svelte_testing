import { updateStats } from "./lib/server/db/db";

async function init(){
    updateStats()
}

init()