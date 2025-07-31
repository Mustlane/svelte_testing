import du from 'du';

async function getSize(){
const size = await du('/home/MustlaneUSER/data')
return BigInt(size);
}
export {
    getSize
}