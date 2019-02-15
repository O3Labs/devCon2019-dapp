import o3dapi from 'o3-dapi-core';
import o3dapiNeo from 'o3-dapi-neo';

o3dapi.initPlugins([o3dapiNeo]);

export function send(amount: string): Promise<any> {
  return o3dapi.NEO.getAccount()
  .then(({address}) => {
    return o3dapi.NEO.send({
      fromAddress: address,
      // TODO add back in before prod
      // toAddress: 'AJ4tAoiRccsSfjgYMqFu9yq9vh5qQUKF9T',
      toAddress: address,
      asset: 'GAS',
      amount: amount.toString(),
      remark: 'O3CAP',
      // TODO add back in before prod
      // fee: '0.0011',
      network: 'MainNet',
    })
    .then(({txid}) => ({address, txid}));
  });
}
