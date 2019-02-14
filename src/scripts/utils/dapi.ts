import o3dapi from 'o3-dapi-core';
import o3dapiNeo from 'o3-dapi-neo';

o3dapi.initPlugins([o3dapiNeo]);

export function send(amount: string): Promise<any> {
  return Promise.all([
    o3dapi.NEO.getNetworks(),
    o3dapi.NEO.getAccount(),
  ])
  .then(([{defaultNetwork}, {address}]) => {
    // if (defaultNetwork !== 'MainNet') {
    //   throw 'O3 app is not set to MainNet.';
    // }
    return o3dapi.NEO.send({
      fromAddress: address,
      // toAddress: 'AJ4tAoiRccsSfjgYMqFu9yq9vh5qQUKF9T',
      toAddress: 'Ab5atNiFFWzFTq55HAniJu4tMKN6hzdGEQ',
      asset: 'GAS',
      amount: amount.toString(),
      remark: 'O3CAP',
      // fee: '0.0011',
      network: defaultNetwork,
    })
    .then(({txid}) => ({address, txid}));
  });
}
