// https://gist.github.com/sviatco/9054346
import os from 'os'

export let ip: string
//FIXME
const ifaces = os.networkInterfaces()

for (const dev in ifaces) {
  const iface = ifaces[dev]?.filter(details => {
    return details.family === 'IPv4' && details.internal === false
  })
  if (iface?.length) {
    ip = iface[0].address
  }
}
